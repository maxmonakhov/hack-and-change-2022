import { ChangeEvent, FormEvent, memo, useCallback, useState } from 'react';
import { useAuthorize } from '../hooks/useAuthorize';
import { jwtService } from '../../../services/JWTService';
import { useRouter } from 'next/router';
import { Spinner } from '../../../components/spinner';

const LoginForm = () => {
  const { push } = useRouter();

  const { mutate, isLoading } = useAuthorize();

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLoginChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value);
  }, []);

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.currentTarget.value);
    },
    []
  );

  const handleFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      mutate(
        { login, password },
        {
          onSuccess: (response) => {
            jwtService.setJWTToken(response.jwtToken);
            console.log('Authorized successfully');
            void push('/');
          }
        }
      );

      console.log('submitted');
    },
    [login, password]
  );

  return (
    <div className="card card-compact w-96 bg-base-100 p-5 shadow-xl">
      <div className="card-body">
        <p className="mt-2 text-center text-2xl">
          Добро пожаловать, <br /> оператор!
        </p>

        <form className="mt-6" onSubmit={handleFormSubmit}>
          <p className="text-lg">Логин</p>
          <input
            type="text"
            value={login}
            onChange={handleLoginChange}
            required
            minLength={4}
            placeholder="ivan"
            className="input-bordered input-primary input mt-1 w-full "
          />

          <p className="mt-6 text-lg">Пароль</p>
          <input
            type="text"
            value={password}
            onChange={handlePasswordChange}
            required
            minLength={4}
            placeholder="12345"
            className="input-bordered input-primary input mt-1 w-full"
          />

          <div className="mt-8 flex h-[48px] flex-1 justify-center">
            {isLoading ? (
              <Spinner size="48" />
            ) : (
              <input
                type="submit"
                value="Войти в систему"
                className="btn-info btn text-white"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(LoginForm);

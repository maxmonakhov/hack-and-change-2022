import { PageContent } from '../components/PageContent';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

const Login = () => {
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

  const handleFormSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('submitted');
  }, []);

  return (
    <PageContent>
      <div className="flex flex-1 flex-col items-center justify-center">
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

              <div className="flex flex-1 justify-center">
                <input
                  type="submit"
                  value="Войти в систему"
                  className="btn-info btn mt-8 text-white"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageContent>
  );
};

export default Login;

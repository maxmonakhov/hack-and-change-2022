import { PageContent } from '../components/PageContent';
import { LoginForm } from '../features/authorization/loginForm';

const Login = () => {
  return (
    <PageContent>
      <div className="flex flex-1 flex-col items-center justify-center">
        <LoginForm />
      </div>
    </PageContent>
  );
};

export default Login;

import LoginForm from "../../components/LoginForm/LoginForm";
import DocumentTitle from "../../DocumentTitle";

const LoginPage = () => {
  return (
    <>
      <DocumentTitle>Login</DocumentTitle>

      <h1 className="mt font-sans font-bold">Hello again!</h1>
      <p className="max-w-[150px] m-auto mt-4">
        Welcome back you’ve been missed!
      </p>
      <LoginForm />
    </>
  );
};

export default LoginPage;

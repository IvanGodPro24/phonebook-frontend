import clsx from "clsx";
import css from "./LoginPage.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import DocumentTitle from "../../DocumentTitle";

const LoginPage = () => {
  return (
    <>
      <DocumentTitle>Login</DocumentTitle>

      <h1 className="mt font-sans font-bold">Hello again!</h1>
      <p className={clsx(css.greeting, "m-auto")}>
        Welcome back you’ve been missed!
      </p>
      <LoginForm />
    </>
  );
};

export default LoginPage;

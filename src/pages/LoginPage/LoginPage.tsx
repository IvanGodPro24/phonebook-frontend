import LoginForm from "../../components/LoginForm/LoginForm";
import ShinyText from "../../components/ShinyText/ShinyText";
import DocumentTitle from "../../DocumentTitle";

const LoginPage = () => {
  return (
    <>
      <DocumentTitle>Login</DocumentTitle>

      <div>
        <ShinyText
          text="Hello again!"
          disabled={false}
          speed={3}
          className="font-sans font-bold text-2xl mt-12 mb-12"
        />
      </div>

      <LoginForm />
    </>
  );
};

export default LoginPage;

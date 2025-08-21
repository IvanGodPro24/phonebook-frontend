import ResetForm from "../../components/ResetForm/ResetForm";
import ShinyText from "../../components/ShinyText/ShinyText";
import DocumentTitle from "../../DocumentTitle";

const ResetPasswordPage = () => {
  return (
    <>
      <DocumentTitle>Reset Password</DocumentTitle>

      <div>
        <ShinyText
          text="Choose a New Password"
          disabled={false}
          speed={3}
          className="font-sans font-bold text-2xl mt-12 mb-12"
        />
      </div>

      <ResetForm />
    </>
  );
};

export default ResetPasswordPage;

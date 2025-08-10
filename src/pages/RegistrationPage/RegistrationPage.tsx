import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import ShinyText from "../../components/ShinyText/ShinyText";
import DocumentTitle from "../../DocumentTitle";

const RegistrationPage = () => {
  return (
    <>
      <DocumentTitle>Registration</DocumentTitle>

      <div>
        <ShinyText
          text="Join Us!"
          disabled={false}
          speed={3}
          className="font-sans font-bold text-2xl mt-12 mb-12"
        />
      </div>

      <RegistrationForm />
    </>
  );
};

export default RegistrationPage;

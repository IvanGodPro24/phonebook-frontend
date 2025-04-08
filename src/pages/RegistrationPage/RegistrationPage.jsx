import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import DocumentTitle from "../../DocumentTitle";

const RegistrationPage = () => {
  return (
    <>
      <DocumentTitle>Registration</DocumentTitle>

      <h1 className="mt font-sans font-bold">Join Us!</h1>
      <RegistrationForm />
    </>
  );
};

export default RegistrationPage;

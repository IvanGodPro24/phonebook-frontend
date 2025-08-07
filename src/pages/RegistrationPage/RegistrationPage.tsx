import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import DocumentTitle from "../../DocumentTitle";

const RegistrationPage = () => {
  return (
    <>
      <DocumentTitle>Registration</DocumentTitle>

      <h1 className="font-sans font-bold mt-12">Join Us!</h1>
      <RegistrationForm />
    </>
  );
};

export default RegistrationPage;

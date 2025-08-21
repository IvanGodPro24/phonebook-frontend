import RequestForm from "../../components/RequestForm/RequestForm";
import ShinyText from "../../components/ShinyText/ShinyText";
import DocumentTitle from "../../DocumentTitle";

const RequestPage = () => {
  return (
    <>
      <DocumentTitle>Request Reset</DocumentTitle>

      <div>
        <ShinyText
          text="Forgot Your Password?"
          disabled={false}
          speed={3}
          className="font-sans font-bold text-2xl mt-12 mb-12"
        />
      </div>

      <RequestForm />
    </>
  );
};

export default RequestPage;

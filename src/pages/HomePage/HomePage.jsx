import DocumentTitle from "../../DocumentTitle";
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>

      <div className={css.container}>
        <h1 className={css.title}>The Best App for your Contacts</h1>
      </div>
    </>
  );
};

export default HomePage;

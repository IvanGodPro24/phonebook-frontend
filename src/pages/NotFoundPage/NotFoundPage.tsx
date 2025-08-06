import { VscBracketError } from "react-icons/vsc";
import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <div className={css.content}>
        <VscBracketError size={120} className={css.icon} />
        <h1 className={css.title}>404</h1>
        <p className={css.text}>The page you're looking for can't be found</p>
        <Link to="/" className={css.link}>
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

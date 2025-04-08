import { VscBracketError } from "react-icons/vsc";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.notfound}>
      <VscBracketError size="100" />
      <p className={css.title}>
        The page you&apos;re looking for can&apos;t be found
      </p>
    </div>
  );
};

export default NotFoundPage;

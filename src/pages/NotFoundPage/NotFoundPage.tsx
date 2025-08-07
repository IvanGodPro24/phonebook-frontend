import clsx from "clsx";
import { VscBracketError } from "react-icons/vsc";
import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-8">
      <div className="flex flex-col items-center min-w-[80%] p-12 rounded-2xl bg-white/5 shadow-2xl border border-[var(--white-400)]">
        <VscBracketError size={120} className="mb-6" />
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-[var(--white-600)] mb-8">
          The page you're looking for can't be found
        </p>
        <Link
          to="/"
          className={clsx(
            css.link,
            "py-3 px-6 rounded-lg bg-[var(--primary)] text-[var(--white)]"
          )}
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

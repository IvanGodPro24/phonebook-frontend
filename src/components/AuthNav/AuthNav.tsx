import css from "./AuthNav.module.css";
import { Link } from "react-router-dom";

const AuthNav = () => {
  return (
    <ul className={css.authlist}>
      <li>
        <Link
          to="/register"
          className="text-sm/6 font-semibold text-white/50"
        >
          Register
        </Link>
      </li>
      <li>
        <Link
          to="/login"
          className="text-sm/6 font-semibold text-white/50"
        >
          Log In
        </Link>
      </li>
    </ul>
  );
};

export default AuthNav;

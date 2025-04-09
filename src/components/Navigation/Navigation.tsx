import { useAppSelector } from "../../hooks";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./Navigation.module.css";

const Navigation = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <nav>
      <ul className={css.navlist}>
        <li>
          <NavLink to="/" className="text-sm/6 font-semibold text-white/50">
            Home
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink
              to="/contacts"
              className="text-sm/6 font-semibold text-white/50"
            >
              Contacts
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

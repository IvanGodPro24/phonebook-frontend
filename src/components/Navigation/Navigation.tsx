import { useAppSelector } from "../../hooks/hooks";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import useDevice from "../../hooks/useDevice";
import { HomeIcon } from "../HomeIcon/HomeIcon";
import { UserIcon } from "../UserIcon/UserIcon";

const Navigation = () => {
  const { isMobile } = useDevice();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          {!isMobile ? (
            <NavLink to="/" className="text-4xl font-semibold text-white/50">
              Home
            </NavLink>
          ) : (
            <NavLink to="/">
              <HomeIcon />
            </NavLink>
          )}
        </li>

        {isLoggedIn &&
          (!isMobile ? (
            <li>
              <NavLink
                to="/contacts"
                className="text-4xl font-semibold text-white/50"
              >
                Contacts
              </NavLink>
            </li>
          ) : (
            <NavLink to="/contacts">
              <UserIcon />
            </NavLink>
          ))}
      </ul>
    </nav>
  );
};

export default Navigation;

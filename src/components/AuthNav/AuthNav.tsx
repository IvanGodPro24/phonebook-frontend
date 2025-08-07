import useDevice from "../../hooks/useDevice";
import { LogoutIcon } from "../LogoutIcon/LogoutIcon";
import { UserIcon } from "../UserIcon/UserIcon";
import { Link } from "react-router-dom";

const AuthNav = () => {
  const { isMobile } = useDevice();

  return (
    <ul className="flex gap-4">
      <li>
        {!isMobile ? (
          <Link
            to="/register"
            className="text-sm/6 font-semibold text-white/50"
          >
            Register
          </Link>
        ) : (
          <Link to="/register">
            <UserIcon />
          </Link>
        )}
      </li>
      <li>
        {!isMobile ? (
          <Link to="/login" className="text-sm/6 font-semibold text-white/50">
            Log In
          </Link>
        ) : (
          <Link to="/login">
            <LogoutIcon />
          </Link>
        )}
      </li>
    </ul>
  );
};

export default AuthNav;

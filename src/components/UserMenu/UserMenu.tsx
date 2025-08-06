import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";
import { LogoutIcon } from "../LogoutIcon/LogoutIcon";

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  return (
    <div className={css.container}>
      <div className={css.user}>{user.name && user.name[0]}</div>

      <button type="button" onClick={() => dispatch(logout())}>
        <LogoutIcon />
      </button>
    </div>
  );
};

export default UserMenu;

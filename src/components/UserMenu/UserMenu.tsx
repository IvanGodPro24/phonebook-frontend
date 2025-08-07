import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import { LogoutIcon } from "../LogoutIcon/LogoutIcon";

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  return (
    <div className="flex items-center gap-7.5">
      <div className="flex justify-center items-center w-7.5 h-7.5 bg-[var(--primary)] rounded-full text-[var(--black)]">
        {user.name && user.name[0]}
      </div>

      <button type="button" onClick={() => dispatch(logout())}>
        <LogoutIcon />
      </button>
    </div>
  );
};

export default UserMenu;

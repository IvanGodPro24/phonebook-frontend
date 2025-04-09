import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  return (
    <div className={css.container}>
      <p className={css.user}>Welcome, {user.name}!</p>
      <button
        type="button"
        className="text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
        onClick={() => dispatch(logout())}
      >
        Log out
      </button>
    </div>
  );
};

export default UserMenu;

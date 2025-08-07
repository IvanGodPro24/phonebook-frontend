import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import { useAppSelector } from "../../hooks/hooks";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import UserMenu from "../UserMenu/UserMenu";

const AppBar = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <header className='flex justify-between items-center p-4 border-b'>
      <Navigation />

      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;

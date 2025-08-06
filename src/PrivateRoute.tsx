import { Navigate } from "react-router-dom";
import { useAppSelector } from "./hooks/hooks";
import { selectIsLoggedIn } from "./redux/auth/selectors";
import { RouteProps } from "./Route.types";

const PrivateRoute = ({
  component: Component,
  redirectTo = "/",
}: RouteProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;

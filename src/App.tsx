import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./components/Layout/Layout";
import Loader from "./components/Loader/Loader";
import RestrictedRoute from "./RestrictedRoute";
import PrivateRoute from "./PrivateRoute";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { refresh } from "./redux/auth/operations";
import RequestPage from "./pages/RequestPage/RequestPage";
import CheckEmailPage from "./pages/CheckEmailPage/CheckEmailPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import GoogleCallbackPage from "./pages/GoogleCallbackPage/GoogleCallbackPage";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const RegistrationPage = lazy(
  () => import("./pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  const dispatch = useAppDispatch();
  const isRefreshing = useAppSelector(selectIsRefreshing);

  useEffect(() => {
    const hasSession = localStorage.getItem("hasSession");
    if (hasSession === "true") {
      dispatch(refresh());
    }
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <Toaster expand position="top-center" />

      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/request-reset" element={<RequestPage />} />
            <Route path="/check-email" element={<CheckEmailPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route
              path="/confirm-google-auth"
              element={<GoogleCallbackPage />}
            />

            <Route
              path="/login"
              element={
                <RestrictedRoute
                  component={<LoginPage />}
                  redirectTo="/contacts"
                />
              }
            />

            <Route
              path="/contacts"
              element={
                <PrivateRoute
                  component={<ContactsPage />}
                  redirectTo="/login"
                />
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;

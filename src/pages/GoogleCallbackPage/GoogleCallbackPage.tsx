import css from "./GoogleCallbackPage.module.css";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch } from "../../hooks/hooks";
import { loginWithGoogle } from "../../redux/auth/operations";

const GoogleCallbackPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const code = params.get("code");

    if (code) {
      dispatch(loginWithGoogle(code))
        .unwrap()
        .then(() => {
          toast.success("Successfully logged in with Google!");
          navigate("/contacts");
        })
        .catch((err) => {
          toast.error(err || "Google login failed");
          navigate("/login");
        });
    }
  }, [dispatch, navigate]);

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="flex flex-col justify-evenly items-center w-[350px] h-[180px] rounded-[10px] bg-white p-[30px] shadow-[2px_2px_10px_-5px_lightgrey]">
        <label className={css.label}>Redirecting...</label>
        <div className={css.loading}></div>
      </div>
    </div>
  );
};

export default GoogleCallbackPage;

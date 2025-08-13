import clsx from "clsx";
import css from "./FormComponent.module.css";
import GoogleIcon from "../GoogleIcon/GoogleIcon";
import { Link } from "react-router-dom";
import { Form } from "formik";
import { useId, useState } from "react";
import CustomLoader from "../CustomLoader/CustomLoader";
import InputField from "../InputField/InputField";
import { FormComponentProps } from "./FormComponent.types";
import { UserIcon } from "../UserIcon/UserIcon";
import { EmailIcon } from "../EmailIcon/EmailIcon";
import { PasswordIcon } from "../PasswordIcon/PasswordIcon";

const FormComponent = ({
  isLogIn = false,
  isSubmitting,
  children,
  isAuth = false,
  photo,
}: FormComponentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  return (
    <div
      className={clsx(css.container, {
        [css["c-container"]]: children,
        [css["c-container-photo"]]: photo,
      })}
    >
      <div
        className={clsx(css["login-box"], {
          [css["c-box"]]: children,
          [css["c-box-photo"]]: photo,
        })}
      >
        <Form className={clsx(css.form)}>
          {isAuth ? (
            <>
              <div className={css.logo} />
              <span className={css.header}>
                {isLogIn
                  ? "Welcome back you’ve been missed!"
                  : "Hello there! Your journey starts now!"}
              </span>

              {!isLogIn && (
                <InputField
                  type="text"
                  name="name"
                  id={nameId}
                  placeholder="Username"
                  icon={
                    <UserIcon
                      className="absolute top-1/2 left-4 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
                      size={24}
                    />
                  }
                />
              )}

              <InputField
                type="email"
                name="email"
                id={emailId}
                placeholder="Email"
                icon={
                  <EmailIcon
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
                    size={24}
                  />
                }
              />

              <InputField
                type={isVisible ? "text" : "password"}
                name="password"
                id={passwordId}
                placeholder="Password"
                isVisible={isVisible}
                onVisible={() => setIsVisible((prev) => !prev)}
                isPassword={true}
                icon={
                  <PasswordIcon
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
                    size={24}
                  />
                }
              />

              {isSubmitting ? (
                <CustomLoader />
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={clsx(css.button, css["sign-in"])}
                >
                  {isLogIn ? "Sign In" : "Sign Up"}
                </button>
              )}

              {isLogIn && (
                <button className={clsx(css.button, css["google-sign-in"])}>
                  <GoogleIcon />
                  <span>Sign in with Google </span>
                </button>
              )}

              <div className={css.footer}>
                <div className={css["footer-container"]}>
                  {isLogIn
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <Link
                    to={isLogIn ? "/register" : "/login"}
                    className={css.link}
                  >
                    {isLogIn ? "Sign up, it's free!" : "Sign in"}
                  </Link>
                </div>

                {isLogIn && (
                  <Link to="/" className={css.link}>
                    Forgot password?
                  </Link>
                )}
              </div>
            </>
          ) : (
            children
          )}
        </Form>
      </div>
    </div>
  );
};

export default FormComponent;

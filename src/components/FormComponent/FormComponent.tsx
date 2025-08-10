import clsx from "clsx";
import css from "./FormComponent.module.css";
import GoogleIcon from "../GoogleIcon/GoogleIcon";
import { Link } from "react-router-dom";
import { Form } from "formik";
import { useState } from "react";
import CustomLoader from "../CustomLoader/CustomLoader";
import InputField from "../InputField/InputField";
import { FormComponentProps } from "./FormComponent.types";

const FormComponent = ({
  isLogIn = false,
  isSubmitting,
}: FormComponentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={css.container}>
      <div className={css["login-box"]}>
        <Form className={css.form}>
          <div className={css.logo} />
          <span className={css.header}>
            {isLogIn
              ? "Welcome back you’ve been missed!"
              : "Hello there! Your journey starts now!"}
          </span>

          {!isLogIn && (
            <InputField type="text" name="name" placeholder="Username" />
          )}

          <InputField type="email" name="email" placeholder="Email" />

          <InputField
            type={isVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            isVisible={isVisible}
            onVisible={() => setIsVisible((prev) => !prev)}
            isPassword={true}
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
              {isLogIn ? "Don't have an account?" : "Already have an account?"}
              <Link to={isLogIn ? "/register" : "/login"} className={css.link}>
                {isLogIn ? "Sign up, it's free!" : "Sign in"}
              </Link>
            </div>

            {isLogIn && (
              <Link to="/" className={css.link}>
                Forgot password?
              </Link>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FormComponent;

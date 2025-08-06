import { useId, useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { login } from "../../redux/auth/operations";
import { toast } from "sonner";
import clsx from "clsx";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { LoginCredentials } from "../../redux/auth/auth.types";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Must be a valid email!").required("Required"),
  password: Yup.string()
    .min(8, "Too short!")
    .max(50, "Too long!")
    .required("Required!"),
});

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const emailId = useId();
  const passwordId = useId();

  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useAppDispatch();

  const handleSubmit = (
    { email, password }: LoginCredentials,
    actions: FormikHelpers<LoginCredentials>
  ) => {
    dispatch(
      login({
        email,
        password,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Login success");
      })
      .catch(() => {
        toast.error("Login error");
      });

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={LoginSchema}
    >
      <Form className="form">
        <label htmlFor={emailId}>Email</label>
        <Field
          type="email"
          name="email"
          id={emailId}
          className={clsx(
            "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        />
        <ErrorMessage name="email" component="span" className="error" />

        <label htmlFor={passwordId}>Password</label>
        <div className="relative w-full">
          <Field
            type={isVisible ? "text" : "password"}
            name="password"
            id={passwordId}
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          />

          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white"
            onClick={() => setIsVisible((prev) => !prev)}
          >
            {isVisible ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </span>
        </div>

        <ErrorMessage name="password" component="span" className="error" />

        <button
          type="submit"
          className="m-auto text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Log in
        </button>

        <p className="m-auto">
          Not a member?{" "}
          <Link to="/register" className="extra-link">
            Register now
          </Link>
        </p>
      </Form>
    </Formik>
  );
};

export default LoginForm;

import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { useId, useState } from "react";
import { ResetFormType } from "./ResetForm.types";
import { Formik, FormikHelpers } from "formik";
import { toast } from "sonner";
import css from "../FormComponent/FormComponent.module.css";
import FormComponent from "../FormComponent/FormComponent";
import InputField from "../InputField/InputField";
import { PasswordIcon } from "../PasswordIcon/PasswordIcon";
import CustomLoader from "../CustomLoader/CustomLoader";
import clsx from "clsx";
import { resetPassword } from "../../redux/auth/operations";

const ResetSchema: Yup.ObjectSchema<ResetFormType> = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Too short!")
    .max(20, "Too long!")
    .required("Required!"),
  password: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Password confirmation is required"),
});

const initialValues: ResetFormType = {
  newPassword: "",
  password: "",
};

const ResetForm = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);

  const toggleShow = () => setIsVisible((prev) => !prev);

  const newPasswordId = useId();
  const passwordId = useId();

  const [params] = useSearchParams();
  const token = params.get("token");

  if (!token)
    return <p className="text-red-500 text-center">Invalid reset link</p>;

  const handleSubmit = async (
    { password }: ResetFormType,
    { setSubmitting, resetForm }: FormikHelpers<ResetFormType>
  ) => {
    try {
      await dispatch(resetPassword({ token, password })).unwrap();

      toast.success("Password successfully reset! Please log in.");
      resetForm();
      navigate("/login");
    } catch (error: any) {
      toast.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ResetSchema}
    >
      {({ isSubmitting }) => (
        <FormComponent isReset>
          <div className={css.logo} />

          <span className={css.header}>
            Make sure your new password is strong and unique.
          </span>

          <InputField
            type={isVisible ? "text" : "password"}
            name="newPassword"
            id={newPasswordId}
            placeholder="Enter a new password"
            isVisible={isVisible}
            onVisible={toggleShow}
            isPassword={true}
            icon={
              <PasswordIcon
                className="absolute top-1/2 left-4 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
                size={24}
              />
            }
          />

          <InputField
            type={isVisible ? "text" : "password"}
            name="password"
            id={passwordId}
            placeholder="Repeat new password"
            isVisible={isVisible}
            onVisible={toggleShow}
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
              Change password
            </button>
          )}
        </FormComponent>
      )}
    </Formik>
  );
};

export default ResetForm;

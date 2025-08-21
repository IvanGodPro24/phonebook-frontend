import * as Yup from "yup";
import { useId } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { Formik, FormikHelpers } from "formik";
import FormComponent from "../../components/FormComponent/FormComponent";
import { RequestFormType } from "./RequestForm.types";
import { toast } from "sonner";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { EmailIcon } from "../../components/EmailIcon/EmailIcon";
import InputField from "../../components/InputField/InputField";
import css from "../FormComponent/FormComponent.module.css";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { requestResetEmail } from "../../redux/auth/operations";

const RequestSchema: Yup.ObjectSchema<RequestFormType> = Yup.object().shape({
  email: Yup.string()
    .test("email-if-provided", "Invalid email format", (value) => {
      if (!value || value.trim() === "") return true;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    })
    .required(),
});

const initialValues: RequestFormType = {
  email: "",
};

const RequestForm = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const emailId = useId();

  const handleSubmit = async (
    { email }: RequestFormType,
    { setSubmitting, resetForm }: FormikHelpers<RequestFormType>
  ) => {
    try {
      await dispatch(requestResetEmail(email)).unwrap();

      navigate("/check-email");

      toast.success(
        "Reset email successfully sent. Check your inbox and follow instructions!"
      );
      resetForm();
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
      validationSchema={RequestSchema}
    >
      {({ isSubmitting }) => (
        <FormComponent isReset>
          <div className={css.logo} />

          <span className={css.header}>
            Don’t worry, we’ll help you get back in!
          </span>

          <InputField
            type="email"
            name="email"
            id={emailId}
            placeholder="Enter your email"
            icon={
              <EmailIcon
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
              Reset
            </button>
          )}
        </FormComponent>
      )}
    </Formik>
  );
};

export default RequestForm;

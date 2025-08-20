import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import FormComponent from "../FormComponent/FormComponent";
import { useAppDispatch } from "../../hooks/hooks";
import { login } from "../../redux/auth/operations";
import { toast } from "sonner";
import { LoginCredentials } from "../../redux/auth/auth.types";

const loginSchema: Yup.ObjectSchema<LoginCredentials> = Yup.object().shape({
  email: Yup.string().email("Must be a valid email!").required("Required"),
  password: Yup.string()
    .min(8, "Too short!")
    .max(20, "Too long!")
    .required("Required!"),
});

const initialValues: LoginCredentials = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (
    { email, password }: LoginCredentials,
    { setSubmitting }: FormikHelpers<LoginCredentials>
  ) => {
    try {
      await dispatch(
        login({
          email,
          password,
        })
      ).unwrap();

      toast.success("Welcome back! Your contacts is now open!");
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
      validationSchema={loginSchema}
    >
      {({ isSubmitting }) => (
        <FormComponent
          isLogIn={true}
          isSubmitting={isSubmitting}
          isAuth={true}
        />
      )}
    </Formik>
  );
};

export default LoginForm;

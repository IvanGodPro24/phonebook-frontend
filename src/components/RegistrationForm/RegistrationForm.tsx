import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import FormComponent from "../FormComponent/FormComponent";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { register } from "../../redux/auth/operations";
import { RegisterCredentials } from "../../redux/auth/auth.types";
import { toast } from "sonner";

const registrationSchema: Yup.ObjectSchema<RegisterCredentials> =
  Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Required!"),
    email: Yup.string().email("Must be a valid email!").required("Required"),
    password: Yup.string()
      .min(8, "Too short!")
      .max(50, "Too long!")
      .required("Required!"),
  });

const initialValues: RegisterCredentials = {
  name: "",
  email: "",
  password: "",
};

const RegistrationForm = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleSubmit = async (
    { name, email, password }: RegisterCredentials,
    { setSubmitting }: FormikHelpers<RegisterCredentials>
  ) => {
    try {
      await dispatch(register({ name, email, password })).unwrap();

      toast.success("Congratulations! You've joined the network!");

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
      validationSchema={registrationSchema}
    >
      {({ isSubmitting }) => (
        <FormComponent isSubmitting={isSubmitting} isAuth={true} />
      )}
    </Formik>
  );
};

export default RegistrationForm;

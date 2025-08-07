import { Form } from "formik";
import { FormComponentProps } from "./FormComponent.types";

const FormComponent = ({ children }: FormComponentProps) => {
  return (
    <Form className="flex flex-col items-start gap-4 max-w-[360px] my-12 mx-auto border rounded-lg p-7.5">
      {children}
    </Form>
  );
};

export default FormComponent;

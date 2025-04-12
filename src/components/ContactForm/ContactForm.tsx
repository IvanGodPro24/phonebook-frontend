import { useId } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addContact } from "../../redux/contacts/operations";
import { toast } from "sonner";
import clsx from "clsx";
import { selectContacts } from "../../redux/contacts/selectors";
import { ContactFormProps } from "./ContactForm.types";
import { existedContact } from "../../utils/contactUtils";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required!"),
  phoneNumber: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required!"),
});

const initialValues = {
  name: "",
  phoneNumber: "",
};

const ContactForm = () => {
  const dispatch = useAppDispatch();

  const contacts = useAppSelector(selectContacts);

  const nameId = useId();
  const phoneNumberId = useId();

  const handleSubmit = (
    { name, phoneNumber }: ContactFormProps,
    actions: FormikHelpers<ContactFormProps>
  ) => {
    if (existedContact(contacts, name, phoneNumber)) {
      toast.info("Contact already exists.");
      return;
    }

    dispatch(
      addContact({
        name,
        phoneNumber,
        contactType: "home",
      })
    );

    toast.success("Contact has been added!");

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      <Form className="form">
        <label htmlFor={nameId}>Name</label>

        <Field
          type="text"
          name="name"
          id={nameId}
          className={clsx(
            "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        />
        <ErrorMessage
          name="name"
          component="span"
          className="error"
        ></ErrorMessage>

        <label htmlFor={phoneNumberId}>Number</label>
        <Field
          type="tel"
          name="phoneNumber"
          id={phoneNumberId}
          className={clsx(
            "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        />
        <ErrorMessage
          name="phoneNumber"
          component="span"
          className="error"
        ></ErrorMessage>

        <button
          type="submit"
          className="m-auto text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;

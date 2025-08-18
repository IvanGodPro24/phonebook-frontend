import { ChangeEvent, useId, useRef, useState } from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import FormComponent from "../FormComponent/FormComponent";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addContact, fetchContacts } from "../../redux/contacts/operations";
import { toast } from "sonner";
import {
  selectContacts,
  selectFilters,
  selectPagination,
} from "../../redux/contacts/selectors";
import { ContactFormProps } from "./ContactForm.types";
import { existedContact } from "../../utils/contactUtils";
import CustomLoader from "../CustomLoader/CustomLoader";
import CustomButton from "../CustomButton/CustomButton";
import CustomSelect from "../CustomSelect/CustomSelect";
import UploadPhoto from "../UploadPhoto/UploadPhoto";
import { UserIcon } from "../UserIcon/UserIcon";
import { EarthIcon } from "../EarthIcon/EarthIcon";
import { EmailIcon } from "../EmailIcon/EmailIcon";
import { typeOptions } from "../../constants/constants";
import InputField from "../InputField/InputField";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

const ContactSchema: Yup.ObjectSchema<ContactFormProps> = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required!"),
  phoneNumber: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required!"),
  email: Yup.string()
    .optional()
    .test("email-if-provided", "Invalid email format", (value) => {
      if (!value || value.trim() === "") return true;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }),
  type: Yup.string().required(),
  isFavourite: Yup.boolean().required(),
});

const initialValues: ContactFormProps = {
  name: "",
  phoneNumber: "",
  email: "",
  type: "home",
  isFavourite: false,
};

const ContactForm = () => {
  const dispatch = useAppDispatch();

  const contacts = useAppSelector(selectContacts);
  const { page, totalItems, perPage } = useAppSelector(selectPagination);
  const filters = useAppSelector(selectFilters);

  const nameId = useId();
  const phoneNumberId = useId();
  const emailId = useId();

  const photoRef = useRef<HTMLInputElement>(null);

  const [photo, setPhoto] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (
    { name, phoneNumber, email, type, isFavourite }: ContactFormProps,
    { setSubmitting, resetForm }: FormikHelpers<ContactFormProps>
  ) => {
    try {
      if (existedContact(contacts, name, phoneNumber, email)) {
        toast.info("Contact already exists.");
        return;
      }

      await dispatch(
        addContact({
          name,
          phoneNumber,
          isFavourite,
          contactType: type,
          photo,
          ...(email?.trim() !== "" && { email }),
        })
      ).unwrap();

      const newTotalPages = Math.ceil((totalItems + 1) / perPage);

      let targetPage = page;

      if (contacts.length >= perPage) {
        targetPage = newTotalPages;
      }

      await dispatch(
        fetchContacts({ page: targetPage, perPage, filters })
      ).unwrap();

      toast.success("Contact has been added!");

      setPhoto(null);
      photoRef.current && (photoRef.current.value = "");
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
      validationSchema={ContactSchema}
    >
      {({ isSubmitting }) => (
        <FormComponent photo={photo}>
          <InputField
            type="text"
            name="name"
            id={nameId}
            placeholder="Enter your name"
            icon={
              <UserIcon
                className="absolute top-1/2 left-4 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
                size={24}
              />
            }
          />

          <InputField
            type="tel"
            name="phoneNumber"
            id={phoneNumberId}
            placeholder="Enter your phone number"
            icon={
              <EarthIcon
                className="absolute top-1/2 left-4 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
                size={24}
              />
            }
          />

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

          <CustomSelect
            name="type"
            options={typeOptions}
            placeholder="Contact type"
          />

          <CustomCheckbox name="isFavourite" label="Mark as Favourite" />

          <UploadPhoto ref={photoRef} onChange={handleFileChange} />

          {photo && (
            <div className="mt-2 flex items-center gap-2">
              <img
                src={URL.createObjectURL(photo)}
                alt="Preview"
                className="w-24 h-24 object-cover rounded"
              />
              <CustomButton
                onClick={() => {
                  setPhoto(null);
                  if (photoRef.current) {
                    photoRef.current.value = "";
                  }
                }}
              >
                Remove
              </CustomButton>
            </div>
          )}

          {isSubmitting ? (
            <CustomLoader />
          ) : (
            <CustomButton disabled={isSubmitting}>Add contact</CustomButton>
          )}
        </FormComponent>
      )}
    </Formik>
  );
};

export default ContactForm;

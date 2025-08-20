import { ChangeEvent, useId, useRef, useState } from "react";
import * as Yup from "yup";
import { Form, Formik, FormikHelpers } from "formik";
import { useAppDispatch } from "../../hooks/hooks";
import { editContact } from "../../redux/contacts/operations";
import { toast } from "sonner";
import CustomLoader from "../CustomLoader/CustomLoader";
import CustomButton from "../CustomButton/CustomButton";
import CustomSelect from "../CustomSelect/CustomSelect";
import UploadPhoto from "../UploadPhoto/UploadPhoto";
import InputField from "../InputField/InputField";
import { UserIcon } from "../UserIcon/UserIcon";
import { EarthIcon } from "../EarthIcon/EarthIcon";
import { EmailIcon } from "../EmailIcon/EmailIcon";
import { typeOptions } from "../../constants/constants";
import {
  ContactEditFormProps,
  ContactEditFormState,
} from "./ContactEditForm.types";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

const ContactSchema: Yup.ObjectSchema<ContactEditFormState> =
  Yup.object().shape({
    editName: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Required!"),
    editTel: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Required!"),
    editEmail: Yup.string()
      .nullable()
      .test("email-if-provided", "Invalid email format", (value) => {
        if (!value || value.trim() === "") return true;
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }),
    editType: Yup.string().required(),
    editIsFavourite: Yup.boolean().required(),
  });

const ContactEditForm = ({
  _id,
  name,
  phoneNumber,
  email,
  isFavourite,
  contactType,
  photo,
  setIsEditing,
}: ContactEditFormProps) => {
  const initialValues: ContactEditFormState = {
    editName: name,
    editTel: phoneNumber,
    editEmail: email || "",
    editType: contactType,
    editIsFavourite: isFavourite,
  };

  const dispatch = useAppDispatch();

  const nameId = useId();
  const numberId = useId();
  const emailId = useId();

  const photoRef = useRef<HTMLInputElement>(null);

  const [removePhoto, setRemovePhoto] = useState(false);
  const [editedPhoto, setEditedPhoto] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEditedPhoto(e.target.files[0]);
    }
  };

  const handleSave = async (
    {
      editName,
      editTel,
      editEmail,
      editType,
      editIsFavourite,
    }: ContactEditFormState,
    { setSubmitting }: FormikHelpers<ContactEditFormState>
  ) => {
    try {
      const normalize = (val?: string | null) => val?.trim() || "";

      if (
        editName.trim().toLowerCase() === name.toLowerCase() &&
        editTel.trim() === phoneNumber.trim() &&
        editIsFavourite === isFavourite &&
        normalize(editEmail) === normalize(email) &&
        editType === contactType &&
        !editedPhoto &&
        !removePhoto
      ) {
        setIsEditing(false);
        return;
      }

      await dispatch(
        editContact({
          _id,
          name: editName.trim(),
          phoneNumber: editTel.trim(),
          email: editEmail?.trim() ? editEmail.trim() : null,
          isFavourite: editIsFavourite,
          contactType: editType,
          photo: editedPhoto || photo,
          removePhoto,
        })
      ).unwrap();

      toast.success("Contact has been edited!");

      setIsEditing(false);
    } catch (error: any) {
      toast.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSave}
      validationSchema={ContactSchema}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col justify-center items-center gap-2.5 m-auto">
          <InputField
            type="text"
            name="editName"
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
            name="editTel"
            id={numberId}
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
            name="editEmail"
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
            name="editType"
            options={typeOptions}
            placeholder="Contact type"
          />

          <CustomCheckbox name="editIsFavourite" label="Mark as Favourite" />

          <UploadPhoto ref={photoRef} onChange={handleFileChange} />

          {editedPhoto ? (
            <div className="mt-2 flex items-center gap-2">
              <img
                src={URL.createObjectURL(editedPhoto)}
                alt="Preview"
                className="w-24 h-24 object-cover rounded"
              />
              <CustomButton
                onClick={() => {
                  setEditedPhoto(null);
                  if (photoRef.current) {
                    photoRef.current.value = "";
                  }
                }}
              >
                Remove
              </CustomButton>
            </div>
          ) : photo && !removePhoto ? (
            <div className="mt-2 flex items-center gap-2">
              <img
                src={photo}
                alt="Contact"
                className="w-24 h-24 object-cover rounded"
              />
              <CustomButton
                type="button"
                onClick={() => {
                  setRemovePhoto(true);
                }}
              >
                Clear
              </CustomButton>
            </div>
          ) : null}

          {isSubmitting ? (
            <CustomLoader />
          ) : (
            <CustomButton disabled={isSubmitting}>Save</CustomButton>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ContactEditForm;

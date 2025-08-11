import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt, FaStar } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiContactsBook2Fill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { deleteContact, editContact } from "../../redux/contacts/operations";
import { toast } from "sonner";
import { ChangeEvent, useId, useState } from "react";
import clsx from "clsx";

import { Checkbox, Field as HField, Label, Select } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { ContactHandle } from "../../redux/contacts/contacts.types";
import { selectContacts } from "../../redux/contacts/selectors";
import { existedContact } from "../../utils/contactUtils";
import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import CustomLoader from "../CustomLoader/CustomLoader";
import CustomButton from "../CustomButton/CustomButton";

const Contact = ({
  _id,
  name,
  phoneNumber,
  email,
  isFavourite,
  contactType,
  photo,
}: ContactHandle) => {
  const dispatch = useAppDispatch();

  const contacts = useAppSelector(selectContacts);

  const nameId = useId();
  const numberId = useId();
  const emailId = useId();
  const contactTypeId = useId();
  const photoId = useId();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedNumber, setEditedNumber] = useState(phoneNumber);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedFavourite, setEditedFavourite] = useState(isFavourite);
  const [editedType, setEditedType] = useState(contactType);
  const [editedPhoto, setEditedPhoto] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditLoading, setEditIsLoading] = useState(false);

  const { isOpen, openModal, closeModal } = useModal();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEditedPhoto(e.target.files[0]);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await dispatch(deleteContact(_id)).unwrap();

      toast.info("Contact has been deleted!");
    } catch (error: any) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    setEditIsLoading(true);
    try {
      if (
        editedName.trim().toLowerCase() === name.toLowerCase() &&
        editedNumber.trim() === phoneNumber.trim() &&
        editedFavourite === isFavourite &&
        editedEmail?.trim() === email?.trim() &&
        editedType === contactType &&
        !editedPhoto
      ) {
        setIsEditing(false);
        return;
      }

      if (
        existedContact(
          contacts,
          editedName,
          editedNumber,
          editedEmail || "",
          _id
        )
      ) {
        toast.info(
          "Another contact with the same name or number already exists."
        );
        return;
      }

      dispatch(
        editContact({
          _id,
          name: editedName,
          phoneNumber: editedNumber,
          email: editedEmail && editedEmail.trim() !== "" ? editedEmail : null,
          isFavourite: editedFavourite,
          contactType: editedType,
          photo: editedPhoto || photo,
        })
      );

      toast.success("Contact has been edited!");

      setIsEditing(false);
    } catch (error: any) {
      toast.error(error);
    } finally {
      setEditIsLoading(false);
    }
  };

  return (
    <>
      {isEditing ? (
        <div className="flex items-center gap-2.5">
          <input
            type="text"
            name="edit-name"
            id={nameId}
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="tel"
            name="edit-tel"
            id={numberId}
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            value={editedNumber}
            onChange={(e) => setEditedNumber(e.target.value)}
          />

          <input
            type="email"
            name="edit-email"
            id={emailId}
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            value={editedEmail || ""}
            onChange={(e) => setEditedEmail(e.target.value)}
          />

          <HField className="relative w-full">
            <Select
              name="type"
              id={contactTypeId}
              value={editedType}
              onChange={(e) => setEditedType(e.target.value)}
              className={clsx(
                "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            >
              <option value="work">Work</option>
              <option value="home">Home</option>
              <option value="personal">Personal</option>
            </Select>
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2 right-2 size-4 fill-white/60"
              aria-hidden="true"
            />
          </HField>

          <input
            type="file"
            name="photo"
            id={photoId}
            accept="image/*"
            onChange={handleFileChange}
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          />

          {editedPhoto ? (
            <img
              src={URL.createObjectURL(editedPhoto)}
              alt="Preview"
              className="w-24 h-24 object-cover rounded"
            />
          ) : photo ? (
            <img
              src={photo}
              alt="Contact"
              className="w-24 h-24 object-cover rounded"
            />
          ) : null}

          <HField className="flex items-center gap-2">
            <Checkbox
              checked={editedFavourite}
              onChange={setEditedFavourite}
              className="transition group size-6 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
            >
              <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
            </Checkbox>
            <Label>Favourite</Label>
          </HField>

          {isEditLoading ? (
            <CustomLoader />
          ) : (
            <button
              type="button"
              className="text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2.5">
            {photo && <img src={photo} alt="photo" width="300" />}

            <div className="flex items-center gap-2.5">
              <FaUser />
              <p>{name}</p>
            </div>

            <div className="flex items-center gap-2.5">
              <FaPhoneAlt />
              <p>{phoneNumber}</p>
            </div>

            {email && (
              <div className="flex items-center gap-2.5">
                <MdEmail />
                <p>{email}</p>
              </div>
            )}

            {isFavourite && (
              <div className="flex items-center gap-2.5">
                <FaStar />
                <p>Favourite</p>
              </div>
            )}

            <div className="flex items-center gap-2.5">
              <RiContactsBook2Fill />
              <p>{contactType}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CustomButton onClick={openModal}>Delete</CustomButton>

            <CustomButton onClick={handleEdit}>Edit</CustomButton>
          </div>

          <Modal
            title="Are you sure?"
            text="Your contact will be deleted completely."
            confirm="Delete"
            isOpen={isOpen}
            closeModal={closeModal}
            isLoading={isLoading}
            onClick={handleDelete}
          />
        </>
      )}
    </>
  );
};

export default Contact;

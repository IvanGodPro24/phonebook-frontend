import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt, FaStar } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiContactsBook2Fill } from "react-icons/ri";
import css from "./Contact.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteContact, editContact } from "../../redux/contacts/operations";
import { toast } from "sonner";
import { useId, useState } from "react";
import clsx from "clsx";

import {
  Button,
  Checkbox,
  Field as HField,
  Label,
  Dialog,
  DialogPanel,
  DialogTitle,
  Select,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { ContactHandle } from "../../redux/contacts/contacts.types";
import { selectContacts } from "../../redux/contacts/selectors";
import { existedContact } from "../../utils/contactUtils";

const Contact = ({
  _id,
  name,
  phoneNumber,
  email,
  isFavourite,
  contactType,
}: ContactHandle) => {
  const dispatch = useAppDispatch();

  const contacts = useAppSelector(selectContacts);

  const nameId = useId();
  const numberId = useId();
  const emailId = useId();
  const contactTypeId = useId();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedNumber, setEditedNumber] = useState(phoneNumber);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedFavourite, setEditedFavourite] = useState(isFavourite);
  const [editedType, setEditedType] = useState(contactType);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  const handleDelete = () => {
    dispatch(deleteContact(_id));

    toast.info("Contact has been deleted!");
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    if (
      editedName.trim().toLowerCase() === name.toLowerCase() &&
      editedNumber.trim() === phoneNumber.trim() &&
      editedFavourite === isFavourite &&
      editedEmail?.trim() === email?.trim() &&
      editedType === contactType
    ) {
      setIsEditing(false);
      return;
    }

    if (
      existedContact(contacts, editedName, editedNumber, editedEmail || "", _id)
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
      })
    );

    toast.success("Contact has been edited!");

    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <div className={css.container}>
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

          <button
            type="button"
            className="text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <div className={css["contact-container"]}>
            <div className={css.container}>
              <FaUser />
              <p>{name}</p>
            </div>

            <div className={css.container}>
              <FaPhoneAlt />
              <p>{phoneNumber}</p>
            </div>

            {email && (
              <div className={css.container}>
                <MdEmail />
                <p>{email}</p>
              </div>
            )}

            {isFavourite && (
              <div className={css.container}>
                <FaStar />
                <p>Favourite</p>
              </div>
            )}

            <div className={css.container}>
              <RiContactsBook2Fill />
              <p>{contactType}</p>
            </div>
          </div>

          <button
            type="button"
            className={clsx(
              "text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white",
              css["ml-auto"]
            )}
            onClick={open}
          >
            Delete
          </button>

          <button
            type="button"
            className={clsx(
              css.ml,
              "text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            )}
            onClick={handleEdit}
          >
            Edit
          </button>

          <Dialog
            open={isOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={close}
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                  transition
                  className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-white"
                  >
                    Are you sure?
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-white/50">
                    Your contact will be deleted completely.
                  </p>
                  <div className="mt-4 flex gap-2 justify-between">
                    <Button
                      className="text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={handleDelete}
                    >
                      OK
                    </Button>
                    <Button
                      className="text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={close}
                    >
                      Cancel
                    </Button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </>
      )}
    </>
  );
};

export default Contact;

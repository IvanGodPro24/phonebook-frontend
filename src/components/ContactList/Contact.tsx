import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import css from "./Contact.module.css";
import { useAppDispatch } from "../../hooks";
import { deleteContact, editContact } from "../../redux/contacts/operations";
import { toast } from "sonner";
import { useId, useState } from "react";
import clsx from "clsx";

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Contact as ContactType } from "../../redux/contacts/contacts.types";

const Contact = ({ id, name, number }: ContactType) => {
  const dispatch = useAppDispatch();

  const nameId = useId();
  const numberId = useId();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedNumber, setEditedNumber] = useState(number);
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const handleDelete = () => {
    dispatch(deleteContact(id));

    toast.info("Contact has been deleted!");
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    dispatch(editContact({ id: id, name: editedName, number: editedNumber }));

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
              <p>{number}</p>
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

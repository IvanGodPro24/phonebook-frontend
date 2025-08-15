import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt, FaStar } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiContactsBook2Fill } from "react-icons/ri";
import { useAppDispatch } from "../../hooks/hooks";
import { deleteContact } from "../../redux/contacts/operations";
import { toast } from "sonner";
import { useState } from "react";
import { ContactHandle } from "../../redux/contacts/contacts.types";
import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import CustomButton from "../CustomButton/CustomButton";
import SpotlightCard from "../SpotlightCard/SpotlightCard";
import ContactEditForm from "../ContactEditForm/ContactEditForm";

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

  const [isEditing, setIsEditing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, openModal, closeModal } = useModal();

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

  return (
    <SpotlightCard className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-center">
      {isEditing ? (
        <ContactEditForm
          _id={_id}
          name={name}
          phoneNumber={phoneNumber}
          email={email}
          isFavourite={isFavourite}
          contactType={contactType}
          photo={photo}
          setIsEditing={setIsEditing}
        />
      ) : (
        <>
          <div className="flex flex-col gap-2.5">
            {photo && (
              <img src={photo} alt="photo" width="100" className="rounded-xl" />
            )}

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
          <div className="flex justify-between gap-3">
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
    </SpotlightCard>
  );
};

export default Contact;

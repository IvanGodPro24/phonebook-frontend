import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt, FaStar } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiContactsBook2Fill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { deleteContact, fetchContacts } from "../../redux/contacts/operations";
import {
  selectContacts,
  selectFilters,
  selectPagination,
  selectSortBy,
  selectSortOrder,
} from "../../redux/contacts/selectors";
import { toast } from "sonner";
import { useState } from "react";
import { ContactHandle } from "../../redux/contacts/contacts.types";
import { AnimatePresence, motion } from "framer-motion";
import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import CustomButton from "../CustomButton/CustomButton";
import SpotlightCard from "../SpotlightCard/SpotlightCard";
import ContactEditForm from "../ContactEditForm/ContactEditForm";
import { cleanFilters } from "../../utils/cleanFilters";

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
  const { page, perPage } = useAppSelector(selectPagination);
  const sortOrder = useAppSelector(selectSortOrder);
  const sortBy = useAppSelector(selectSortBy);
  const filters = useAppSelector(selectFilters);

  const [isEditing, setIsEditing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, openModal, closeModal } = useModal();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await dispatch(deleteContact(_id)).unwrap();

      const targetPage = contacts.length === 1 && page > 1 ? page - 1 : page;

      const cleanedFilters = cleanFilters(filters);

      await dispatch(
        fetchContacts({
          page: targetPage,
          perPage,
          sortBy,
          sortOrder,
          filters: cleanedFilters,
        })
      ).unwrap();

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
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="editForm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
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
          </motion.div>
        ) : (
          <motion.div
            key="viewMode"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full"
          >
            <div className="flex flex-col gap-2.5">
              {photo && (
                <img
                  src={photo}
                  alt="photo"
                  width="100"
                  className="rounded-xl"
                />
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
                <div className="flex items-center gap-2.5 max-w-[250px]">
                  <MdEmail size={16} />
                  <p className="truncate">{email}</p>
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

            <div className="flex justify-between gap-3 mt-4 sm:mt-0">
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
          </motion.div>
        )}
      </AnimatePresence>
    </SpotlightCard>
  );
};

export default Contact;

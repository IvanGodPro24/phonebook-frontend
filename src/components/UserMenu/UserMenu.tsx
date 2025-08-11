import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import { LogoutIcon } from "../LogoutIcon/LogoutIcon";
import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { toast } from "sonner";

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { isOpen, openModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleExit = async () => {
    setIsLoading(true);
    try {
      await dispatch(logout()).unwrap();
    } catch (error: any) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-7.5">
      <div className="flex justify-center items-center w-7.5 h-7.5 bg-[var(--primary)] rounded-full text-[var(--black)]">
        {user.name && user.name[0]}
      </div>

      <button type="button" onClick={openModal}>
        <LogoutIcon />
      </button>

      <Modal
        title="Are you sure you want to exit?"
        text="Logging out will end your current session. Do you want to continue?"
        confirm="Log out"
        isOpen={isOpen}
        closeModal={closeModal}
        isLoading={isLoading}
        onClick={handleExit}
      />
    </div>
  );
};

export default UserMenu;

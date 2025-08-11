export type ModalProps = {
  title: string;
  text?: string;
  confirm: string;
  isOpen?: boolean;
  closeModal: () => void;
  isLoading?: boolean;
  onClick: () => void;
};

import css from "./CustomButton.module.css";
import { CustomButtonProps } from "./CustomButton.types";

const CustomButton = ({
  children,
  isSubmitting,
  onClick,
}: CustomButtonProps) => {
  return (
    <button
      className={css["boton-elegante"]}
      onClick={onClick}
      disabled={isSubmitting}
    >
      {children}
    </button>
  );
};

export default CustomButton;

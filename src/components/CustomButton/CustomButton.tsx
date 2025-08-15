import css from "./CustomButton.module.css";
import { CustomButtonProps } from "./CustomButton.types";

const CustomButton = ({
  children,
  type = "submit",
  isSubmitting,
  onClick,
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      className={css["boton-elegante"]}
      onClick={onClick}
      disabled={isSubmitting}
    >
      {children}
    </button>
  );
};

export default CustomButton;

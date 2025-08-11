import css from "./CustomButton.module.css";
import { CustomButtonProps } from "./CustomButton.types";

const CustomButton = ({ children, onClick }: CustomButtonProps) => {
  return (
    <button className={css["boton-elegante"]} onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;

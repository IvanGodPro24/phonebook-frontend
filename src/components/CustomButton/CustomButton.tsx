import clsx from "clsx";
import css from "./CustomButton.module.css";
import { CustomButtonProps } from "./CustomButton.types";

const CustomButton = ({
  children,
  type = "submit",
  disabled,
  onClick,
  isPage,
  isActive,
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        css["boton-elegante"],
        isPage && css.page,
        disabled && css.disabled,
        isActive && css.active
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CustomButton;

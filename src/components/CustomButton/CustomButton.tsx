import clsx from "clsx";
import css from "./CustomButton.module.css";
import { CustomButtonProps } from "./CustomButton.types";
import { ChevronIcon } from "../ChevronIcon/ChevronIcon";

const CustomButton = ({
  children,
  type = "submit",
  disabled,
  onClick,
  isPage,
  isActive,
  isFilter,
  isShowFilter,
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

      {isFilter && (
        <ChevronIcon
          className={clsx(
            "transition-transform duration-300 ease-in-out",
            isShowFilter ? "rotate-180" : "rotate-0"
          )}
          size={24}
        />
      )}
    </button>
  );
};

export default CustomButton;

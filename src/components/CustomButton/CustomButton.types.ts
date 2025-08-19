import { ReactNode } from "react";

export type CustomButtonProps = {
  children: ReactNode;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: () => void;
  isPage?: boolean;
  isActive?: boolean;
  isFilter?: boolean;
  isShowFilter?: boolean;
};

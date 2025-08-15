import { ReactNode } from "react";

export type CustomButtonProps = {
  children: ReactNode;
  type?: "submit" | "reset" | "button";
  isSubmitting?: boolean;
  onClick?: () => void;
};

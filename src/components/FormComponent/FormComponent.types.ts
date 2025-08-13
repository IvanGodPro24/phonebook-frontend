import { ReactNode } from "react";

export type FormComponentProps = {
  isLogIn?: boolean;
  isSubmitting?: boolean;
  children?: ReactNode;
  isAuth?: boolean;
  photo?: File | null;
};

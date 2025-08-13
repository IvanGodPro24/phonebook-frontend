import { FieldHookConfig } from "formik";
import { InputHTMLAttributes, ReactElement } from "react";

export type InputFieldProps = {
  isVisible?: boolean;
  onVisible?: () => void;
  isPassword?: boolean;
  icon: ReactElement;
} & FieldHookConfig<string> &
  InputHTMLAttributes<HTMLInputElement>;

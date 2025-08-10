import { FieldHookConfig } from "formik";
import { InputHTMLAttributes } from "react";

export type InputFieldProps = {
  isVisible?: boolean;
  onVisible?: () => void;
  isPassword?: boolean;
} & FieldHookConfig<string> &
  InputHTMLAttributes<HTMLInputElement>;

import { StringOptions } from "../../constants/constants.types";

export type CustomSelectProps = {
  name: string;
  options: StringOptions[];
  placeholder: string;
  onChange: (value: string) => void;
  value?: StringOptions;
};

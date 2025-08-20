import {
  BooleanOptions,
  NumberOptions,
  StringOptions,
} from "../../constants/constants.types";

export type CustomSelectProps = {
  name: string;
  options: OptionType[];
  placeholder: string;
  isClearable?: boolean;
};

export type OptionType = StringOptions | NumberOptions | BooleanOptions;

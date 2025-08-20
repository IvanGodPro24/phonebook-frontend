import { OptionType } from "../CustomSelect/CustomSelect.types";

export type SelectComponentProps = {
  name: string;
  options: OptionType[];
  placeholder?: string;
  onChange: (value: string | number | boolean) => void;
  value?: OptionType;
  isClearable?: boolean;
};

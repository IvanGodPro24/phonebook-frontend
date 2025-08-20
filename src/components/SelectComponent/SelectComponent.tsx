import Select, { MultiValue, SingleValue } from "react-select";
import { useId } from "react";
import { OptionType } from "../CustomSelect/CustomSelect.types";
import { SelectComponentProps } from "./SelectComponent.types";
import { ChevronIcon } from "../ChevronIcon/ChevronIcon";
import { WorkflowIcon } from "../WorkflowIcon/WorkflowIcon";
import { XIcon } from "../XIcon/XIcon";
import { customStyles } from "../CustomSelect/CustomSelect";

const SelectComponent = ({
  name,
  options,
  placeholder,
  onChange,
  value,
  isClearable = false,
}: SelectComponentProps) => {
  const id = useId();

  const handleChange = (
    newValue: SingleValue<OptionType> | MultiValue<OptionType>
  ) => {
    const singleValue = newValue as SingleValue<OptionType>;
    onChange(singleValue?.value || "");
  };

  return (
    <label htmlFor={id} className="relative w-2xs">
      <Select
        name={name}
        options={options}
        styles={customStyles}
        isSearchable={false}
        value={value}
        onChange={handleChange}
        inputId={id}
        placeholder={placeholder}
        isClearable={isClearable}
        components={{
          DropdownIndicator: ({ innerProps, selectProps }) => (
            <div
              {...innerProps}
              style={{
                transition: "transform 0.3s ease",
                transform: selectProps.menuIsOpen
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
            >
              <ChevronIcon size={24} />
            </div>
          ),
          ClearIndicator: ({ innerProps }) => (
            <div {...innerProps}>
              <XIcon size={24} />
            </div>
          ),
        }}
      />
      <WorkflowIcon
        className="absolute top-1/2 left-4 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
        size={24}
      />
    </label>
  );
};

export default SelectComponent;

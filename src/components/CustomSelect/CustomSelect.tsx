import Select, { MultiValue, SingleValue, StylesConfig } from "react-select";
import { useId } from "react";
import clsx from "clsx";
import { CustomSelectProps } from "./CustomSelect.types";
import { StringOptions } from "../../constants/constants.types";
import { ChevronIcon } from "../ChevronIcon/ChevronIcon";
import { WorkflowIcon } from "../WorkflowIcon/WorkflowIcon";

const customStyles: StylesConfig<StringOptions> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.5rem 0.5rem 0.5rem 2.25rem",
    transition: "all 0.3s",
    boxShadow: "none",
    cursor: "pointer",
    "&:hover": {
      border: "none",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
    margin: 0,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
    textAlign: "left",
    lineHeight: "1.5rem",
    margin: 0,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#fff",
    opacity: 0.6,
    lineHeight: "1.5rem",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "rgb(38, 38, 38)",
    borderRadius: "0.5rem",
    border: "none",
    boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.1)",
  }),
  menuList: () => ({
    padding: "0.25rem",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "rgba(255, 255, 255, 0.1)"
      : state.isFocused
      ? "rgba(255, 255, 255, 0.05)"
      : "transparent",
    color: "#fff",
    textAlign: "left",
    transition: "all 0.3s",
    cursor: "pointer",
    fontSize: "0.875rem",
    lineHeight: "1.5rem",
    borderRadius: "0.25rem",
    "&:active": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

const CustomSelect = ({
  name,
  options,
  placeholder,
  onChange,
  value,
}: CustomSelectProps) => {
  const id = useId();

  const handleChange = (
    newValue: SingleValue<StringOptions> | MultiValue<StringOptions>
  ) => {
    const singleValue = newValue as SingleValue<StringOptions>;
    onChange(singleValue?.value || "");
  };

  return (
    <>
      <label htmlFor={id} className="relative w-full">
        <Select
          name={name}
          options={options}
          styles={customStyles}
          isSearchable={false}
          value={value}
          onChange={handleChange}
          inputId={id}
          placeholder={placeholder}
          components={{
            DropdownIndicator: ({ innerProps, selectProps }) => (
              <div
                {...innerProps}
                className={clsx()}
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
          }}
        />
        <WorkflowIcon
          className="absolute top-1/2 left-4 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
          size={24}
        />
      </label>
    </>
  );
};

export default CustomSelect;

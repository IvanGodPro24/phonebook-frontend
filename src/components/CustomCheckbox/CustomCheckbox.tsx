import { useField } from "formik";
import { Checkbox, Field, Label } from "@headlessui/react";
import { CustomCheckboxProps } from "./CustomCheckbox.types";
import { CheckIcon } from "@heroicons/react/16/solid";
import { useId } from "react";

const CustomCheckbox = ({ name, label }: CustomCheckboxProps) => {
  const id = useId();
  const [field, , helpers] = useField({ name, type: "checkbox" });

  return (
    <Field className="relative w-full flex items-center gap-2">
      <Checkbox
        checked={field.value}
        onChange={(val: boolean) => helpers.setValue(Boolean(val))}
        id={id}
        className="transition group size-6 rounded-md bg-white/10 p-1 ring-1 ring-white/15 cursor-pointer ring-inset data-[checked]:bg-white"
      >
        <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
      </Checkbox>
      <Label htmlFor={id} className="cursor-pointer">
        {label}
      </Label>
    </Field>
  );
};

export default CustomCheckbox;

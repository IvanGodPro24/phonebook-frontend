import clsx from "clsx";
import { Field, useField } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { InputFieldProps } from "./InputField.types";

const InputField = ({
  isVisible,
  onVisible,
  isPassword,
  ...props
}: InputFieldProps) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error;
  const isSuccess = meta.touched && !isError;

  return (
    <div className="relative w-full">
      <Field
        {...(field as any)}
        {...props}
        className={clsx(
          "w-full text-sm p-2.5 pr-7 rounded-xl bg-[#3a3a3a] text-[var(--white)] focus:outline-none",
          {
            "border border-red-500": isError,
            "border border-green-500": isSuccess,
            "pr-12": isPassword,
          }
        )}
      />

      {isPassword && (
        <button
          type="button"
          className={clsx(
            "absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors",
            { "right-7": isError || isSuccess }
          )}
          onClick={onVisible}
        >
          {isVisible ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
      )}

      {isError ? (
        <MdErrorOutline className="absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-1/2 text-red-500" />
      ) : isSuccess ? (
        <IoIosCheckmarkCircle className="absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-1/2 text-green-500" />
      ) : null}
    </div>
  );
};

export default InputField;

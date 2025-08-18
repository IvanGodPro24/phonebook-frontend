import { useId } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchContacts } from "../../redux/contacts/operations";
import { toast } from "sonner";
import CustomButton from "../CustomButton/CustomButton";
import CustomSelect from "../CustomSelect/CustomSelect";
import InputField from "../InputField/InputField";
import { UserIcon } from "../UserIcon/UserIcon";
import { EarthIcon } from "../EarthIcon/EarthIcon";
import { EmailIcon } from "../EmailIcon/EmailIcon";
import { favouriteOptions, typeOptions } from "../../constants/constants";
import { FilterType } from "./FilterForm.types";
import SpotlightCard from "../SpotlightCard/SpotlightCard";
import { setFilters } from "../../redux/contacts/slice";
import { selectPagination } from "../../redux/contacts/selectors";
import { cleanFilters } from "../../utils/cleanFilters";

const FilterSchema: Yup.ObjectSchema<FilterType> = Yup.object().shape({
  name: Yup.string().max(50, "Too long!").optional(),
  phoneNumber: Yup.string().max(50, "Too long!").optional(),
  email: Yup.string()
    .test("email-if-provided", "Invalid email format", (value) => {
      if (!value || value.trim() === "") return true;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    })
    .optional(),
  contactType: Yup.string().optional(),
  isFavourite: Yup.boolean().optional(),
});

const initialValues: FilterType = {
  name: "",
  phoneNumber: "",
  email: "",
  contactType: "",
  isFavourite: "",
};

const FilterForm = () => {
  const dispatch = useAppDispatch();

  const nameId = useId();
  const numberId = useId();
  const emailId = useId();

  const { perPage } = useAppSelector(selectPagination);

  const handleFilter = async (filters: FilterType) => {
    try {
      const cleanedFilters = cleanFilters(filters);

      dispatch(setFilters(cleanedFilters));

      await dispatch(
        fetchContacts({ page: 1, perPage, filters: cleanedFilters })
      ).unwrap();
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFilter}
      validationSchema={FilterSchema}
    >
      <SpotlightCard className="mb-10 p-10">
        <Form className="flex flex-col justify-center items-center gap-2.5">
          <InputField
            type="text"
            name="name"
            id={nameId}
            placeholder="Enter your name"
            icon={
              <UserIcon
                className="absolute top-1/2 left-4 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
                size={24}
              />
            }
          />

          <InputField
            type="tel"
            name="phoneNumber"
            id={numberId}
            placeholder="Enter your phone number"
            icon={
              <EarthIcon
                className="absolute top-1/2 left-4 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
                size={24}
              />
            }
          />

          <InputField
            type="email"
            name="email"
            id={emailId}
            placeholder="Enter your email"
            icon={
              <EmailIcon
                className="absolute top-1/2 left-4 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
                size={24}
              />
            }
          />

          <CustomSelect
            name="contactType"
            options={typeOptions}
            placeholder="Contact type"
            isClearable={true}
          />

          <CustomSelect
            name="isFavourite"
            options={favouriteOptions}
            placeholder="Favourite"
            isClearable={true}
          />

          {/* disabled */}
          <CustomButton>Apply</CustomButton>
        </Form>
      </SpotlightCard>
    </Formik>
  );
};

export default FilterForm;

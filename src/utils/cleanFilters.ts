import { FilterType } from "../components/FilterForm/FilterForm.types";

export const cleanFilters = (filters: FilterType) =>
  Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) => value !== "" && value !== undefined
    )
  );

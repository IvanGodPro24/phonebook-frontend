import { orderOptions, sortOptions } from "../../constants/constants";
import SelectComponent from "../SelectComponent/SelectComponent";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectSortBy, selectSortOrder } from "../../redux/contacts/selectors";
import { setSortBy, setSortOrder } from "../../redux/contacts/slice";

const SortGroup = () => {
  const dispatch = useAppDispatch();
  const sortOrder = useAppSelector(selectSortOrder);
  const sortBy = useAppSelector(selectSortBy);

  const handleSortBy = (value: string | number | boolean) => {
    dispatch(setSortBy(String(value)));
  };

  const handleSortOrder = (value: string | number | boolean) => {
    value === "asc" || value === "desc"
      ? dispatch(setSortOrder(value))
      : dispatch(setSortOrder(null));
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-12">
      <SelectComponent
        name="sortBy"
        options={sortOptions}
        value={sortOptions.find((option) => option.value === sortBy)}
        onChange={handleSortBy}
        placeholder="Sort by"
        isClearable={true}
      />

      <SelectComponent
        name="sortOrder"
        options={orderOptions}
        value={orderOptions.find((option) => option.value === sortOrder)}
        onChange={handleSortOrder}
        placeholder="Order"
        isClearable={true}
      />
    </div>
  );
};

export default SortGroup;

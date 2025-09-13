import SelectComponent from "../SelectComponent/SelectComponent";
import { perPageOptions } from "../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectPagination } from "../../redux/contacts/selectors";
import { setPerPage } from "../../redux/contacts/slice";

const PerPage = () => {
  const dispatch = useAppDispatch();

  const { perPage } = useAppSelector(selectPagination);

  const handlePerPage = (perPage: string | number | boolean) =>
    dispatch(setPerPage(Number(perPage)));

  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-12">
      <p className="text-gray-700 font-semibold text-sm">Items per page</p>
      <SelectComponent
        name="perPage"
        options={perPageOptions}
        value={perPageOptions.find((option) => option.value === perPage)}
        onChange={handlePerPage}
      />
    </div>
  );
};

export default PerPage;

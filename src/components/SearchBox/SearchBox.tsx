import { ChangeEvent, useId } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { changeFilter } from "../../redux/filters/slice";
import { selectHandleFilter } from "../../redux/filters/selectors";

const SearchBox = () => {
  const searchId = useId();

  const dispatch = useAppDispatch();
  const query = useAppSelector(selectHandleFilter);

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(changeFilter(e.target.value));

  return (
    <div className="flex justify-center items-center gap-4 mb-12">
      <label htmlFor={searchId} />
      <input
        type="text"
        name="filter"
        placeholder="Search contacts..."
        id={searchId}
        value={query}
        className="max-w-3xs border border-[#353535] outline-none py-[11px] px-[23px] rounded-full text-[#979797] shadow-[inset_0_-23px_25px_rgba(136,136,136,0.17),inset_0_-36px_30px_rgba(81,81,81,0.23),inset_0_-79px_40px_rgba(0,0,0,0.1),0_2px_1px_rgba(0,0,0,0.06),0_4px_2px_rgba(0,0,0,0.09),0_8px_4px_rgba(0,0,0,0.09),0_16px_8px_rgba(0,0,0,0.09),0_32px_16px_rgba(0,0,0,0.09)]"
        onChange={handleFilter}
      />
    </div>
  );
};

export default SearchBox;

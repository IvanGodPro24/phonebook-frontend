import { useId } from "react";
import css from "./SearchBox.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeFilter } from "../../redux/filters/slice";
import { selectHandleFilter } from "../../redux/filters/selectors";
import clsx from "clsx";

const SearchBox = () => {
  const searchId = useId();

  const dispatch = useAppDispatch();
  const query = useAppSelector(selectHandleFilter);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.filter}>
      <label htmlFor={searchId}>Find contacts</label>
      <input
        type="text"

        name="filter"
        id={searchId}
        value={query}
        className={clsx(
          "search-input",
          "mt-3 block rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
        )}
        onChange={handleFilter}
      />
    </div>
  );
};

export default SearchBox;

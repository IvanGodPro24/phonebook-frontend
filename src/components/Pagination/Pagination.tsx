import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectPagination } from "../../redux/contacts/selectors";

const Pagination = () => {
  const dispatch = useAppDispatch();

  const { page, totalPages, hasNextPage, hasPreviousPage } =
    useAppSelector(selectPagination);

  const handlePageChange = (newPage: number) => {
    dispatch(fetchContacts({ page: newPage, perPage: 10 }));
  };

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <button
        disabled={!hasPreviousPage}
        onClick={() => handlePageChange(page - 1)}
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
      >
        Prev
      </button>

      <span className="text-white">
        {page} / {totalPages}
      </span>

      <button
        disabled={!hasNextPage}
        onClick={() => handlePageChange(page + 1)}
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

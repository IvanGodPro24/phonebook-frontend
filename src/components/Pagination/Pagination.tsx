import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import useDevice from "../../hooks/useDevice";
import { fetchContacts } from "../../redux/contacts/operations";
import {
  selectFilters,
  selectPagination,
} from "../../redux/contacts/selectors";
import CustomButton from "../CustomButton/CustomButton";

const Pagination = () => {
  const dispatch = useAppDispatch();

  const { isMobile } = useDevice();

  const { page, perPage, totalPages, hasNextPage, hasPreviousPage } =
    useAppSelector(selectPagination);
  const filters = useAppSelector(selectFilters);

  const handlePageChange = (newPage: number) => {
    dispatch(fetchContacts({ page: newPage, perPage, filters }));
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-3 mt-6 mb-12">
      <CustomButton
        onClick={() => handlePageChange(page - 1)}
        disabled={!hasPreviousPage}
      >
        Prev
      </CustomButton>

      {!isMobile &&
        pages.map((p) => (
          <CustomButton
            key={p}
            onClick={() => handlePageChange(p)}
            isPage={true}
            isActive={p === page}
          >
            {p}
          </CustomButton>
        ))}

      {isMobile && (
        <span className="inline-flex items-center justify-center px-4 py-2 text-base font-semibold rounded-full bg-white/5 border border-white/10 text-white/90">
          <span className="text-white">{page}</span>
          <span className="mx-1 text-white/50">/</span>
          <span>{totalPages}</span>
        </span>
      )}

      <CustomButton
        onClick={() => handlePageChange(page + 1)}
        disabled={!hasNextPage}
      >
        Next
      </CustomButton>
    </div>
  );
};

export default Pagination;

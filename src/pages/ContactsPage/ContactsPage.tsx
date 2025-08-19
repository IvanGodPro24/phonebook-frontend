import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import DocumentTitle from "../../DocumentTitle";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import Loader from "../../components/Loader/Loader";
import ContactList from "../../components/ContactList/ContactList";
import { fetchContacts } from "../../redux/contacts/operations";
import {
  selectError,
  selectFilters,
  selectLoading,
} from "../../redux/contacts/selectors";
import { selectFilteredContacts } from "../../redux/filters/selectors";
import ShinyText from "../../components/ShinyText/ShinyText";
import ScrambledText from "../../components/ScrambledText/ScrambledText";
import Pagination from "../../components/Pagination/Pagination";
import FilterForm from "../../components/FilterForm/FilterForm";
import CustomButton from "../../components/CustomButton/CustomButton";
import { motion, AnimatePresence } from "framer-motion";

const ContactsPage = () => {
  const dispatch = useAppDispatch();

  const contacts = useAppSelector(selectFilteredContacts);

  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const filters = useAppSelector(selectFilters);

  const [isShowFilter, setIsShowFilter] = useState(false);

  const handleShowFilter = () => setIsShowFilter((prev) => !prev);

  useEffect(() => {
    dispatch(fetchContacts({ page: 1, perPage: 10, filters }));
  }, [dispatch]);

  return (
    <>
      <DocumentTitle>Your Contacts</DocumentTitle>

      <div>
        <div>
          <ShinyText
            text="Stay in Touch"
            disabled={false}
            speed={3}
            className="font-sans font-bold text-2xl mt-12 mb-12"
          />
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="mb-12">
            <ContactForm />
          </div>

          <SearchBox />

          <CustomButton
            isFilter={true}
            isShowFilter={isShowFilter}
            onClick={handleShowFilter}
          >
            {isShowFilter ? "Hide Filters" : "Show Filters"}
          </CustomButton>

          <AnimatePresence>
            {isShowFilter && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <FilterForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!loading && contacts.length === 0 ? (
          <ScrambledText
            className="scrambled-text-demo m-auto mt-20 mb-20"
            radius={100}
            duration={1.2}
            speed={0.5}
          >
            <p className="text-xl text-[var(--white-600)]">
              No contacts found. Please add some contacts or adjust your search.
            </p>
          </ScrambledText>
        ) : (
          <>
            {loading ? <Loader /> : <ContactList />}
            {error && <p className="mt-5 mb-5">{error}</p>}
            <Pagination />
          </>
        )}
      </div>
    </>
  );
};

export default ContactsPage;

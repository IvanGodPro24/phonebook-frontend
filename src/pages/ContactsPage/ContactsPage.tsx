import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import DocumentTitle from "../../DocumentTitle";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import Loader from "../../components/Loader/Loader";
import ContactList from "../../components/ContactList/ContactList";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import { selectFilteredContacts } from "../../redux/filters/selectors";
import ShinyText from "../../components/ShinyText/ShinyText";
import ScrambledText from "../../components/ScrambledText/ScrambledText";
import Pagination from "../../components/Pagination/Pagination";

const ContactsPage = () => {
  const dispatch = useAppDispatch();

  const contacts = useAppSelector(selectFilteredContacts);

  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts({ page: 1, perPage: 10 }));
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

        <div className="flex flex-col justify-center items-center gap-12">
          <ContactForm />
          <SearchBox />
        </div>

        {!loading && contacts.length === 0 ? (
          <ScrambledText
            className="scrambled-text-demo m-auto mb-20"
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

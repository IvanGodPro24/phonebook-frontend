import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import DocumentTitle from "../../DocumentTitle";
import css from "./ContactsPage.module.css";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import Loader from "../../components/Loader/Loader";
import ContactList from "../../components/ContactList/ContactList";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectError, selectLoading } from "../../redux/contacts/selectors";

const ContactsPage = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <DocumentTitle>Your Contacts</DocumentTitle>

      <div className={css["general-container"]}>
        <h1 className="font-bold">Phonebook</h1>

        <ContactForm />
        <SearchBox />

        {loading && <Loader />}
        {error && <p>{error}</p>}
        <ContactList />
      </div>
    </>
  );
};

export default ContactsPage;

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import DocumentTitle from "../../DocumentTitle";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import Loader from "../../components/Loader/Loader";
import ContactList from "../../components/ContactList/ContactList";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import ShinyText from "../../components/ShinyText/ShinyText";

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

        {loading ? <Loader /> : <ContactList />}
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default ContactsPage;

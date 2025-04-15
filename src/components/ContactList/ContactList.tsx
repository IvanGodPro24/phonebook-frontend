import css from "./ContactList.module.css";
import Contact from "./Contact";
import { useAppSelector } from "../../hooks";
import { selectFilteredContacts } from "../../redux/filters/selectors";

const ContactList = () => {
  const contacts = useAppSelector(selectFilteredContacts);

  return (
    <ul className={css.list}>
      {contacts.map(
        ({ _id, name, phoneNumber, email, isFavourite, contactType }) => (
          <li className={css.item} key={_id}>
            <Contact
              _id={_id}
              name={name}
              phoneNumber={phoneNumber}
              email={email}
              isFavourite={isFavourite}
              contactType={contactType}
            />
          </li>
        )
      )}
    </ul>
  );
};

export default ContactList;

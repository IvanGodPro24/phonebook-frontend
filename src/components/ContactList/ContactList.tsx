import Contact from "./Contact";
import { useAppSelector } from "../../hooks/hooks";
import { selectFilteredContacts } from "../../redux/filters/selectors";

const ContactList = () => {
  const contacts = useAppSelector(selectFilteredContacts);

  return (
    <ul className="flex flex-col gap-7.5">
      {contacts.map((contact) => (
        <li className="w-2xs sm:w-lg m-auto" key={contact._id}>
          <Contact {...contact} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

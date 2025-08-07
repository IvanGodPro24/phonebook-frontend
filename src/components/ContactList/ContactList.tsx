import Contact from "./Contact";
import { useAppSelector } from "../../hooks/hooks";
import { selectFilteredContacts } from "../../redux/filters/selectors";

const ContactList = () => {
  const contacts = useAppSelector(selectFilteredContacts);

  return (
    <ul className="flex flex-col gap-7.5">
      {contacts.map((contact) => (
        <li
          className="flex justify-between items-center min-w-sm m-auto border rounded-lg p-3.75"
          key={contact._id}
        >
          <Contact {...contact} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

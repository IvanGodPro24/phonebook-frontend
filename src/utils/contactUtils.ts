import { ContactHandle } from "../redux/contacts/contacts.types";

export const existedContact = (
  contacts: ContactHandle[],
  name: string,
  phoneNumber: string,
  email?: string,
  currentId?: string
): boolean =>
  contacts.some(
    (contact) =>
      contact._id !== currentId &&
      (contact.name.trim().toLowerCase() === name.trim().toLowerCase() ||
        contact.phoneNumber.trim() === phoneNumber.trim() ||
        contact.email?.trim() === email?.trim())
  );

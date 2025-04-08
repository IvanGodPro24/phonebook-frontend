import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";

export const selectHandleFilter = (state) => state.filters.query;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectHandleFilter],
  (contacts, filter) => {
    return contacts.filter(
      (contact) =>
        contact.name?.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number?.includes(filter)
    );
  }
);

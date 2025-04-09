import { RootState } from "../store.types";

export const selectContacts = (state: RootState) => state.contacts.items;

export const selectLoading = (state: RootState) => state.contacts.loading;

export const selectError = (state: RootState) => state.contacts.error;

import { RootState } from "../store.types";

export const selectContacts = (state: RootState) => state.contacts.items;

export const selectLoading = (state: RootState) => state.contacts.loading;

export const selectError = (state: RootState) => state.contacts.error;

export const selectPagination = (state: RootState) => state.contacts.pagination;

export const selectFilters = (state: RootState) => state.contacts.filters;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from "./operations";
import { logout } from "../auth/operations";
import { ContactState } from "./contacts.types";

const handlePending = (state: ContactState) => {
  state.loading = true;
};

const handleRejected = (state: ContactState, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
};

const initialState: ContactState = {
  items: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    perPage: 10,
    totalItems: 0,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  },
  sortBy: null,
  sortOrder: null,
  filters: {
    name: "",
    phoneNumber: "",
    email: "",
    contactType: "",
    isFavourite: "",
  },
};

const slice = createSlice({
  name: "contacts",

  initialState,

  reducers: {
    setPerPage(state, action: PayloadAction<number>) {
      state.pagination.page = 1;
      state.pagination.perPage = action.payload;
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.pagination.page = 1;
      state.sortBy = action.payload;
    },
    setSortOrder(state, action: PayloadAction<"asc" | "desc" | null>) {
      state.pagination.page = 1;
      state.sortOrder = action.payload;
    },
    setFilters(state, action: PayloadAction<typeof state.filters>) {
      state.pagination.page = 1;
      state.filters = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload.contacts;
        state.pagination = {
          page: action.payload.page,
          perPage: action.payload.perPage,
          totalItems: action.payload.totalItems,
          totalPages: action.payload.totalPages,
          hasNextPage: action.payload.hasNextPage,
          hasPreviousPage: action.payload.hasPreviousPage,
        };
      })

      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.filter(
          (contact) => contact._id !== action.payload._id
        );
      })

      .addCase(logout.fulfilled, (state) => {
        state.items = [];
        state.error = null;
        state.loading = false;
      })

      .addCase(editContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.items = state.items.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        );
      })

      .addMatcher((action: PayloadAction<string>) => {
        return action.type.endsWith("rejected");
      }, handleRejected)

      .addMatcher((action: PayloadAction<string>) => {
        return action.type.endsWith("pending");
      }, handlePending);
  },
});

export const { setPerPage, setSortBy, setSortOrder, setFilters } =
  slice.actions;

export default slice.reducer;

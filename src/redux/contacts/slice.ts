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
};

const slice = createSlice({
  name: "contacts",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
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
          (contact) => contact.id !== action.payload.id
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
          contact.id === action.payload.id ? action.payload : contact
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

export default slice.reducer;

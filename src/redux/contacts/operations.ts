import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Contact, ContactPost } from "./contacts.types";

export const fetchContacts = createAsyncThunk<
  Contact[],
  void,
  { rejectValue: string }
>("contacts/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/contacts");

    return response.data.contacts;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const addContact = createAsyncThunk<
  Contact,
  ContactPost,
  { rejectValue: string }
>("contacts/addContact", async (contact, { rejectWithValue }) => {
  try {
    const response = await axios.post("/contacts", contact);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteContact = createAsyncThunk<
  Contact,
  string,
  { rejectValue: string }
>("contacts/deleteContact", async (contactId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/contacts/${contactId}`);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const editContact = createAsyncThunk<
  Contact,
  Contact,
  { rejectValue: string }
>(
  "contacts/editContact",
  async (
    { _id, name, phoneNumber, email, isFavourite, contactType },
    { rejectWithValue }
  ) => {
    try {
      const contactData = {
        name,
        phoneNumber,
        isFavourite,
        contactType,
        email: email && email.trim() !== "" ? email : null,
      };

      const response = await axios.patch(`/contacts/${_id}`, contactData);
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

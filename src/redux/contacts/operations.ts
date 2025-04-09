import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Contact } from "./contacts.types";

export const fetchContacts = createAsyncThunk<
  Contact[],
  void,
  { rejectValue: string }
>("contacts/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/contacts");

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const addContact = createAsyncThunk<
  Contact,
  Contact,
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
  { id: string; name: string; number: string },
  { rejectValue: string }
>("contacts/editContact", async ({ id, name, number }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`/contacts/${id}`, { name, number });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

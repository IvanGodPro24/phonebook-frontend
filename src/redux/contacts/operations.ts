import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Contact, ContactEdit, ContactPost } from "./contacts.types";

export const fetchContacts = createAsyncThunk<
  Contact[],
  void,
  { rejectValue: string }
>("contacts/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/contacts");

    return response.data.contacts;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});

export const addContact = createAsyncThunk<
  Contact,
  ContactPost,
  { rejectValue: string }
>("contacts/addContact", async (contact, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    formData.append("name", contact.name);
    formData.append("phoneNumber", contact.phoneNumber);
    formData.append("isFavourite", String(contact.isFavourite));
    formData.append("contactType", contact.contactType);
    if (contact.email) formData.append("email", contact.email);
    if (contact.photo) formData.append("photo", contact.photo);

    const response = await axios.post("/contacts", formData);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
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
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});

export const editContact = createAsyncThunk<
  Contact,
  ContactEdit,
  { rejectValue: string }
>(
  "contacts/editContact",
  async (
    { _id, name, phoneNumber, email, isFavourite, contactType, photo },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("phoneNumber", phoneNumber);
      formData.append("isFavourite", String(isFavourite));
      formData.append("contactType", contactType);
      if (email) formData.append("email", email);
      if (photo instanceof File) formData.append("photo", photo);

      const response = await axios.patch(`/contacts/${_id}`, formData);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.data || error.message);
    }
  }
);

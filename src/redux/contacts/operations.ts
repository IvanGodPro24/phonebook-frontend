import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  Contact,
  ContactData,
  ContactEdit,
  ContactPost,
  FetchContacts,
} from "./contacts.types";

export const fetchContacts = createAsyncThunk<
  ContactData,
  FetchContacts,
  { rejectValue: string }
>(
  "contacts/fetchAll",
  async (
    { page = 1, perPage = 10, sortOrder, sortBy, filters = {} },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get("/contacts", {
        params: { page, perPage, sortOrder, sortBy, ...filters },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.data || error.message);
    }
  }
);

export const addContact = createAsyncThunk<
  Contact,
  ContactPost,
  { rejectValue: string }
>(
  "contacts/addContact",
  async (
    { name, phoneNumber, email, isFavourite, contactType, photo },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("phoneNumber", phoneNumber);
      formData.append("isFavourite", String(isFavourite));
      formData.append("contactType", contactType);
      if (email) formData.append("email", email);
      if (photo) formData.append("photo", photo);

      const response = await axios.post("/contacts", formData);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.data || error.message);
    }
  }
);

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
    {
      _id,
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
      photo,
      removePhoto,
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("phoneNumber", phoneNumber);
      formData.append("isFavourite", String(isFavourite));
      formData.append("contactType", contactType);
      formData.append("email", email ?? "");
      formData.append("removePhoto", String(!!removePhoto));
      if (photo instanceof File) formData.append("photo", photo);

      const response = await axios.patch(`/contacts/${_id}`, formData);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.data || error.message);
    }
  }
);

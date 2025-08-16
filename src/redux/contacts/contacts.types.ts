export type Contact = {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string | null;
  isFavourite: boolean;
  contactType: string;
  photo: string;
};

export type ContactData = {
  contacts: Contact[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type FetchContacts = {
  page: number;
  perPage: number;
};

export type ContactHandle = {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string | null;
  isFavourite: boolean;
  contactType: string;
  photo: string;
};

export type ContactEdit = {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string | null;
  isFavourite: boolean;
  contactType: string;
  photo: File | null | string;
  removePhoto: boolean;
};

export type ContactPost = {
  name: string;
  phoneNumber: string;
  email?: string | null;
  isFavourite: boolean;
  contactType: string;
  photo: File | null;
};

export type ContactState = {
  items: Contact[];
  loading: boolean;
  error: string | null;
  pagination: Pagination;
};

export type Pagination = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

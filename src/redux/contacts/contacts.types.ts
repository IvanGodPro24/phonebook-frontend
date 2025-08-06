export type Contact = {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string | null;
  isFavourite: boolean;
  contactType: string;
  photo: string;
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
};

export type Contact = {
  _id: string;
  name: string;
  phoneNumber: string;
  contactType: string;
};

export type ContactHandle = {
  _id: string;
  name: string;
  phoneNumber: string;
};

export type ContactPost = {
  name: string;
  phoneNumber: string;
  contactType: string;
};

export type ContactState = {
  items: Contact[];
  loading: boolean;
  error: string | null;
};

export type Contact = {
  id: string;
  name: string;
  number: string;
};

export type ContactState = {
  items: Contact[];
  loading: boolean;
  error: string | null;
};

export type ContactEditFormProps = {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string | null;
  isFavourite: boolean;
  contactType: string;
  photo: string | null;
  setIsEditing: (arg: boolean) => void;
};

export type ContactEditFormState = {
  editName: string;
  editTel: string;
  editEmail?: string | null;
  editType: string;
  editIsFavourite: boolean;
};

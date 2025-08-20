import {
  BooleanOptions,
  NumberOptions,
  StringOptions,
} from "./constants.types";

export const typeOptions: StringOptions[] = [
  { value: "work", label: "Work" },
  { value: "home", label: "Home" },
  { value: "personal", label: "Personal" },
];

export const favouriteOptions: BooleanOptions[] = [
  { value: true, label: "Favourite" },
  { value: false, label: "Not a favourite" },
];

export const sortOptions: StringOptions[] = [
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "phoneNumber", label: "Phone Number" },
  { value: "isFavourite", label: "Is Favourite" },
  { value: "contactType", label: "Contact Type" },
];

export const orderOptions: StringOptions[] = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];

export const perPageOptions: NumberOptions[] = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
  { value: 40, label: "40" },
  { value: 50, label: "50" },
];

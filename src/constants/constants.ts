import { BooleanOptions, StringOptions } from "./constants.types";

export const typeOptions: StringOptions[] = [
  { value: "work", label: "Work" },
  { value: "home", label: "Home" },
  { value: "personal", label: "Personal" },
];

export const favouriteOptions: BooleanOptions[] = [
  { value: true, label: "Favourite" },
  { value: false, label: "Not a favourite" },
];

import { persistentAtom } from "@nanostores/persistent";

export const end_day = persistentAtom(
  "end_day",
  new Date(new Date().getFullYear() + 1, 2, 3).toDateString()
);

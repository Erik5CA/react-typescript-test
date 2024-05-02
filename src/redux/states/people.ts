import { LocalStorageTypes, Person } from "@/models";
import {
  getLocalStorage,
  setLocalStorage,
} from "@/utilities/localStorage.utilities";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Person[] = [];

export const peopleSlice = createSlice({
  name: "people",
  initialState: getLocalStorage(LocalStorageTypes.FAVORITES)
    ? JSON.parse(getLocalStorage(LocalStorageTypes.FAVORITES) as string)
    : initialState,
  reducers: {
    addPeople: (state, action) => {
      setLocalStorage(LocalStorageTypes.FAVORITES, state);
      return action.payload;
    },
  },
});

export const { addPeople } = peopleSlice.actions;

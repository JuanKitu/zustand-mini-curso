import {StateCreator} from "zustand";

interface PersonState {
  fistName: string;
  lastName: string;
}
interface PersonActions {
    setFirstName: (fistName: string) => void;
    setLastName: (lastName: string) => void;
}
export type PersonSlice = PersonState & PersonActions;

export const createPersonSlice: StateCreator<PersonSlice> = (set) => ({
    fistName: '',
    lastName: '',
    setFirstName: (fistName: string) => set({ fistName }),
    setLastName: (lastName: string) => set({ lastName }),
})
import {StateCreator} from "zustand";

interface ConfirmationState {
    isConfirmed: boolean;
}
interface ConfirmationActions {
    setConfirmation: (value: boolean) => void;
}
export type ConfirmationSlice = ConfirmationState & ConfirmationActions;
export const createConfirmationSlice: StateCreator<ConfirmationSlice> = (set) => ({
    isConfirmed: false,
    setConfirmation: (value: boolean) => set({ isConfirmed: value }),
})

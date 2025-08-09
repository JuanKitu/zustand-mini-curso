import {StateCreator} from "zustand";

interface GuestState {
    guestCount: number;
}
interface GuestActions {
    setGuestCount: (guestCount: number) => void;
}
export type GuestSlice = GuestState & GuestActions;

export const createGuestSlice: StateCreator<GuestSlice> = (set) => ({
    guestCount: 0,
    setGuestCount: (guestCount: number) => set(() => {
        if(guestCount < 0) return {guestCount: 0};
        return { guestCount };
    }),
})
import {create} from "zustand";
import {createPersonSlice, PersonSlice} from "./person.slice.ts";
import {devtools} from "zustand/middleware";
import {createGuestSlice, GuestSlice} from "./guest.slice.ts";
import {createDateSlice, DateSlice} from "./date.slice.ts";
import {ConfirmationSlice, createConfirmationSlice} from "./confirmation.slice.ts";

type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;
export const useWeedingBoundStore = create<ShareState>()(
    devtools((...a)=>({
        ...createPersonSlice(...a),
        ...createGuestSlice(...a),
        ...createDateSlice(...a),
        ...createConfirmationSlice(...a),
    }))
)
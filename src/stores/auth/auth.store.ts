import type {AuthStatus, User} from "../../interfaces";
import {create, StateCreator} from "zustand";

interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;
}

const storeAPI: StateCreator<AuthState> = (set) => ({
    status: 'unauthorized',
    token: undefined,
    user: undefined,
})

export const useAuthStore = create<AuthState>()(
    storeAPI
);
import type {AuthStatus, User} from "../../interfaces";
import {create, StateCreator} from "zustand";
import {AuthService} from "../../services/auth.service.ts";
import {devtools, persist} from "zustand/middleware";

interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;
}
interface Actions {
    login: (email: string, password:string) => Promise<void>;
    checkAuthStatus: () => Promise<void>;
    logout: () => void;
}
export type AuthStore = AuthState & Actions;
const storeAPI: StateCreator<AuthStore> = (set) => ({
    status: 'pending',
    token: undefined,
    user: undefined,
    login: async (email, password) => {
        try {
            const {token, ...user} = await AuthService.login(email, password);
            set({status: 'authorized', token, user});
        } catch (e) {
            set({status: 'unauthorized', token: undefined, user: undefined});
            throw e;
        }
    },
    checkAuthStatus: async ()=>{
        try{
            const {token, ...user} = await AuthService.checkStatus();
            set({status: 'authorized', token, user});
        } catch (e) {
            set({status: 'unauthorized', token: undefined, user: undefined});
            throw e;
        }
    },
    logout: () => {
        set({status: 'unauthorized', token: undefined, user: undefined});
    }
})

export const useAuthStore = create<AuthStore>()(
    devtools(
        persist(
            storeAPI,
            {
                name: 'auth-store',
            }
        )
    )
);
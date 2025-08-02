import {create, type StateCreator} from "zustand";
import {persist} from "zustand/middleware";
//import {customSessionStorage} from "../storages/session-storate.storage.ts";
import {firebaseStorage} from "../storages/firebase.storage.ts";

interface PersonState {
    name: string;
    lastName: string;
}

interface Actions {
    setFirstName: (name: string) => void;
    setLastName: (lastName: string) => void;
}
type PersonStore = PersonState & Actions;
const storeAPI: StateCreator<PersonStore> = (set) => ({
    name: 'Juan',
    lastName: 'Perez',
    setFirstName: (name: string) => set({ name }),
    setLastName: (lastName: string) => set({ lastName })
})

export const usePersonStore = create<PersonStore>()(
    persist(
        storeAPI,
        {
            name: 'person-store',
            //storage: customSessionStorage
            storage: firebaseStorage
        }
    )
);
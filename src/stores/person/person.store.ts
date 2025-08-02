import {create, type StateCreator} from "zustand";
import {devtools, persist} from "zustand/middleware";
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
const storeAPI: StateCreator<
    PersonStore,
    [["zustand/devtools", never], ["zustand/persist", unknown]],
    [],
    PersonStore
>  = (set) => ({
    name: 'Juan',
    lastName: 'Perez',
    setFirstName: (name: string) => set({ name }, undefined, 'setFirstName'),
    setLastName: (lastName: string) => set({ lastName }, undefined, 'setLastName'),
});

export const usePersonStore = create<PersonStore>()(
    devtools(
        persist(
            storeAPI,
            {
                name: 'person-store',
                //storage: customSessionStorage
                storage: firebaseStorage
            }
        )
    )
);
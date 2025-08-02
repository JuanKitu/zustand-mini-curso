import {create} from "zustand";

interface PersonState {
    name: string;
    lastName: string;
}

interface Actions {
    setFirstName: (name: string) => void;
    setLastName: (lastName: string) => void;
}
type PersonStore = PersonState & Actions;

export const usePersonStore = create<PersonStore>()(
    (set) => ({
        name: 'Juan',
        lastName: 'Perez',
        setFirstName: (name: string) => set({ name }),
        setLastName: (lastName: string) => set({ lastName })
    })
)
import { create, type StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'
interface Bear {
    id: number;
    name: string;
}
interface BearState {
    blackBears: number;
    polarBears: number;
    pandaBears: number;
    increaseBlackBears: (by: number) => void;
    increasePolarBears: (by: number) => void;
    increasePandaBears: (by: number) => void;
    bears: Bear[];
    doNothing: () => void;
    addBears: () => void;
    clearBears: () => void;
    totalBears: () => number;
}

const storeAPI: StateCreator<BearState> = (set, get) => ({
    blackBears:10,
    pandaBears:1,
    polarBears:5,
    totalBears: () => {
        return get().blackBears + get().pandaBears + get().polarBears + get().bears.length;
    },
    bears: [
        {
            id:1,
            name: 'Oso #1'
        }
    ],
    increaseBlackBears: (by: number) => set((state) => ({
        blackBears: state.blackBears + by
    })),
    increasePolarBears: (by: number) => set((state) => ({
        polarBears: state.polarBears + by
    })),
    increasePandaBears: (by: number) => set((state) => ({
        pandaBears: state.pandaBears + by
    })),
    doNothing: ()=> set(state =>({
        bears: [...state.bears]
    })),
    addBears: ()=> set(state =>({
        bears: [...state.bears,
            {id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}` }]
    })),
    clearBears: ()=> set({bears: []}),
    removeAllBears: () => set({
        blackBears:0,
        pandaBears:0,
        polarBears:0
    }),
    updateBears: (newBears:BearState) => set({ ...newBears}),
})

export const useBearStore = create<BearState>()(
    persist(
        storeAPI,
        {
           name: 'bears-store',
        }
    )
)
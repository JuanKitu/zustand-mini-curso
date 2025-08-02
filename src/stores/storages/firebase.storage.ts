import {createJSONStorage, StateStorage} from "zustand/middleware";

const FIREBASE_URL= 'https://zustand-storage-23f99-default-rtdb.firebaseio.com/zustand';
const firebaseAPI: StateStorage = {
    getItem: async (key) => {
        return JSON.stringify(await fetch(`${FIREBASE_URL}/${key}.json`).then(res => res.json()));
    },
    setItem: async (key, value) => {
        await fetch(`${FIREBASE_URL}/${key}.json`,{
            method: 'PUT',
            body: value
        }).then(res => res.json());
    },
    removeItem: (key) => sessionStorage.removeItem(key)
}
export const firebaseStorage = createJSONStorage(()=> firebaseAPI);
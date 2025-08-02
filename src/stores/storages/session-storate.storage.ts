import {createJSONStorage, StateStorage} from "zustand/middleware";

const storageAPI: StateStorage = {
    getItem: (key) => sessionStorage.getItem(key),
    setItem: (key, value) => sessionStorage.setItem(key, value),
    removeItem: (key) => sessionStorage.removeItem(key)
}
export const customSessionStorage = createJSONStorage(()=> storageAPI);
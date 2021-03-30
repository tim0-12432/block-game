import { nanoid } from "nanoid";
import create from "zustand";

const getLocalStorage = (key: string) => {
    const item = window.localStorage.getItem(key);
    if (item !== null) {
        return JSON.parse(item);
    }
};
const setLocalStorage = (key: string, value: string) => {
    window.localStorage.setItem(key, JSON.stringify(value));
}

export const useStorage = create((set) => ({
    texture: 'dirt',
    setTexture: (texture: string) => {
      set((state) => ({
        texture,
      }));
    }
  }));
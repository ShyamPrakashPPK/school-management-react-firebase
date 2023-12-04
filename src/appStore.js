// appStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

let appStore = (set) => ({
    dopen: true,
    rows: [],
    user: {}, // Initialize user object with default properties
    setRows: (rows) => set((state) => ({ rows: rows })),
    updateDopen: (dopen) => set((state) => ({ dopen: dopen })),
    setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })), // Merge existing user data
});

appStore = persist(appStore, { name: 'cdot_store_api' });
export const useAppStore = create(appStore);

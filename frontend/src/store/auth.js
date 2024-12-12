import {create}  from "zustand"

import { mountStoreDevtool } from 'simple-zustand-devtools'


const useAuthStore = create((set, get) => ({
    allUserData: null,
    loading: false,

    // Create function named user
    user: () => ({
        user_id: get().allUserData?.user_id || null,
        username: get().allUserData?.username || null,
        is_staff: get().allUserData?.is_staff || null,
    }),

    setUser: (user) => set({ allUserData: user }),
    setLoading: (loading) => set({ loading }),
    isLoggedIn: () => get().allUserData !== null,
}))

if(import.meta.env.DEV){
    mountStoreDevtool('Store', useAuthStore)
}

export { useAuthStore }
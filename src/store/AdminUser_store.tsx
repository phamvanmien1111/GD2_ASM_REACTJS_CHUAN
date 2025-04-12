import { create } from 'zustand'
import { UserInterface } from '../types/Product'

interface UserStore {
    user: UserInterface[];
    setUser: (user: UserInterface[]) => void;
    addUser: (newUser: UserInterface) => void;
    updateUser: (updatedUser: UserInterface) => void;
    deleteUser: (userId: string) => void;
}

export const useAdminUserStore = create<UserStore & { 
    editingUser: UserInterface | null;
    editUser: (user: UserInterface) => void;
}>((set) => ({
    user: [],
    editingUser: null, 

    setUser: (user) => set({ user }),
    addUser: (newUser) => set((state) => ({ user: [...state.user, newUser] })),

    editUser: (user) => set({ editingUser: user }), 

    updateUser: (updatedUser) =>
        set((state) => ({
            user: state.user.map((user) =>
                user._id === updatedUser._id ? updatedUser : user
            ),
            editingUser: null, 
        })),

    deleteUser: (userId) =>
        set((state) => ({
            user: state.user.filter((user) => user._id !== userId),
        })),
}));
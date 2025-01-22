import { UserEdit } from '@/types/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


type UserState = {
    user: UserEdit
    saveUser: (userUpdate: UserEdit) => void
    deleteUser: () => void
    getUser: () => UserEdit
    closeDialog: () => void
    openDialog: () => void
}

export const INITIAL_VALUE: UserEdit = {
  id: 0,
  userName: '',
  name: '',
  lastNameFather: '',
  lastNameMother: '',
  email: '',
  isDialogOpen: false,
}

export const useEditUser = create(
  persist<UserState>(
    (set, get) => ({
      user: INITIAL_VALUE,
      saveUser: (userUpdate: UserEdit) => {
        set(() => ({
          user: userUpdate,
        }));
      },
      deleteUser: () => {
        set(() => ({ user: INITIAL_VALUE }));
      },
      getUser: () => get().user,
      closeDialog: () => {
        set((state) => ({
          user: {
            ...state.user,
            isDialogOpen: false,
          },
        }));
      },
      openDialog: () => {
        set((state) => ({
          user: {
            ...state.user,
            isDialogOpen: true,
          },
        }));
      }
    }),
    {
      name: 'user-storage',
    }
  )
);
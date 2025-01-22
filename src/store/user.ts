import { UserEdit } from '@/types/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


type UserState = {
    user: UserEdit
    saveUser: (userUpdate: UserEdit) => void
    deleteUser: () => void
    getUser: () => UserEdit
}

type DialogState = {
    isDialogOpen: boolean
    openDialog: () => void
    closeDialog: () => void
}

export const INITIAL_VALUE: UserEdit = {
  id: 0,
  userName: '',
  name: '',
  lastNameFather: '',
  lastNameMother: '',
  email: '',
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
    }),
    {
      name: 'user-storage',
    }
  )
);

export const useDialog = create(
  persist<DialogState>(
    (set) => ({
      isDialogOpen: false,
      openDialog: () => set({ isDialogOpen: true }),
      closeDialog: () => set({ isDialogOpen: false }),
    }),
    {
      name: 'dialog-storage', // Persistencia del estado del diálogo
    }
  )
);
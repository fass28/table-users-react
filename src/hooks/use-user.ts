import { useState } from 'react'
import { UserUpdate } from '../types/types'
import {deleteUser, updateUser} from '../services/users'

export const useUser = () => {
  const [isLoadinDeleted, setIsLoadinDeleted] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);

  const deleteUserById = async (id: number) => {
    setIsLoadinDeleted(true);
    try {
      const response = await deleteUser(id);
      return response;
    } catch (err) {
      console.error("Error al eliminar el usuario:", err);
    } finally {
      setIsLoadinDeleted(false);
    }
  };

  const updateUserById = async (id: number, user: UserUpdate) => {
    setIsLoadingUpdate(true);
    try {
      await updateUser(id, user); 
    } catch (error) {
      throw new Error(`Error al actualizar el usuario: ${error}`);
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  return {
    deleteUserById,
    updateUserById,
    isLoadinDeleted,
    isLoadingUpdate,
  };
};

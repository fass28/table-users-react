// hooks/useFetchUser.ts
import { useEffect, useState } from "react";
import { Users } from "../types/types";
import { getUser } from "../services/users";

export const useUsers = () => {
  const [users, setUsers] = useState<Users>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await getUser();
      setUsers(data);      
    } catch (err) {
      setError(`Error al obtener los usuarios: ${err}`);
    } finally {
      setIsLoading(false);
      console.log("Fetch finished user-users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    isLoading,
    error,
    fetchUsers,
  };
};

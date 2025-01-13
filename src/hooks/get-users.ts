import { useEffect, useState } from "react";
import  { Users } from "../types/types";



const URL = 'http://localhost:3000/users';

 export const  useFetchUser = () => {
   const [users, setUsers] = useState<Users>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); 
    
    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(URL);
            const data = await response.json();
            setUsers(data.users);
        } catch (err) {
            setError(`Error al obtener los usuarios ${err}`);
        } finally {
            setIsLoading(false);
            console.log('Fetch finished');
        }
    };

    useEffect(() => {
        fetchUsers(); 
    }, []);
    
    return{
        users,
        isLoading,
        error,
        fetchUsers,
    }
}
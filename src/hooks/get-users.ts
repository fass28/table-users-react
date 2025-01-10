import { useEffect, useState } from "react";

type User = {
    id: number;
    user: string;
    email: string;
    name: string;
    lastName_father: string;
    lastName_mother: string;
    password: string;
    user_type: string;
    created_at: string;
    updated_at: string;
}

type Users = User[]

const URL = 'http://localhost:3000/users';

 export const  useFetchUser = () => {
   const [users, setUsers] = useState<Users>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); 
    
    useEffect(()=>{
        const fetchUsers = async () => {
            try {
                const response = await fetch(URL);
                const data = await response.json();
                setUsers(data.users);
            } catch (err) {
                setError(err as string);
            } finally {
                setIsLoading(false);
                console.log('Fetch finished');
            }
        }
        fetchUsers();
    },[])
    
    return{
        users,
        isLoading,
        error
    }
}
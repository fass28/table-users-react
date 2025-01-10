import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Pencil, Trash, ArrowUpDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { FooterPagination } from "./footer-pagination"
import { Input } from "./ui/input"
import { useFetchUser } from "@/hooks/get-users"

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

type UserKey = 'id' | 'user' | 'email' | 'name' | 'lastName_father' | 'lastName_mother'


export function TableDemo() {

    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const { users, isLoading, error } = useFetchUser();
    const [data, setData] = useState<User[]>(users);
    //const [page, setPage] = useState(1);
    const [searchId, setSeatchId] = useState<string>('');
    const [searchUser, setSeatchUser] = useState<string>('');
    const [searchEmail, setSeatchEmail] = useState<string>('');
    const [searchName, setSeatchName] = useState<string>('');

    useEffect(() => {
        setData(users);
    }, [isLoading]);





    const handleSortId = (key: UserKey) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });

        const sortedUsers = [...users].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setData(sortedUsers);
    }

    const handleSortUser = (key: UserKey) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });

        const sortedUsers = [...users].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setData(sortedUsers);
    }

    const handleSortEmail = (key: UserKey) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });

        const sortedUsers = [...users].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setData(sortedUsers);
    }

    const handleSortName = (key: UserKey) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });

        const sortedUsers = [...users].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setData(sortedUsers);
    }

    const handleSearchId = () => {
        const filteredUsers = users.filter(user => user.id.toString() === searchId);
        setData(filteredUsers);
        console.log(filteredUsers);

    }

    const handleSearchUser = () => {
        const filteredUsers = users.filter(user => user.user.includes(searchUser));
        setData(filteredUsers);
    }

    const handleSearchEmail = () => {
        const filteredUsers = users.filter(user => user.email.includes(searchEmail));
        setData(filteredUsers);
    }

    const handleSearchName = () => {
        const filteredUsers = users.filter((user) => {
            const fullName = `${user.name} ${user.lastName_father} ${user.lastName_mother}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            console.log(fullName);

            return fullName.includes(searchName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
        });
        setData(filteredUsers);
    }



    const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeatchId(e.target.value);
        console.log(e.target.value)
    }

    const onChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeatchUser(e.target.value);
        console.log(e.target.value)
    }

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeatchEmail(e.target.value);
        console.log(e.target.value)
    }

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeatchName(e.target.value);
        console.log(e.target.value)
    }


    if (isLoading) return <p>Loading...</p>; // Mensaje mientras los datos se cargan
    if (error) return <p>Error: {error}</p>; // Mensaje en caso de error
    if (data.length === 0) return <p>No users found</p>; // Mensaje si el array está vacío






    return (
        <Table>
            <TableCaption>A list of Users.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="font-medium">
                        <div className="flex items-center space-x-2">
                            <span className="mx-5">Id</span>
                            <Button className="" size="sm" onClick={() => handleSortId('id')}><ArrowUpDown /></Button>
                            <Input type="text" placeholder="Search" value={searchId} onChange={onChangeId} size={1} />
                            <Button className="" size="sm" onClick={handleSearchId}><Search /></Button>
                        </div>

                    </TableHead>
                    <TableHead className="font-medium">
                        <div className="flex items-center space-x-2">
                            <span className="mx-5">User</span>
                            <Button className="" size="sm" onClick={() => handleSortUser('user')}><ArrowUpDown /></Button>
                            <Input type="text" placeholder="Search" value={searchUser} onChange={onChangeUser} size={1} />
                            <Button className="" size="sm" onClick={handleSearchUser}><Search /></Button>
                        </div>

                    </TableHead>
                    <TableHead className="font-medium">
                        <div className="flex items-center space-x-2">
                            <span className="mx-5">Email</span>
                            <Button className="" size="sm" onClick={() => handleSortEmail('email')}><ArrowUpDown /></Button>
                            <Input type="text" placeholder="Search" value={searchEmail} onChange={onChangeEmail} size={1} />
                            <Button className="" size="sm" onClick={handleSearchEmail}><Search /></Button>
                        </div>

                    </TableHead>
                    <TableHead className="font-medium">
                        <div className="flex items-center space-x-2">
                            <span className="mx-5">Name</span>
                            <Button className="" size="sm" onClick={() => handleSortName('name')}><ArrowUpDown /></Button>
                            <Input type="text" placeholder="Search" value={searchName} onChange={onChangeName} size={1} />
                            <Button className="" size="sm" onClick={handleSearchName}><Search /></Button>
                        </div>

                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.user}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{`${user.name} ${user.lastName_father} ${user.lastName_mother}`}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                            <Button className="btn btn-sm btn-primary"><Pencil /></Button>
                            <Button className="btn btn-sm btn-danger"><Trash /></Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={12}> <FooterPagination /></TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

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
import { useUsers } from "@/hooks/use-users"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "./ui/label"
import { User, UserUpdate } from "@/types/types"

type UserKey = 'id' | 'user' | 'email' | 'name' | 'lastNameFather' | 'lastNameMother'

export function TableDemo() {

    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const { users, isLoading, error, fetchUsers } = useFetchUser();
    const [data, setData] = useState<User[]>([]);
    const [searchId, setSeatchId] = useState<string>('');
    const [searchUser, setSeatchUser] = useState<string>('');
    const [searchEmail, setSeatchEmail] = useState<string>('');
    const [searchName, setSeatchName] = useState<string>('');
    const [deleteById, setDeleteById] = useState('');
    const [editUser, setEditUser] = useState<UserUpdate>({
        id: 0,
        name: '',
        lastNameFather: '',
        lastNameMother: '',
        user: '',
        email: ''
    });
    const { deleteUser, updateUser } = useUsers();

    useEffect(() => {
        setData(users);
    }, [users]);


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
            const fullName = `${user.name} ${user.lastNameFather} ${user.lastNameMother}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            console.log(fullName);

            return fullName.includes(searchName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
        });
        setData(filteredUsers);
    }



    const onChangeSearchId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeatchId(e.target.value);
    }

    const onChangeSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeatchUser(e.target.value);
        console.log(e.target.value)
    }

    const onChangeSearchEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeatchEmail(e.target.value);
    }

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeatchName(e.target.value);
    }

    const handleDelete = async (id: number) => {
        setDeleteById(id.toString());
        await deleteUser(id);
        fetchUsers();
        console.log(deleteById);
    }

    const handleEdit = ({ id, user, name, lastNameFather, lastNameMother, email }: UserUpdate) => {
        setEditUser({
            id,
            user,
            name,
            lastNameFather,
            lastNameMother,
            email
        });
    }

    const onChageName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditUser({
            ...editUser,
            name: e.target.value
        });
    }


    const onChangeFatherLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditUser({
            ...editUser,
            lastNameFather: e.target.value
        });
    }

    const onChangeMotherLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditUser({
            ...editUser,
            lastNameMother: e.target.value
        });
    }

    const onChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditUser({
            ...editUser,
            user: e.target.value
        });
    }

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditUser({
            ...editUser,
            email: e.target.value
        })
    }

    const handleSubmit = async (id: number) => {
        await updateUser(id, editUser);
        fetchUsers()
    }

    if (isLoading) return <p>Loading...</p>; // Mensaje mientras los datos se cargan
    if (error) return <p>Error: {error}</p>; // Mensaje en caso de error
    if (data.length === 0) return <p>No users found</p>; // Mensaje si el array está vacío

    return (
        <>
            <Table>
                <TableCaption>A list of Users.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-medium">
                            <div className="flex items-center space-x-2">
                                <span className="mx-5">Id</span>
                                <Button className="" size="sm" onClick={() => handleSortId('id')}><ArrowUpDown /></Button>
                                <Input type="text" placeholder="Search" value={searchId} onChange={onChangeSearchId} size={1} />
                                <Button className="" size="sm" onClick={handleSearchId}><Search /></Button>
                            </div>

                        </TableHead>
                        <TableHead className="font-medium">
                            <div className="flex items-center space-x-2">
                                <span className="mx-5">User</span>
                                <Button className="" size="sm" onClick={() => handleSortUser('user')}><ArrowUpDown /></Button>
                                <Input type="text" placeholder="Search" value={searchUser} onChange={onChangeSearchUser} size={1} />
                                <Button className="" size="sm" onClick={handleSearchUser}><Search /></Button>
                            </div>

                        </TableHead>
                        <TableHead className="font-medium">
                            <div className="flex items-center space-x-2">
                                <span className="mx-5">Email</span>
                                <Button className="" size="sm" onClick={() => handleSortEmail('email')}><ArrowUpDown /></Button>
                                <Input type="text" placeholder="Search" value={searchEmail} onChange={onChangeSearchEmail} size={1} />
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
                            <TableCell>
                                {user.user}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{`${user.name} ${user.lastNameFather} ${user.lastNameMother}`}
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <Dialog>

                                    <DialogTrigger className="btn btn-sm btn-primary" onClick={() => handleEdit(user)}>
                                        <Pencil />
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Edit User {user.id}</DialogTitle>
                                            <DialogDescription>
                                                Make changes to the user here. Click save when you're done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Name
                                                </Label>
                                                <Input id="name" defaultValue={user.name} onChange={onChageName} className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Father Lastname
                                                </Label>
                                                <Input id="name" defaultValue={user.lastNameFather} onChange={onChangeFatherLastName} className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Mother Lastname
                                                </Label>
                                                <Input id="name" defaultValue={user.lastNameMother} onChange={onChangeMotherLastName} className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="username" className="text-right">
                                                    User
                                                </Label>
                                                <Input id="username" defaultValue={user.user} onChange={onChangeUser} className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="username" className="text-right">
                                                    Email
                                                </Label>
                                                <Input id="username" defaultValue={user.email} onChange={onChangeEmail} className="col-span-3" />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" onClick={() => handleSubmit(user.id)} >Save changes</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)} ><Trash /></Button>
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

        </>
    )
}

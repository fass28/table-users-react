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
import { useUsers } from "@/hooks/user-users"
import { useUser } from "@/hooks/use-user"
import { User, UserEdit } from "@/types/types"
import { useEditUser } from "@/store/user"
import {  UserFormDialog } from "./user-form-dialog"


type UserKey = keyof User;

export function TableDemo() {

  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const { users, isLoading, error, fetchUsers } = useUsers();
  const [data, setData] = useState<User[]>([]);
  const [searchId, setSeatchId] = useState<string>('');
  const [searchUser, setSeatchUser] = useState<string>('');
  const [searchEmail, setSeatchEmail] = useState<string>('');
  const [searchName, setSeatchName] = useState<string>('');

  const { deleteUserById } = useUser();
  const {  saveUser, openDialog } = useEditUser()
  
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
    const filteredUsers = users.filter(user => user.userName.includes(searchUser));
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
    await deleteUserById(id);
    fetchUsers();
  }


  const handleTrigger = (user: UserEdit) => {
    saveUser({
      id: user.id,
      userName: user.userName,
      name: user.name,
      lastNameFather: user.lastNameFather,
      lastNameMother: user.lastNameMother,
      email: user.email,
      isDialogOpen: true
    });
    openDialog();
  };

  const onSuccess = () => {
    fetchUsers();
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
                <span className="mx-5">UserName</span>
                <Button className="" size="sm" onClick={() => handleSortUser('userName')}><ArrowUpDown /></Button>
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
          {data.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>
                {user.userName}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{`${user.name} ${user.lastNameFather} ${user.lastNameMother}`}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button className="btn btn-sm btn-danger" onClick={() => handleTrigger(user)} ><Pencil /></Button>
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
      <UserFormDialog onSuccess={onSuccess}/>
    </>
  )
}

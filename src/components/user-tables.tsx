import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { FooterPagination } from "./footer-pagination"
import { useUsers } from "@/hooks/user-users"
import { useUser } from "@/hooks/use-user"
import { User, UserEdit } from "@/types/types"
import { useDialog, useEditUser } from "@/store/user"
import { UserFormDialog } from "./user-form-dialog"
import { Filters } from "./filters"


type UserKey = keyof User;

export function TableDemo() {

  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const { users, isLoading, error, fetchUsers } = useUsers();
  const [data, setData] = useState<User[]>([]);
  const [searchId, setSearchId] = useState<string>('');
  const [searchUser, setSearchUser] = useState<string>('');
  const [searchEmail, setSearchEmail] = useState<string>('');
  const [searchName, setSearchName] = useState<string>('');

  const { deleteUserById } = useUser();
  const { saveUser } = useEditUser()
  const { openDialog } = useDialog()

  useEffect(() => {
    setData(users);
  }, [users]);


  const handleSort = (key: UserKey) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setData(sortedUsers);
  };

  const handleSearch = (key: UserKey, value: string) => {
    let filteredUsers;

    if (key === 'name') {
      filteredUsers = users.filter((user) => {
        const fullName = `${user.name} ${user.lastNameFather} ${user.lastNameMother}`
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return fullName.includes(value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
      });
    } else {
      filteredUsers = users.filter((user) => user[key].toString().toLowerCase().includes(value.toLowerCase()));
    }

    setData(filteredUsers);
  };

  const handleSearchChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
  };

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
            <Filters
              title="Id"
              field="id"
              searchValue={searchId}
              onSearchChange={(e) => handleSearchChange(setSearchId, e.target.value)}
              onSort={() => handleSort('id')}
              onSearch={() => handleSearch('id', searchId)}
            />
            <Filters
              title="UserName"
              field="userName"
              searchValue={searchUser}
              onSearchChange={(e) => handleSearchChange(setSearchUser, e.target.value)}
              onSort={() => handleSort('userName')}
              onSearch={() => handleSearch('userName', searchUser)}
            />
            <Filters
              title="Email"
              field="email"
              searchValue={searchEmail}
              onSearchChange={(e) => handleSearchChange(setSearchEmail, e.target.value)}
              onSort={() => handleSort('email')}
              onSearch={() => handleSearch('email', searchEmail)}
            />
            <Filters
              title="Name"
              field="name"
              searchValue={searchName}
              onSearchChange={(e) => handleSearchChange(setSearchName, e.target.value)}
              onSort={() => handleSort('name')}
              onSearch={() => handleSearch('name', searchName)}
            />
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
      <UserFormDialog onSuccess={onSuccess} />
    </>
  )
}

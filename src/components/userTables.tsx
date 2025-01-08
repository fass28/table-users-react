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
import { users } from "../mock/userMock"
import { Pencil,Trash } from "lucide-react"
import { Button } from "@/components/ui/button"


export function TableDemo() {
    return (
        <Table>
            <TableCaption>A list of Users.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">User ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>User Email</TableHead>
                    <TableHead>User Full Name</TableHead>
                    <TableHead>User Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.user}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell className="text-right space-x-2">
                            <Button className="btn btn-sm btn-primary"><Pencil/></Button>
                            <Button className="btn btn-sm btn-danger"><Trash/></Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

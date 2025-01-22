import { User } from "@/types/types";
import { TableHead } from "./ui/table";
import { Button } from "./ui/button";
import { ArrowUpDown, Search } from "lucide-react";
import { Input } from "./ui/input";

type UserKey = keyof User;

interface FilterProps {
    title: string;
    field: UserKey;
    searchValue: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSort: (key: UserKey) => void;
    onSearch: () => void;
}

export const Filters = ({ title, field, searchValue, onSearchChange, onSort, onSearch }: FilterProps) => {
    return (
        <TableHead className="font-medium">
            <div className="flex items-center space-x-2">
                <span className="mx-5">{title}</span>
                <Button className="" size="sm" onClick={() => onSort(field)}>
                    <ArrowUpDown />
                </Button>
                <Input type="text" placeholder="Search" value={searchValue} onChange={onSearchChange} size={1} />
                <Button className="" size="sm" onClick={onSearch}>
                    <Search />
                </Button>
            </div>
        </TableHead>
    )
}
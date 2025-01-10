import { ModeToggle } from  "@/components/mode-toggle"
import { TableDemo } from "@/components/user-tables"

export const Home = () => {
    return (
        <div className="p-4">
            <ModeToggle />
            <h1>Home</h1>
            <TableDemo />
        </div>
    )
}
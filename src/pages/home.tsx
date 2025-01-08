import { ModeToggle } from "@/components/modeToggle"
import { TableDemo } from "@/components/userTables"

export const Home = () => {
    return (
        <div className="p-4">
            <ModeToggle />
            <h1>Home</h1>
            <TableDemo />
        </div>
    )
}
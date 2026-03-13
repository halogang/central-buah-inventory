import type { UserData } from "../types"
import UserCard from "./UserCard"

interface Props {
    users: UserData[]
    search: string
    isOwner: boolean
    openEdit: (user: UserData) => void
    openPassword: (user: UserData) => void
    onDelete: (user: UserData) => void
}

export default function UsersTab({
    users,
    search,
    isOwner,
    openEdit,
    openPassword,
    onDelete
}: Props) {

    const filtered = users.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase())
    )

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((user) => (
                <UserCard 
                key={user.id}
                user={user}
                isOwner={isOwner}
                onEdit={() => openEdit(user)}
                onPassword={() => openPassword(user)}
                onDelete={() => onDelete(user)}
                />
            ))}
        </div>
    )
}
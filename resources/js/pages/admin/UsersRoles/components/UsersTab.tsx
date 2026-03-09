import type { UserData } from "../types"
import UserCard from "./UserCard"

interface Props {
    users: UserData[]
    search: string
    isOwner: boolean
    openEdit: (user: UserData) => void
    openPassword: (user: UserData) => void
}

export default function UsersTab({
    users,
    search,
    isOwner,
    openEdit,
    openPassword
}: Props) {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const formatRoleName = (name: string) => {
        const words = name.replace(/_/g, ' ').split(' ');
        return words
            .map((w) => {
                if (w.toLowerCase() === 'spv') {
                    return 'SPV';
                }
                return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
            })
            .join(' ');
    };

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
                />
            ))}
        </div>
    )
}
import type { Permission, RoleData } from "../types"
import RoleCard from "./RoleCard"

interface Props {
    roles: RoleData[]
    permissions: Permission[]
    search: string
    isOwner: boolean
    openEdit: (role: RoleData) => void
    onDelete: (role: RoleData) => void
}

export default function RolesTab({
    roles,
    permissions,
    search,
    isOwner,
    openEdit,
    onDelete
}: Props) {

    const filtered = roles.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="flex flex-col gap-4">

            {filtered.map((role) => (
                <RoleCard
                    key={role.id}
                    role={role}
                    permissions={permissions}
                    isOwner={isOwner}
                    onEdit={() => openEdit(role)}
                    onDelete={() => onDelete(role)}
                />
            ))}

        </div>
    )
}
import Pagination from "@/components/Pagination"
import { usePagination } from "@/hooks/use-pagination"
import type { Permission, RoleData } from "../types"
import RoleCard from "./RoleCard"

interface Props {
    roles: RoleData[]
    permissions: Permission[]
    search: string
    isOwner: boolean
    openEdit: (role: RoleData) => void
    onDelete: (role: RoleData) => void
    groupPermissions: (perms: Permission[]) => Record<string, Permission[]>
    formatModuleName: (name: string) => string
}

export default function RolesTab({
    roles,
    permissions,
    search,
    isOwner,
    openEdit,
    onDelete,
    groupPermissions,
    formatModuleName,
}: Props) {

    const filtered = roles.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
    )

    const {
        currentPage,
        totalPages,
        paginatedData,
        goTo,
    } = usePagination(filtered, 6)

    return (
        <>
            <div className="flex flex-col gap-4">

                {paginatedData.map((role) => (
                    <RoleCard
                        key={role.id}
                        role={role}
                        permissions={permissions}
                        isOwner={isOwner}
                        onEdit={() => openEdit(role)}
                        onDelete={() => onDelete(role)}
                        groupPermissions={groupPermissions}
                        formatModuleName={formatModuleName}
                    />
                ))}

            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goTo}
            />
        </>
    )
}
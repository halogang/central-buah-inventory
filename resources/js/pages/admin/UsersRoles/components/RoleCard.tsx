import { SquarePen, Trash2, Shield } from "lucide-react"
import type { RoleData, Permission } from "../types"

interface Props {
    role: RoleData
    permissions: Permission[]
    isOwner: boolean
    onEdit: () => void
    onDelete: () => void
}

export default function RoleCard({
    role,
    permissions,
    onEdit,
    onDelete
}: Props) {

    const formatRoleName = (name: string) => {
        const words = name.replace(/_/g, " ").split(" ")

        return words
            .map((w) => {
                if (w.toLowerCase() === "spv") return "SPV"
                return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
            })
            .join(" ")
    }

    return (
        <div
            className="rounded-3xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border cursor-pointer flex items-start justify-between gap-4"
        >
            <div className="flex items-start gap-3 mb-3">
                <div className="rounded-xl bg-primary/10 p-3">
                    <Shield className="size-5 text-primary" />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="font-semibold text-sm">
                        {formatRoleName(role.name)}
                    </div>
                    {role.description ? (
                        <p className="text-xs text-muted-foreground">
                            {role.description}
                        </p>
                    ): (
                        <p className="text-xs text-muted-foreground">
                            Tidak ada deskripsi
                        </p>
                    )}

                    <div className="flex flex-wrap gap-1 text-[10px] font-medium">
                        {role.permissions.length === permissions.length ? (
                            <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-700">
                                Akses penuh
                            </span>
                        ) : (
                            <>
                                {(role.permissions || []).map((perm) => (
                                    <span
                                        key={perm.id}
                                        className="inline-block px-2 py-1 rounded-full bg-muted text-muted-foreground"
                                    >
                                        {perm.name}
                                    </span>
                                ))}
                            </>
                        )}
                    </div>
                    <div className="text-muted-foreground text-xs">
                        {role.users_count} user{role.users_count !== 1 ? 's' : ''}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 justify-end pt-2 border-t border-sidebar-border/50">
                <button onClick={onEdit}>
                    <SquarePen className="size-4 text-muted-foreground hover:text-primary transition-colors" />
                </button>
                <button onClick={onDelete}>
                    <Trash2 className="size-4 text-muted-foreground hover:text-red-600 transition-colors" />
                </button>
            </div>
        </div>
    )
}
import { User } from "lucide-react";
import type { RoleData, Permission } from "../types"

interface Props {
    simulatedRole: RoleData | null
    permissions: Permission[]
}

export default function PermissionSimulation({
    simulatedRole,
    permissions
}: Props) {

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

    if (!simulatedRole) return null

    return (
        <div className="mb-4 p-4 rounded-lg border border-primary/50 bg-primary/5">
            <div className="mb-3">
                <div className="flex gap-2 items-center mb-1">
                    <User className="size-5" />
                    <h3 className="font-semibold text-sm">
                        Mode Simulasi: {formatRoleName(simulatedRole.name)}
                    </h3>
                </div>
                {simulatedRole.description ? (
                    <p className="text-sm text-muted-foreground">
                        {simulatedRole.description}
                    </p>
                ):(
                    <p className="text-sm text-muted-foreground">
                        tidak ada deskripsi
                    </p>
                )}
            </div>

            <div className="flex gap-2">
                {permissions.map((perm) => {
                    const hasPermission = simulatedRole.permissions.some(
                        (p) => p.id === perm.id
                    );
                    return (
                        <div
                            key={perm.id}
                            className={`w-fit flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${
                                hasPermission
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                                    : 'bg-muted text-muted-foreground line-through'
                            }`}
                        >
                            {perm.name}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
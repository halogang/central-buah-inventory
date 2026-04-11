import { Head, router, usePage } from "@inertiajs/react"
import { Plus, Shield } from "lucide-react"
import { useState } from "react"
import { SearchInput } from "@/components/search-input"
import { Button } from "@/components/ui/button"
import AppLayout from "@/layouts/app-layout"

import { notify } from "@/lib/notify"
import { destroy as destroyRole } from "@/routes/master/roles"
import { destroy as destroyUser } from "@/routes/master/users"
import PasswordModal from "./components/PasswordModal"
import PermissionSimulation from "./components/PermissionSimulation"
import RoleFormModal from "./components/RoleFormModal"
import RoleSimulation from "./components/RoleSimulation"
import RolesTab from "./components/RolesTab"
import UserFormModal from "./components/UserFormModal"
import UsersTab from "./components/UsersTab"


import type { UserData, RoleData, Permission } from "./types"
import { useCan } from "@/utils/permissions"


export default function Index() {
    const can = useCan();

    const { users = [], roles = [], permissions = [], auth } = usePage<{
        users: UserData[]
        roles: RoleData[]
        permissions: Permission[]
        auth: any
    }>().props

    const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users')
    const [search, setSearch] = useState('')
    const [simulatedRole, setSimulatedRole] = useState<RoleData | null>(null)

    const [showUserModal, setShowUserModal] = useState(false)
    const [showRoleModal, setShowRoleModal] = useState(false)
    const [showPasswordModal, setShowPasswordModal] = useState(false)

    const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
    const [selectedRole, setSelectedRole] = useState<RoleData | null>(null)

    const isOwner = auth.user.roles.some((r: any) => r.name === "owner")

    const confirmDeleteUser = (user: UserData) => {
        notify.confirmDelete({
            message: `Hapus ${user.name}?`,
            onConfirm: () => performDeleteUser(user),
        })
    }

    const performDeleteUser = (user: UserData) => {
        const loading = notify.loading("Menghapus pengguna...")

        router.delete(destroyUser(user.id), {
            onSuccess: () => {
                notify.dismiss(loading)
                notify.success(`${user.name} berhasil dihapus`)
            },
            onError: () => {
                notify.dismiss(loading)
                notify.error(`Gagal menghapus ${user.name}`)
            },
        })
    }

    const confirmDeleteRole = (role: RoleData) => {
        notify.confirmDelete({
            message: `Hapus ${role.name}?`,
            onConfirm: () => performDeleteRole(role),
        })
    }

    const performDeleteRole = (role: RoleData) => {
        const loading = notify.loading("Menghapus pengguna...")

        router.delete(destroyRole(role.id), {
            onSuccess: () => {
                notify.dismiss(loading)
                notify.success(`${role.name} berhasil dihapus`)
            },
            onError: () => {
                notify.dismiss(loading)
                notify.error(`Gagal menghapus ${role.name}`)
            },
        })
    }

    function groupPermissions(perms: Permission[]) {
        const map: Record<string, Permission[]> = {}

        perms.forEach((p) => {
            const [module] = p.name.split('.')
            if (!map[module]) map[module] = []
            map[module].push(p)
        })

        return map
    }

    function formatModuleName(name: string) {
        return name
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase())
    }

    return (
        <AppLayout>
            <Head title="Pengguna & Role" >
                <meta name="robots" content="noindex" />
            </Head>

            <div className="p-4">

                <RoleSimulation
                    roles={roles}
                    simulatedRole={simulatedRole}
                    setSimulatedRole={setSimulatedRole}
                />

                <PermissionSimulation
                    simulatedRole={simulatedRole}
                    permissions={permissions}
                    groupPermissions={groupPermissions}
                    formatModuleName={formatModuleName}
                />

                <div className="flex justify-between items-center mb-4 gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab('users')}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            activeTab === 'users'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                    >
                        <Shield className="size-4" />
                        Pengguna
                    </button>
                    {can('role.index') && (
                        <button
                            type="button"
                            onClick={() => setActiveTab('roles')}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                                activeTab === 'roles'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                        >
                            <Shield className="size-4" />
                            Role
                        </button>
                    )}
                </div>

                <div className="flex justify-between gap-2 items-center mb-4">

                    <SearchInput
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {can('user.create') && activeTab == "users" && isOwner && (
                        <Button
                            onClick={() => {
                                setShowUserModal(true)
                            }}
                        >
                            <Plus />
                            Tambah
                        </Button>
                    )}
                    {can('role.create') && activeTab == "roles" && isOwner && (
                        <Button
                            onClick={() => {
                                setShowRoleModal(true)
                            }}
                        >
                            <Plus />
                            Tambah
                        </Button>
                    )}
                </div>

                {activeTab === "users" && (
                    <UsersTab
                        users={users}
                        search={search}
                        isOwner={isOwner}
                        openEdit={(u) => {
                            setSelectedUser(u)
                            setShowUserModal(true)
                        }}
                        openPassword={(u) => {
                            setSelectedUser(u)
                            setShowPasswordModal(true)
                        }}
                        onDelete={confirmDeleteUser}
                    />
                )}

                {activeTab === "roles" && (
                    <RolesTab
                        roles={roles}
                        permissions={permissions}
                        search={search}
                        isOwner={isOwner}
                        groupPermissions={groupPermissions}
                        formatModuleName={formatModuleName}
                        openEdit={(r) => {
                            setSelectedRole(r)
                            setShowRoleModal(true)
                        }}
                        onDelete={confirmDeleteRole}
                    />
                )}

                <UserFormModal
                    open={showUserModal}
                    onClose={() => setShowUserModal(false)}
                    user={selectedUser}
                    roles={roles}
                />

                <RoleFormModal
                    open={showRoleModal}
                    onClose={() => setShowRoleModal(false)}
                    role={selectedRole}
                    permissions={permissions}
                />

                <PasswordModal
                    open={showPasswordModal}
                    onClose={() => setShowPasswordModal(false)}
                    user={selectedUser}
                />
            </div>
        </AppLayout>
    )
}
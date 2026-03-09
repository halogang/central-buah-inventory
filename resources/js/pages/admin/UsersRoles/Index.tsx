import { Head, usePage } from "@inertiajs/react"
import { Plus, Shield } from "lucide-react"
import { useState } from "react"
import { SearchInput } from "@/components/search-input"
import { Button } from "@/components/ui/button"
import AppLayout from "@/layouts/app-layout"

import PasswordModal from "./components/PasswordModal"
import PermissionSimulation from "./components/PermissionSimulation"
import RoleFormModal from "./components/RoleFormModal"
import RoleSimulation from "./components/RoleSimulation"
import RolesTab from "./components/RolesTab"
import UserFormModal from "./components/UserFormModal"
import UsersTab from "./components/UsersTab"


import type { UserData, RoleData, Permission } from "./types"


export default function Index() {

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

    return (
        <AppLayout>
            <Head title="Users & Roles" />

            <div className="p-4">

                <RoleSimulation
                    roles={roles}
                    simulatedRole={simulatedRole}
                    setSimulatedRole={setSimulatedRole}
                />

                <PermissionSimulation
                    simulatedRole={simulatedRole}
                    permissions={permissions}
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
                </div>

                <div className="flex justify-between items-center mb-4">

                    <SearchInput
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {isOwner && (
                        <Button
                            onClick={() => {
                                activeTab === "users"
                                    ? setShowUserModal(true)
                                    : setShowRoleModal(true)
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
                    />
                )}

                {activeTab === "roles" && (
                    <RolesTab
                        roles={roles}
                        permissions={permissions}
                        search={search}
                        isOwner={isOwner}
                        openEdit={(r) => {
                            setSelectedRole(r)
                            setShowRoleModal(true)
                        }}
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
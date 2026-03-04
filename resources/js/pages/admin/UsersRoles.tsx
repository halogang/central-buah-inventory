import { Head, usePage, router } from '@inertiajs/react';
import { Plus, SquarePen, Trash2, Shield, Eye, User, Mail, Phone, X } from 'lucide-react';
import { useState } from 'react';
import {
    FormInput,
    FormSelect,
    FormTextarea,
    FormCheckbox,
} from '@/components/admin';
import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import * as RoleRoutes from '@/routes/master/roles';
import * as UserRoutes from '@/routes/master/users';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengguna & Role',
        href: '/master/users',
    },
];

interface Role {
    id: number;
    name: string;
    description?: string;
    permissions?: Array<{ id: number; name: string }>;
}

interface UserData {
    id: number;
    name: string;
    email: string;
    phone?: string;
    status_aktif?: boolean;
    roles: Role[];
}

interface RoleData {
    id: number;
    name: string;
    description?: string;
    permissions: Array<{ id: number; name: string }>;
    users_count: number;
}

interface Permission {
    id: number;
    name: string;
}

type UserForm = {
    name: string;
    email: string;
    phone: string;
    role_id: string;
    status_aktif: boolean;
};

type RoleForm = {
    name: string;
    description: string;
    permission_ids: number[];
};

export default function UsersRoles() {
    const { users = [], roles = [], permissions = [] } = usePage<{
        users: UserData[];
        roles: RoleData[];
        permissions: Permission[];
    }>().props;

    const errors = usePage<{ errors?: Record<string, string> }>().props.errors || {};

    const [activeTab, setActiveTab] = useState<'pengguna' | 'role'>('pengguna');
    const [search, setSearch] = useState('');
    const [simulatedRole, setSimulatedRole] = useState<RoleData | null>(null);

    // User states
    const [showCreateUser, setShowCreateUser] = useState(false);
    const [editUser, setEditUser] = useState<UserData | null>(null);
    const [deleteUserItem, setDeleteUserItem] = useState<UserData | null>(null);
    const [toastForUser, setToastForUser] = useState<string | null>(null);

    const emptyUserForm: UserForm = {
        name: '',
        email: '',
        phone: '',
        role_id: '',
        status_aktif: true,
    };
    const [userForm, setUserForm] = useState(emptyUserForm);

    // Role states
    const [showCreateRole, setShowCreateRole] = useState(false);
    const [editRole, setEditRole] = useState<RoleData | null>(null);
    const [deleteRoleItem, setDeleteRoleItem] = useState<RoleData | null>(null);
    const [toastForRole, setToastForRole] = useState<string | null>(null);

    const emptyRoleForm: RoleForm = {
        name: '',
        description: '',
        permission_ids: [],
    };
    const [roleForm, setRoleForm] = useState(emptyRoleForm);

    const filteredUsers = users.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase())
    );

    const filteredRoles = roles.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
    );

    // helpers for user modal
    const openUserForm = (user?: UserData) => {
        if (user) {
            setEditUser(user);
            setUserForm({
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                role_id: user.roles.length > 0 ? user.roles[0].id.toString() : '',
                status_aktif: user.status_aktif ?? true,
            });
        } else {
            setEditUser(null);
            setUserForm(emptyUserForm);
        }
        setShowCreateUser(true);
    };

    const closeUserForm = () => {
        setShowCreateUser(false);
        setEditUser(null);
        setUserForm(emptyUserForm);
    };

    // helpers for role modal
    const openRoleForm = (role?: RoleData) => {
        if (role) {
            setEditRole(role);
            setRoleForm({
                name: role.name,
                description: role.description || '',
                permission_ids: role.permissions?.map(p => p.id) || [],
            });
        } else {
            setEditRole(null);
            setRoleForm(emptyRoleForm);
        }
        setShowCreateRole(true);
    };

    const closeRoleForm = () => {
        setShowCreateRole(false);
        setEditRole(null);
        setRoleForm(emptyRoleForm);
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // format a role identifier for display.  snake_case becomes spaced, and
    // the "spv" acronym is forced uppercase before title-casing the rest.
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

    const getInitialColor = (name: string) => {
        const colors = [
            'bg-red-100 text-red-700',
            'bg-blue-100 text-blue-700',
            'bg-purple-100 text-purple-700',
            'bg-pink-100 text-pink-700',
            'bg-yellow-100 text-yellow-700',
            'bg-green-100 text-green-700',
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    // User CRUD handlers
    const submitUserForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (editUser) {
            router.put(UserRoutes.update(editUser.id), userForm, {
                onSuccess: () => {
                    closeUserForm();
                },
            });
        } else {
            router.post(UserRoutes.store(), userForm, {
                onSuccess: () => {
                    closeUserForm();
                    setUserForm(emptyUserForm);
                },
            });
        }
    };

    const confirmDeleteUser = (item: UserData) => {
        setDeleteUserItem(item);
        setToastForUser(`Hapus ${item.name}?`);
    };

    const performDeleteUser = () => {
        if (deleteUserItem) {
            router.delete(UserRoutes.destroy(deleteUserItem.id), {
                onSuccess: () => {
                    setToastForUser(null);
                    setDeleteUserItem(null);
                },
            });
        }
    };

    // Role CRUD handlers
    const submitRoleForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (editRole) {
            router.put(RoleRoutes.update(editRole.id), roleForm, {
                onSuccess: () => {
                    closeRoleForm();
                },
            });
        } else {
            router.post(RoleRoutes.store(), roleForm, {
                onSuccess: () => {
                    closeRoleForm();
                    setRoleForm(emptyRoleForm);
                },
            });
        }
    };

    const confirmDeleteRole = (item: RoleData) => {
        setDeleteRoleItem(item);
        setToastForRole(`Hapus ${item.name}?`);
    };

    const performDeleteRole = () => {
        if (deleteRoleItem) {
            router.delete(RoleRoutes.destroy(deleteRoleItem.id), {
                onSuccess: () => {
                    setToastForRole(null);
                    setDeleteRoleItem(null);
                },
            });
        }
    };
    
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengguna & Role" />
            <div className="p-4">

                {/* Role Simulation */}
                <div className="flex p-3 justify-between items-center rounded-2xl border border-sidebar-border/70 bg-background mb-4">
                    <div className="flex items-center gap-2">
                        <Eye className="size-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">
                            Simulasi Role:
                        </span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <button
                            type="button"
                            onClick={() => setSimulatedRole(null)}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                !simulatedRole
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                        >
                            Semua
                        </button>
                        {roles.map((role) => (
                            <button
                                key={role.id}
                                type="button"
                                onClick={() => setSimulatedRole(role)}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                    simulatedRole?.id === role.id
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                }`}
                            >
                                {formatRoleName(role.name)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Permissions Simulation */}
                {simulatedRole && (
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
                )}

                {/* Tab Buttons */}
                <div className="flex justify-between items-center mb-4 gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab('pengguna')}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            activeTab === 'pengguna'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                    >
                        <Shield className="size-4" />
                        Pengguna
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('role')}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            activeTab === 'role'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                    >
                        <Shield className="size-4" />
                        Role
                    </button>
                </div>

                {/* Search and Add Button */}
                <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
                    <SearchInput
                        placeholder={
                            activeTab === 'pengguna'
                                ? 'Cari Pengguna...'
                                : 'Cari Role...'
                        }
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button 
                        size="lg" 
                        className="w-full sm:w-fit"
                        onClick={() => {
                            if (activeTab === 'pengguna') {
                                openUserForm();
                            } else {
                                openRoleForm();
                            }
                        }}
                    >
                        <Plus />
                        {activeTab === 'pengguna' ? 'Tambah Pengguna' : 'Tambah Role'}
                    </Button>
                </div>

                {/* Users Tab Content */}
                {activeTab === 'pengguna' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className="rounded-3xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border cursor-pointer flex items-start justify-between gap-4"
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`rounded-full w-10 h-10 flex items-center justify-center font-bold ${getInitialColor(
                                            user.name
                                        )}`}
                                    >
                                        {getInitials(user.name)}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="font-semibold text-sm">
                                            {user.name}
                                        </div>
                                        {user.roles.length > 0 && (
                                            <div className="flex gap-1 flex-wrap">
                                                {user.roles.map((role) => (
                                                    <span
                                                        key={role.id}
                                                        className="inline-block px-2 py-1 rounded-full text-[10px] font-semibold bg-primary/20 text-primary"
                                                    >
                                                        {formatRoleName(role.name)}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <div className="space-y-1 text-xs text-muted-foreground">
                                            <div className='flex items-center gap-1'>
                                                <Mail className="size-3" />
                                                {user.email}
                                            </div>
                                            {user.phone &&
                                            <div className='flex items-center gap-1'>
                                                <Phone className="size-3" />
                                                {user.phone}
                                            </div>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 justify-end pt-2 border-t border-sidebar-border/50">
                                    <button onClick={() => openUserForm(user)}>
                                        <SquarePen className="size-4 text-muted-foreground hover:text-primary transition-colors" />
                                    </button>
                                    <button onClick={() => confirmDeleteUser(user)}>
                                        <Trash2 className="size-4 text-muted-foreground hover:text-red-600 transition-colors" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Roles Tab Content */}
                {activeTab === 'role' && (
                    <div className="flex flex-col gap-4">
                        {filteredRoles.map((role) => (
                            <div
                                key={role.id}
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
                                    <button onClick={() => openRoleForm(role)}>
                                        <SquarePen className="size-4 text-muted-foreground hover:text-primary transition-colors" />
                                    </button>
                                    <button onClick={() => confirmDeleteRole(role)}>
                                        <Trash2 className="size-4 text-muted-foreground hover:text-red-600 transition-colors" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* USER CREATE/EDIT MODAL */}
                {(showCreateUser || editUser) && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate__animated animate__fadeIn p-1"
                        onClick={() => closeUserForm()}
                    >
                        <div className="bg-background rounded-lg py-6 w-full max-w-2xl shadow-lg animate__animated animate__zoomIn"
                             onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center border-b border-sidebar-border pb-2 px-6 mb-4">
                                <h2 className="text-lg font-semibold">
                                    {editUser ? `Edit ${editUser.name}` : 'Tambah Pengguna'}
                                </h2>
                                <X className="h-5 w-5 cursor-pointer" onClick={closeUserForm} />
                            </div>
                            <form onSubmit={submitUserForm} className="space-y-4 px-6">
                                <FormInput
                                    label="Nama Lengkap"
                                    value={userForm.name}
                                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                                    error={errors.name}
                                    required
                                    placeholder="Nama lengkap..."
                                />
                                <FormInput
                                    label="Email"
                                    type="email"
                                    value={userForm.email}
                                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                                    error={errors.email}
                                    required
                                    placeholder="email@example.com"
                                />
                                <FormInput
                                    label="No. Telepon"
                                    type="tel"
                                    value={userForm.phone}
                                    onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                                    error={errors.phone}
                                    placeholder="08123456789"
                                />
                                <FormSelect
                                    label="Role"
                                    value={userForm.role_id}
                                    onChange={(e) => setUserForm({ ...userForm, role_id: e.target.value })}
                                    options={roles.map(r => ({ value: r.id.toString(), label: formatRoleName(r.name) }))}
                                    error={errors.role_id}
                                    required
                                />
                                <FormCheckbox
                                    label="Status Aktif"
                                    checked={userForm.status_aktif}
                                    onChange={(e) => setUserForm({ ...userForm, status_aktif: e.target.checked })}
                                />

                                <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-sidebar-border">
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        onClick={closeUserForm}
                                    >
                                        Batal
                                    </Button>
                                    <Button type="submit">
                                        Simpan
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* ROLE CREATE/EDIT MODAL */}
                {(showCreateRole || editRole) && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate__animated animate__fadeIn p-1"
                        onClick={() => closeRoleForm()}
                    >
                        <div className="bg-background rounded-lg py-6 w-full max-w-2xl shadow-lg animate__animated animate__zoomIn max-h-[90vh] overflow-y-auto"
                             onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center border-b border-sidebar-border pb-2 px-6 mb-4 sticky top-0 bg-background">
                                <h2 className="text-lg font-semibold">
                                    {editRole ? `Edit ${editRole.name}` : 'Tambah Role'}
                                </h2>
                                <X className="h-5 w-5 cursor-pointer" onClick={closeRoleForm} />
                            </div>
                            <form onSubmit={submitRoleForm} className="space-y-4 px-6">
                                <FormInput
                                    label="Nama Role"
                                    value={roleForm.name}
                                    onChange={(e) => setRoleForm({ ...roleForm, name: e.target.value })}
                                    error={errors.name}
                                    required
                                    placeholder="Nama role..."
                                />
                                <FormTextarea
                                    label="Deskripsi"
                                    value={roleForm.description}
                                    onChange={(e) => setRoleForm({ ...roleForm, description: e.target.value })}
                                    error={errors.description}
                                    placeholder="Deskripsi role..."
                                />
                                
                                <div className="border-t border-sidebar-border pt-4">
                                    <h3 className="font-semibold text-sm mb-3">Permissions</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {permissions.map((perm) => (
                                            <FormCheckbox
                                                key={perm.id}
                                                label={perm.name}
                                                checked={roleForm.permission_ids.includes(perm.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setRoleForm({
                                                            ...roleForm,
                                                            permission_ids: [...roleForm.permission_ids, perm.id],
                                                        });
                                                    } else {
                                                        setRoleForm({
                                                            ...roleForm,
                                                            permission_ids: roleForm.permission_ids.filter(
                                                                (id) => id !== perm.id
                                                            ),
                                                        });
                                                    }
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-sidebar-border">
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        onClick={closeRoleForm}
                                    >
                                        Batal
                                    </Button>
                                    <Button type="submit">
                                        Simpan
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* USER DELETE CONFIRMATION TOAST */}
                {toastForUser && (
                    <div className="fixed bottom-4 right-4 bg-background border border-sidebar-border/70 rounded-lg p-4 shadow-lg flex items-center gap-4 z-40">
                        <span>{toastForUser}</span>
                        <button
                            className="text-red-600 font-semibold"
                            onClick={performDeleteUser}
                        >
                            Ya
                        </button>
                        <button
                            className="text-muted-foreground"
                            onClick={() => setToastForUser(null)}
                        >
                            Tidak
                        </button>
                    </div>
                )}

                {/* ROLE DELETE CONFIRMATION TOAST */}
                {toastForRole && (
                    <div className="fixed bottom-4 left-4 bg-background border border-sidebar-border/70 rounded-lg p-4 shadow-lg flex items-center gap-4 z-40">
                        <span>{toastForRole}</span>
                        <button
                            className="text-red-600 font-semibold"
                            onClick={performDeleteRole}
                        >
                            Ya
                        </button>
                        <button
                            className="text-muted-foreground"
                            onClick={() => setToastForRole(null)}
                        >
                            Tidak
                        </button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

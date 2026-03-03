import { Head, usePage } from '@inertiajs/react';
import { Plus, SquarePen, Trash2, Shield, Eye, User, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengguna & Role',
        href: '/users',
    },
];

interface Role {
    id: number;
    name: string;
}

interface UserData {
    id: number;
    name: string;
    email: string;
    phone?: string;
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

export default function UsersRoles() {
    const { users = [], roles = [], permissions = [] } = usePage<{
        users: UserData[];
        roles: RoleData[];
        permissions: Permission[];
    }>().props;

    const [activeTab, setActiveTab] = useState<'pengguna' | 'role'>('pengguna');
    const [search, setSearch] = useState('');
    const [simulatedRole, setSimulatedRole] = useState<RoleData | null>(null);

    const filteredUsers = users.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase())
    );

    const filteredRoles = roles.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
    );

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
                        {roles.slice(0, 5).map((role) => (
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
                    <Button size="lg" className="w-full sm:w-fit">
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
                                    <button>
                                        <SquarePen className="size-4 text-muted-foreground hover:text-primary transition-colors" />
                                    </button>
                                    <button>
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
                                    <button>
                                        <SquarePen className="size-4 text-muted-foreground hover:text-primary transition-colors" />
                                    </button>
                                    <button>
                                        <Trash2 className="size-4 text-muted-foreground hover:text-red-600 transition-colors" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

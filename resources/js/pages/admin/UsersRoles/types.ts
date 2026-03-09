export interface Permission {
    id: number
    name: string
}

export interface RoleData {
    id: number
    name: string
    description?: string
    permissions: Permission[]
    users_count: number
}

export interface UserData {
    id: number
    name: string
    username: string
    email: string
    phone?: string
    status_aktif?: boolean
    roles: RoleData[]
}

export interface UserForm {
    name: string
    username: string
    email: string
    password: string
    phone: string
    role_id: string
}

export interface RoleForm {
    name: string
    description: string
    permission_ids: number[]
}
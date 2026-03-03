<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone ?? null,
                'roles' => $user->roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                    ];
                })->toArray(),
            ];
        });

        $roles = Role::with('permissions')->get()->map(function ($role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
                'description' => $role->description ?? null,
                'permissions' => $role->permissions->map(function ($perm) {
                    return [
                        'id' => $perm->id,
                        'name' => $perm->name,
                    ];
                })->toArray(),
                'users_count' => $role->users()->count(),
            ];
        });

        // gather the master list of permissions so the frontend can render all
        // badges in the simulation panel, not just the ones granted to the
        // selected role.  this is what was missing previously.
        $allPermissions = \Spatie\Permission\Models\Permission::all()->map(function ($perm) {
            return [
                'id' => $perm->id,
                'name' => $perm->name,
            ];
        });

        // dd($users, $roles, $allPermissions);

        return Inertia::render('admin/UsersRoles', [
            'users' => $users,
            'roles' => $roles,
            'permissions' => $allPermissions,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/UsersRoles');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'phone' => 'nullable|string',
            'roles' => 'array',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'phone' => $validated['phone'] ?? null,
        ]);

        if (!empty($validated['roles'])) {
            $user->syncRoles($validated['roles']);
        }

        return Inertia::location(route('users.index'));
    }

    public function show(User $user)
    {
        return Inertia::render('admin/UsersRoles', [
            'user' => $user->load('roles'),
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('admin/UsersRoles', [
            'user' => $user->load('roles'),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone' => 'nullable|string',
            'roles' => 'array',
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
        ]);

        if (!empty($validated['roles'])) {
            $user->syncRoles($validated['roles']);
        }

        return Inertia::location(route('users.index'));
    }

    public function destroy(User $user)
    {
        $user->delete();
        return Inertia::location(route('users.index'));
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->orderBy('updated_at', 'desc')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'username' => $user->username,
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

        return Inertia::render('admin/UsersRoles/Index', [
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
            'username' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'nullable|string|min:8',
            'phone' => 'nullable|string',
            'role_id' => 'required|exists:roles,id',
        ]);

        // dd($validated, $request->all());
        $validated['password'] = $validated['password'] ?? 'password';

        $user = User::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'phone' => $validated['phone'] ?? null,
        ]); 

        if (!empty($validated['role_id'])) {
            $role = Role::findById($validated['role_id']);
            if ($role) {
                $user->syncRoles([]);
                $user->assignRole($role->name);
            }
        }

        return redirect()->route('master.users.index');
    }

    public function updatePassword(Request $request, User $user)
    {
        $validated = $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user->update([
            'password' => Hash::make($validated['password'])
        ]);

        return redirect()->route('master.users.index')
            ->with('success', 'Password berhasil diperbarui');
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
            'username' => 'required|string|max:255',
            'password' => 'nullable|string|min:8',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone' => 'nullable|string',
            'role_id' => 'required|exists:roles,id',
        ]);

        $data = [
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
        ];

        if (!empty($validated['password'])) {
            $data['password'] = bcrypt($validated['password']);
        }

        $user->update($data);

        if (!empty($validated['role_id'])) {
            $role = Role::findById($validated['role_id']);
            if ($role) {
                $user->syncRoles([]);
                $user->assignRole($role->name);
            }
        }

        return redirect()->route('master.users.index');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('master.users.index');
    }
}

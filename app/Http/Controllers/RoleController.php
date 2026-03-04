<?php

namespace App\Http\Controllers;

use Spatie\Permission\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::with('permissions')->orderBy('updated_at', 'desc')->get()->map(function ($role) {
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

        $permissions = Permission::all()->map(function ($perm) {
            return [
                'id' => $perm->id,
                'name' => $perm->name,
            ];
        });

        return Inertia::render('admin/UsersRoles', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/UsersRoles');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles',
            'description' => 'nullable|string',
            'permission_ids' => 'array',
        ]);

        // dd($validated, $request->all());

        $role = Role::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ]);

        if (!empty($validated['permission_ids'])) {
            $role->syncPermissions($validated['permission_ids']);
        }

        return redirect()->route('master.users.index');
    }

    public function show(Role $role)
    {
        return Inertia::render('admin/UsersRoles', [
            'role' => $role->load('permissions'),
        ]);
    }

    public function edit(Role $role)
    {
        return Inertia::render('admin/UsersRoles', [
            'role' => $role->load('permissions'),
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'description' => 'nullable|string',
            'permission_ids' => 'array',
        ]);

        // dd($validated, $request->all());

        $role->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ]);

        if (!empty($validated['permission_ids'])) {
            $role->syncPermissions($validated['permission_ids']);
        }

        return redirect()->route('master.users.index');
    }

    public function destroy(Role $role)
    {
        $role->delete();
        return redirect()->route('master.users.index');
    }
}

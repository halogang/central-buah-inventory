import { usePage } from '@inertiajs/react';

/**
 * shape of the properties that are shared with every Inertia page
 * we only care about the `auth.permissions` part right now.
 */
// We only care about the `auth.permissions` field, but the global
// `PageProps` that Inertia provides defines `auth` more strictly (and in
// some pages the property might be completely absent).  by making
// `permissions` optional here we ensure the `as SharedProps` cast is always
// safe and we can still default to an empty array later.
interface SharedProps {
    auth?: {
        permissions?: string[];
    };
}

/**
 * Return the array of permission strings for the current user.
 * Consumers should *never* reach into `usePage().props` directly.
 */
export function usePermissions(): string[] {
    // the cast no longer complains because `permissions` is optional
    const { auth } = usePage().props as SharedProps;
    return auth?.permissions ?? [];
}

/**
 * Helper that answers "can the current user perform X?".
 *
 * Usage:
 * ```tsx
 * const can = useCan();
 * if (can('Master Data')) { ... }
 * ```
 */
export function useCan() {
    const permissions = usePermissions();
    return (permission: string) => permissions.includes(permission);
}

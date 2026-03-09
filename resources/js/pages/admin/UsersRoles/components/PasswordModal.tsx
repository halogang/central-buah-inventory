import { router } from "@inertiajs/react"
import { X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { notify } from "@/lib/notify"
import type { UserData } from "../types"

interface Props {
    open: boolean
    onClose: () => void
    user: UserData | null
}

export default function PasswordModal({
    open,
    onClose,
    user
}: Props) {

    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [errors, setErrors] = useState<Record<string, string>>({})

    if (!open || !user) return null

    const submit = (e: React.FormEvent) => {

        e.preventDefault()

        router.put(`/master/users/${user.id}/password`, {
            password,
            password_confirmation: confirm
        }, {
            onSuccess: () => {
                notify.success(`password berhasil diperbarui`);
                onClose();
            },
            onError: (errors: Record<string, string>) => {
                notify.error(Object.values(errors).join('\n'));
            },
        })
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={onClose}
        >

            <div
                className="bg-background rounded-2xl w-full max-w-md shadow-lg animate-in zoom-in-95"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}

                <div className="flex items-center justify-between px-6 py-4 border-b border-sidebar-border">

                    <h2 className="text-lg font-semibold">
                        Ubah Password
                    </h2>

                    <X
                        className="size-5 cursor-pointer text-muted-foreground hover:text-foreground"
                        onClick={onClose}
                    />

                </div>

                {/* Form */}

                <form onSubmit={submit} className="p-6 space-y-4">

                    <div className="text-sm text-muted-foreground">
                        Password untuk <b>{user.name}</b>
                    </div>

                    {/* Password */}

                    <div>
                        <label className="text-sm font-medium">
                            Password Baru
                        </label>

                        <input
                            type="password"
                            className="mt-1 w-full rounded-lg border border-sidebar-border px-3 py-2 text-sm"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {errors.password && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm */}

                    <div>
                        <label className="text-sm font-medium">
                            Konfirmasi Password
                        </label>

                        <input
                            type="password"
                            className="mt-1 w-full rounded-lg border border-sidebar-border px-3 py-2 text-sm"
                            placeholder="********"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                    </div>

                    {/* Actions */}

                    <div className="flex justify-end gap-2 pt-4 border-t border-sidebar-border">

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                        >
                            Batal
                        </Button>

                        <Button type="submit">
                            Update Password
                        </Button>

                    </div>

                </form>

            </div>

        </div>
    )
}
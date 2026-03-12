import { toast } from "sonner"

type ConfirmOptions = {
    message: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
    onCancel: () => void
}

type ConfirmDeleteOptions = {
    message: string
    onConfirm: () => void
}

export const notify = {

    success(message: string) {
        toast.success(message)
    },

    error(message: string) {
        toast.error(message)
    },

    info(message: string) {
        toast(message)
    },

    loading(message: string) {
        return toast.loading(message)
    },

    dismiss(id?: string | number) {
        toast.dismiss(id)
    },

    confirm({ message, onConfirm, onCancel, confirmText = "Ya", cancelText = "Batal" }: ConfirmOptions) {
        toast(
            <div className="grid grid-cols-2 items-center justify-between">

                <span className="text-sm leading-relaxed flex-1">
                    {message}
                </span>

                <div className="flex items-end justify-end gap-2 shrink-0">

                    <button
                        onClick={() => {
                            toast.dismiss()
                            onConfirm()
                        }}
                        className="text-sm font-semibold text-primary"
                    >
                        {confirmText}
                    </button>

                    <button
                        onClick={() => {
                            toast.dismiss()
                            onCancel()
                        }}
                        className="text-sm text-muted-foreground hover:text-foreground"
                    >
                        {cancelText}
                    </button>

                </div>

            </div>
        )
    },

    confirmDelete({ message, onConfirm }: ConfirmDeleteOptions) {
        toast(
            <div className="flex items-center justify-between gap-4 w-full">
                <span>{message}</span>

                <div className="flex items-center gap-2">

                    <button
                        onClick={() => toast.dismiss()}
                        className="text-sm text-muted-foreground hover:text-foreground"
                    >
                        Batal
                    </button>

                    <button
                        onClick={() => {
                            toast.dismiss()
                            onConfirm()
                        }}
                        className="text-sm font-semibold text-destructive"
                    >
                        Hapus
                    </button>

                </div>
            </div>
        )
    }
}
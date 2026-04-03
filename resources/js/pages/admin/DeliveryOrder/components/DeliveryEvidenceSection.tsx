import { Camera, X } from "lucide-react"

export default function DeliveryEvidenceSection({ form, setForm }: any) {

    const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {

        const files = Array.from(e.target.files || [])

        setForm({
            ...form,
            evidence: {
                ...form.evidence,
                new: [...form.evidence.new, ...files]
            }
        })
    }

    const removeNewImage = (index: number) => {

        const updated = form.evidence.new.filter((_: any, i: number) => i !== index)

        setForm({
            ...form,
            evidence: {
                ...form.evidence,
                new: updated
            }
        })
    }

    const removeExistingImage = (path: string) => {

        setForm({
            ...form,
            evidence: {
                ...form.evidence,
                existing: form.evidence.existing.filter((e: string) => e !== path),
                deleted: [...form.evidence.deleted, path]
            }
        })
    }

    return (

        <div className="p-4 border rounded-lg flex flex-col gap-3">

            <div className="flex gap-2 items-center">
                <Camera className="size-5 text-primary"/>
                <span className="font-bold text-sm">Foto Barang</span>
            </div>

            {/* INPUT */}
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleAddImages}
                className="text-sm cursor-pointer"
            />

            <p className="text-xs text-muted-foreground">
                Bisa upload banyak gambar
            </p>

            {/* EXISTING IMAGES */}
            {Array.isArray(form.evidence.existing) && form.evidence.existing.length > 0 && (
                <div>
                    <p className="text-xs mb-2">Gambar lama</p>
                    <div className="grid grid-cols-3 gap-3">

                        {form.evidence.existing.map((src: string, index: number) => (
                            <div key={index} className="relative">

                                <img
                                    src={`${src}`}
                                    alt={`/${src}`}
                                    className="w-full h-24 object-cover rounded border"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeExistingImage(src)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                >
                                    <X className="w-3 h-3"/>
                                </button>

                            </div>
                        ))}

                    </div>
                </div>
            )}

            {/* NEW IMAGES */}
            {form.evidence.new.length > 0 && (
                <div>
                    <p className="text-xs mb-2">Gambar baru</p>
                    <div className="grid grid-cols-3 gap-3">

                        {form.evidence.new.map((file: File, index: number) => {
                            const preview = URL.createObjectURL(file)

                            return (
                                <div key={index} className="relative">

                                    <img
                                        src={preview}
                                        className="w-full h-24 object-cover rounded border"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => removeNewImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <X className="w-3 h-3"/>
                                    </button>

                                </div>
                            )
                        })}

                    </div>
                </div>
            )}

        </div>
    )
}
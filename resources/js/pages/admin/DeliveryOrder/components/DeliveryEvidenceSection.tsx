import { Camera } from "lucide-react"
import { FormImageUpload } from "@/components/admin"
import { useState } from "react";

export default function DeliveryEvidenceSection({ form, setForm }: any) {


    const [preview, setPreview] = useState<string | undefined>(
        form?.evidence ? form.evidence_url : undefined
    );

    return (

        <div className="p-4 border rounded-lg flex flex-col gap-2">

            <div className="flex gap-2 items-center mb-2">
                <Camera className="size-5 text-primary"/>
                <span className="font-bold text-sm">Foto Barang</span>
            </div>

            <FormImageUpload
                label="Gambar"
                title="Tap untuk foto/upload"
                icon="camera"
                subtitle=""
                preview={preview}
                // onChange={(file) => setForm({ ...form, evidence: file })}
                onChange={(file) => {
                    setForm({ ...form, evidence: file });

                    if (file) {
                        setPreview(URL.createObjectURL(file));
                    }
                }}
                hint="maksimal 2MB"
                required={form.status === 'done' ? true : false}
            />

        </div>

    )
}
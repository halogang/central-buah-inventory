import { router } from "@inertiajs/react"
import type { FormEvent} from "react";
import { useState } from "react"
import { FormInput, FormTextarea } from "@/components/admin"
import { Button } from "@/components/ui/button"
import AppLayout from "@/layouts/app-layout"
import { notify } from "@/lib/notify"
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Informasi Website',
        href: '/master/website-info',
    },
];

export default function WebsiteInfoIndex({ info }: any) {

    const [form, setForm] = useState({
        nama_usaha: info?.nama_usaha || '',
        alamat: info?.alamat || '',
        kontak: info?.kontak || '',
        email: info?.email || '',
        jam_operasional: info?.jam_operasional || '',
        link_maps: info?.link_maps || '',
    })

    const submit = (e: FormEvent) => {
        e.preventDefault()

        router.put(`/master/website-info/${info.id}`, form, {
            onSuccess: () => notify.success('Informasi berhasil diperbarui'),
            onError: () => notify.error('Gagal menyimpan data'),
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>

            <div className="max-w-3xl p-4">

                <h1 className="text-xl font-semibold mb-6">
                    Informasi Dasar Website
                </h1>

                <form onSubmit={submit} className="space-y-5">

                    <FormInput
                        label="Nama Usaha"
                        value={form.nama_usaha}
                        onChange={(e) =>
                            setForm({ ...form, nama_usaha: e.target.value })
                        }
                        required
                    />

                    <FormTextarea
                        label="Alamat"
                        value={form.alamat}
                        onChange={(e) =>
                            setForm({ ...form, alamat: e.target.value })
                        }
                        rows={3}
                        required
                    />

                    <FormInput
                        label="Kontak"
                        value={form.kontak}
                        onChange={(e) =>
                            setForm({ ...form, kontak: e.target.value })
                        }
                    />
                    <FormInput
                        label="Email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />

                    <FormInput
                        label="Jam Operasional"
                        value={form.jam_operasional}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                jam_operasional: e.target.value
                            })
                        }
                        placeholder="08:00 - 17:00"
                    />

                    <FormInput
                        label="Link Google Maps"
                        value={form.link_maps}
                        onChange={(e) =>
                            setForm({ ...form, link_maps: e.target.value })
                        }
                        placeholder="https://maps.google.com/..."
                    />

                    <div className="flex justify-end pt-4">
                        <Button type="submit" className="cursor-pointer">
                            Simpan Perubahan
                        </Button>
                    </div>

                </form>

            </div>

        </AppLayout>
    )
}
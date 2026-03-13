import { router } from "@inertiajs/react"
import type { FormEvent } from "react"
import { useState } from "react"
import { FormInput, FormTextarea } from "@/components/admin"
import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import AppLayout from "@/layouts/app-layout"
import { notify } from "@/lib/notify"
import type { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Informasi Website',
        href: '/master/website-info',
    },
]

export default function WebsiteInfoIndex({ info }: any) {

    const [is24Hours, setIs24Hours] = useState(
        info?.jam_operasional === '24 jam'
    )

    const [openTime, setOpenTime] = useState(
        info?.jam_operasional && info.jam_operasional !== '24 jam'
            ? info.jam_operasional.split(' - ')[0]
            : '08:00'
    )

    const [closeTime, setCloseTime] = useState(
        info?.jam_operasional && info.jam_operasional !== '24 jam'
            ? info.jam_operasional.split(' - ')[1]
            : '17:00'
    )

    const [form, setForm] = useState({
        nama_usaha: info?.nama_usaha || '',
        alamat: info?.alamat || '',
        kontak: info?.kontak || '',
        email: info?.email || '',
        jam_operasional: info?.jam_operasional || '',
        link_maps: info?.link_maps || '',
    })

    const jamPreview = is24Hours
        ? '24 Jam'
        : `${openTime} - ${closeTime}`

    const submit = (e: FormEvent) => {
        e.preventDefault()

        router.put(`/master/website-info/${info.id}`, {
            ...form,
            jam_operasional: jamPreview
        }, {
            onSuccess: () => notify.success('Informasi berhasil diperbarui'),
            onError: () => notify.error('Gagal menyimpan data'),
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>

            <div className="p-6 max-w-3xl space-y-6">

                <Heading
                    title="Informasi Website"
                    description="Kelola informasi usaha yang tampil di halaman website"
                />

                <form onSubmit={submit} className="space-y-6">

                    {/* INFORMASI USAHA */}
                    <div className="rounded-xl border bg-card p-6 shadow-sm space-y-5">

                        <div>
                            <h3 className="font-semibold text-lg">
                                Informasi Usaha
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Informasi dasar yang tampil di website
                            </p>
                        </div>

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
                            label="Link Google Maps"
                            value={form.link_maps}
                            onChange={(e) =>
                                setForm({ ...form, link_maps: e.target.value })
                            }
                            placeholder="https://maps.google.com/..."
                            hint="Ambil dari Google Maps: Share → Embed a map → salin URL pada src iframe."
                        />

                    </div>


                    {/* JAM OPERASIONAL */}
                    <div className="rounded-xl border bg-card p-6 shadow-sm space-y-5">

                        <div>
                            <h3 className="font-semibold text-lg">
                                Jam Operasional
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Tentukan jam buka toko Anda
                            </p>
                        </div>

                        {/* toggle */}
                        <div className="flex items-center justify-between border rounded-lg p-4">

                            <div>
                                <p className="font-medium">
                                    Buka 24 Jam
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    Aktifkan jika toko buka sepanjang hari
                                </p>
                            </div>

                            <Switch
                                checked={is24Hours}
                                onCheckedChange={setIs24Hours}
                            />

                        </div>


                        {!is24Hours && (

                            <div className="grid grid-cols-2 gap-4">

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Jam Buka
                                    </label>

                                    <Input
                                        type="time"
                                        value={openTime}
                                        onChange={(e) =>
                                            setOpenTime(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Jam Tutup
                                    </label>

                                    <Input
                                        type="time"
                                        value={closeTime}
                                        onChange={(e) =>
                                            setCloseTime(e.target.value)
                                        }
                                    />
                                </div>

                            </div>

                        )}


                        {/* preview */}
                        <div className="rounded-lg bg-muted/50 p-4">

                            <p className="text-sm text-muted-foreground">
                                Preview Jam Operasional
                            </p>

                            <p className="text-lg font-semibold">
                                {jamPreview}
                            </p>

                        </div>

                    </div>


                    {/* submit */}
                    <div className="flex justify-end">

                        <Button
                            type="submit"
                            className="cursor-pointer px-6"
                        >
                            Simpan Perubahan
                        </Button>

                    </div>

                </form>

            </div>

        </AppLayout>
    )
}
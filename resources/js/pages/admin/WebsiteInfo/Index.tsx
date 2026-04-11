import { Head, router } from "@inertiajs/react"
import type { FormEvent } from "react"
import { useState } from "react"
import { FormImageUpload, FormInput, FormTextarea } from "@/components/admin"
import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import AppLayout from "@/layouts/app-layout"
import { notify } from "@/lib/notify"
import type { BreadcrumbItem } from '@/types'
import { useCan } from "@/utils/permissions"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Informasi Website',
        href: '/master/website-info',
    },
]

export default function WebsiteInfoIndex({ info }: any) {

    const can = useCan();

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

    const emptyForm = {
        nama_usaha: '',
        alamat: '',
        kontak: '',
        email: '',
        jam_operasional: '',
        link_maps: '',
        hero_image: null as File | null,
        about_image: null as File | null,
        hero_image_url: null as File | null,
        about_image_url: null as File | null,
        about_content: '',
    }

    const [form, setForm] = useState(
        info ? {
            nama_usaha: info.nama_usaha,
            alamat: info.alamat,
            kontak: info.kontak,
            email: info.email,
            jam_operasional: info.jam_operasional,
            link_maps: info.link_maps,
            hero_image: null,
            about_image: null,
            hero_image_url: info.hero_image_url,
            about_image_url: info.about_image_url,
            about_content: info.about_content,
        } : emptyForm
    )

    const jamPreview = is24Hours
        ? '24 Jam'
        : `${openTime} - ${closeTime}`

    const submit = (e: FormEvent) => {
        e.preventDefault()

        const payload: any = {
            ...form,
            _method: 'put',
            jam_operasional: jamPreview
        }

        // ❗ hapus kalau bukan File
        if (!(form.hero_image instanceof File)) {
            delete payload.hero_image
        }

        if (!(form.about_image instanceof File)) {
            delete payload.about_image
        }

        router.post(`/master/website-info/${info.id}`, payload, {
            forceFormData: true,
            onSuccess: () => notify.success('Informasi berhasil diperbarui'),
            onError: (errors) => {
                    notify.error(Object.values(errors).join("\n"))
                }
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Informasi Website" >
                <meta name="robots" content="noindex" />
            </Head>

            <div className="p-6 space-y-6">

                <Heading
                    title="Informasi Website"
                    description="Kelola informasi usaha yang tampil di halaman website"
                />

                <form onSubmit={submit} className="space-y-6">

                    <div className="grid grid-cols-2 gap-4">
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

                        {/* CMS */}
                        <div className="rounded-xl border bg-card p-6 shadow-sm space-y-5">

                            <div>
                                <h3 className="font-semibold text-lg">
                                    Konten Landing Page
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Kelola konten website anda
                                </p>
                            </div>

                            <FormImageUpload 
                                label="Gambar Hero Section"
                                preview={
                                    form.hero_image instanceof File
                                        ? URL.createObjectURL(form.hero_image)
                                        : form.hero_image_url
                                }
                                onChange={(file) => setForm({ ...form, hero_image: file })}
                                hint="maksimal 15MB"
                            />

                            <FormImageUpload 
                                label={`Gambar Tentang ${form.nama_usaha ?? 'Usaha Anda'}`}
                                preview={
                                    form.about_image instanceof File
                                        ? URL.createObjectURL(form.about_image)
                                        : form.about_image_url
                                }
                                onChange={(file) => setForm({ ...form, about_image: file })}
                                hint="maksimal 15MB"
                            />

                            
                            <FormTextarea
                                label={`Deskripsi Tentang ${form.nama_usaha ?? 'Usaha Anda'}`}
                                value={form.about_content}
                                onChange={(e) =>
                                    setForm({ ...form, about_content: e.target.value })
                                }
                                rows={4}
                                required
                            />

                        </div>
                    </div>

                    {/* submit */}
                    {can('info_website.update') && (
                        <div className="flex justify-start">

                            <Button
                                type="submit"
                                className="cursor-pointer px-6"
                            >
                                Simpan Perubahan
                            </Button>

                        </div>
                    )}

                </form>

            </div>

        </AppLayout>
    )
}
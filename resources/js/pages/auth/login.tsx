import { Form, Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Citrus, Warehouse, TrendingUp, Truck, User, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
}: Props) {
    const { websiteInfo } = usePage().props as any;
    const [showPassword, setShowPassword] = useState(false);
    return (
        <>
            <Head title="Login">
                <meta name="robots" content="noindex"/>
            </Head>

            <div className="flex min-h-screen">
                
                {/* BRAND PANEL */}
                <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between overflow-hidden bg-linear-to-br from-primary via-primary/90 to-secondary p-12">

                    {/* background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-10 w-32 h-32 rounded-full border-2 border-primary-foreground" />
                        <div className="absolute top-40 right-20 w-48 h-48 rounded-full border-2 border-primary-foreground" />
                        <div className="absolute bottom-32 left-1/4 w-24 h-24 rounded-full border-2 border-primary-foreground" />
                        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full border border-primary-foreground" />
                    </div>

                    {/* floating icons */}
                    <div className="absolute top-1/4 right-16 opacity-20">
                        <Citrus className="w-16 h-16 text-primary-foreground" />
                    </div>
                    <div className="absolute top-1/2 left-16 opacity-15">
                        <Warehouse className="w-12 h-12 text-primary-foreground" />
                    </div>
                    <div className="absolute bottom-1/3 right-1/4 opacity-15">
                        <Truck className="w-14 h-14 text-primary-foreground" />
                    </div>

                    {/* logo */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                                <AppLogoIcon />/
                            </div>

                            <span className="text-2xl font-bold text-primary-foreground tracking-tight">
                                {websiteInfo?.nama_usaha}
                            </span>
                        </div>
                    </div>

                    {/* headline */}
                    <div className="relative z-10 space-y-8">
                        <div>
                            <h1 className="text-4xl xl:text-5xl font-extrabold text-primary-foreground leading-tight">
                                Sistem Cerdas <br />
                                Manajemen Stok <br />
                                dan Distribusi <br />
                                Buah
                            </h1>

                            <p className="mt-4 text-primary-foreground/70 text-lg max-w-sm">
                                Kelola stok, penjualan, dan distribusi buah dengan lebih mudah melalui sistem yang terintegrasi dan analisis data real-time.
                            </p>
                        </div>

                        {/* features */}
                        <div className="flex flex-wrap gap-3">
                            {[
                                { icon: Warehouse, label: "Inventory" },
                                { icon: TrendingUp, label: "Sales Analytics" },
                                { icon: Truck, label: "Distribution" },
                            ].map(({ icon: Icon, label }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20"
                                >
                                    <Icon className="w-4 h-4 text-primary-foreground/80" />
                                    <span className="text-sm font-medium text-primary-foreground/80">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="relative z-10 text-primary-foreground/40 text-sm">
                    </p>
                </div>


                {/* FORM PANEL */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-background">

                    <div className="w-full max-w-md">

                        {/* mobile logo */}
                        <div className="lg:hidden flex items-center gap-3 mb-10">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                                <AppLogoIcon />
                            </div>

                            <span className="text-xl font-bold">
                                {websiteInfo.nama_usaha}
                            </span>
                        </div>

                        <div className="rounded-2xl border bg-card p-8 shadow-xl shadow-primary/5">

                            <div className="mb-8">
                                <h2 className="text-2xl font-bold">
                                    Selamat Datang Kembali
                                </h2>

                                <p className="text-muted-foreground text-sm mt-1">
                                    Masuk untuk mengelola inventori buah Anda
                                </p>
                            </div>

                            <Form
                                {...store.form()}
                                resetOnSuccess={['password']}
                                className="space-y-5"
                            >
                                {({ processing, errors }) => (
                                    <>

                                        {/* USERNAME */}
                                        <div className="space-y-2">
                                            <Label htmlFor="username">Username</Label>

                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                                                <Input
                                                    id="username"
                                                    type="text"
                                                    name="username"
                                                    placeholder="admin / owner"
                                                    autoComplete="username"
                                                    autoFocus
                                                    className="pl-10 h-11"
                                                />
                                            </div>

                                            <InputError message={errors.username} />
                                        </div>

                                        {/* PASSWORD */}
                                        <div className="space-y-2">

                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="password">
                                                    Password
                                                </Label>

                                                {canResetPassword && (
                                                    <TextLink
                                                        href={request()}
                                                        className="text-xs"
                                                    >
                                                        Lupa password?
                                                    </TextLink>
                                                )}
                                            </div>

                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                                                <Input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    placeholder="Password"
                                                    autoComplete="current-password"
                                                    className="pl-10 h-11"
                                                />

                                                <button 
                                                    type='button'
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer hover:text-foreground'>
                                                    {showPassword ? (
                                                        <EyeOff className='w-4 h-4' />
                                                    ) : (
                                                        <Eye className='w-4 h-4' /> 
                                                    )}
                                                </button>
                                            </div>

                                            <InputError message={errors.password} />
                                        </div>

                                        {/* REMEMBER */}
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                            />

                                            <Label htmlFor="remember">
                                                Ingat saya
                                            </Label>
                                        </div>

                                        {/* BUTTON */}
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full h-11 font-semibold shadow-lg shadow-primary/25"
                                        >
                                            {processing && <Spinner />}
                                            Log in
                                        </Button>
                                    </>
                                )}
                            </Form>
                        </div>

                        {/* FOOTER */}
                        <p className="mt-8 text-center text-xs text-muted-foreground/60">
                            © 2026 {websiteInfo?.nama_usaha}. All rights reserved.
                        </p>

                        {status && (
                            <div className="mt-4 text-center text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </>
    );
}
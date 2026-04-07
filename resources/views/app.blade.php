<!DOCTYPE html>
<html
    lang="{{ str_replace('_', '-', app()->getLocale()) }}"
    @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function () {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window
                        .matchMedia('(prefers-color-scheme: dark)')
                        .matches;

                    if (prefersDark) {
                        document
                            .documentElement
                            .classList
                            .add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia="inertia">Central Buah Sutomo - Toko Buah Terdekat di Cilacap</title>
        <meta
            name="description"
            content="Cari toko, kios, agen buah segar berkualitas di Cilacap? Central Buah Sutomo: 100% segar, garansi kualitas, buah pilihan. BISA PESAN ONLINE."/>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link
            href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
            rel="stylesheet"/>

        @viteReactRefresh @vite(['resources/js/app.tsx',
        "resources/js/pages/{$page['component']}.tsx"]) @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
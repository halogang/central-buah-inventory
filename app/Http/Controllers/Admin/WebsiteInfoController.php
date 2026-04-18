<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WebsiteInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class WebsiteInfoController extends Controller
{
    public function index()
    {
        $info = WebsiteInfo::first();

        if (!$info) {
            $info = WebsiteInfo::firstOrCreate(
                ['id' => 1],
                [
                    'nama_usaha' => 'Nama Usaha',
                    'alamat' => 'Jl. Radjiman',
                    'kontak' => '08123456789',
                    'email' => 'centralbuah@gmail.com',
                    'jam_operasional' => '08:00 - 17:00',
                    'link_maps' => null,
                ]
            );
        }

        return Inertia::render('admin/WebsiteInfo/Index', [
            'info' => $info
        ]);
    }

    public function update(Request $request, WebsiteInfo $websiteInfo)
    {
        $data = $request->validate([
            'nama_usaha' => 'required|string',
            'alamat' => 'required|string',
            'kontak' => 'required|string',
            'email' => 'nullable|email',
            'jam_operasional' => 'required|string',
            'link_maps' => 'nullable|url',
            'hero_image' => 'nullable|image',
            'about_image' => 'nullable|image',
            'about_content' => 'nullable|string',

            // 🔥 flag delete
            'remove_hero_image' => 'nullable|boolean',
            'remove_about_image' => 'nullable|boolean',
        ]);

        $uploadPath = '../../public_html/images/website';
        $savePath = '/images/website';
        $destination = public_path($uploadPath);

        // helper upload (biar ga duplikat)
        $processImage = function ($file, $oldPath = null) use ($destination, $savePath) {

            // hapus lama
            if ($oldPath) {
                $fullOld = public_path($oldPath);
                if (File::exists($fullOld)) {
                    File::delete($fullOld);
                }
            }

            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $baseName = Str::slug($originalName);
            $fileName = $baseName . '.webp';
            $fullPath = $destination . '/' . $fileName;

            $counter = 1;
            while (File::exists($fullPath)) {
                $fileName = $baseName . " ($counter).webp";
                $fullPath = $destination . '/' . $fileName;
                $counter++;
            }

            if (!File::exists($destination)) {
                File::makeDirectory($destination, 0755, true);
            }

            $manager = new ImageManager(new Driver());
            $img = $manager->read($file->getRealPath());

            $img->scale(width: 1200);
            $img->toWebp(80)->save($fullPath);

            return $savePath . '/' . $fileName;
        };

        // =========================
        // ❌ DELETE HERO
        // =========================
        if ($request->boolean('remove_hero_image')) {
            if ($websiteInfo->hero_image) {
                $old = public_path($websiteInfo->hero_image);
                if (File::exists($old)) {
                    File::delete($old);
                }
            }

            $data['hero_image'] = null;
        }

        // =========================
        // ❌ DELETE ABOUT
        // =========================
        if ($request->boolean('remove_about_image')) {
            if ($websiteInfo->about_image) {
                $old = public_path($websiteInfo->about_image);
                if (File::exists($old)) {
                    File::delete($old);
                }
            }

            $data['about_image'] = null;
        }

        // =========================
        // 📤 UPLOAD HERO
        // =========================
        if ($request->hasFile('hero_image') && !$request->boolean('remove_hero_image')) {
            $data['hero_image'] = $processImage(
                $request->file('hero_image'),
                $websiteInfo->hero_image
            );
        }

        // =========================
        // 📤 UPLOAD ABOUT
        // =========================
        if ($request->hasFile('about_image') && !$request->boolean('remove_about_image')) {
            $data['about_image'] = $processImage(
                $request->file('about_image'),
                $websiteInfo->about_image
            );
        }

        $websiteInfo->update($data);

        return back()->with('success', 'Settings berhasil diperbarui');
    }
}
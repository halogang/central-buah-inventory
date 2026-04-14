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
            // 'npwp' => 'nullable|string',
            'jam_operasional' => 'required|string',
            'link_maps' => 'nullable|url',
            'hero_image' => 'nullable|image',
            'about_content' => 'nullable|string',
            'about_image' => 'nullable|image',
            // 'facebook' => 'nullable|url',
            // 'instagram' => 'nullable|url',
            // 'whatsapp' => 'nullable|string',
            // 'footer_copyright' => 'nullable|string',
        ]);

        $uploadPath = '../../public_html/images/website';
        $savePath = '/images/website';

        $destination = public_path($uploadPath);

        if ($request->hasFile('hero_image')) {
            if ($websiteInfo->hero_image) {
                $oldHeroImage = public_path($websiteInfo->hero_image);

                if (File::exists($oldHeroImage)) {
                    File::delete($oldHeroImage);
                }
            }

            $image = $request->file('hero_image');

            // ambil nama asli tanpa ekstensi
            $originalName = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);

            // format nama: lowercase + spasi jadi -
            $baseName = Str::slug($originalName);

            // default nama file
            $fileName = $baseName . '.webp';

            $fullPath = $destination . '/' . $fileName;

            // 🔁 handle jika file sudah ada
            $counter = 1;
            while (File::exists($fullPath)) {
                $fileName = $baseName . " ($counter).webp";
                $fullPath = $destination . '/' . $fileName;
                $counter++;
            }

            // pastikan folder ada
            if (!File::exists($destination)) {
                File::makeDirectory($destination, 0755, true);
            }

            // proses image
            $manager = new ImageManager(new Driver());
            $img = $manager->read($image->getRealPath());

            $img->scale(width: 1200);
            $img->toWebp(80)->save($fullPath);

            // simpan path
            $data['hero_image'] = $savePath . '/' . $fileName;
        }

        if ($request->hasFile('about_image')) {
            if ($websiteInfo->about_image) {
                $oldAboutImage = public_path($websiteInfo->about_image);

                if (File::exists($oldAboutImage)) {
                    File::delete($oldAboutImage);
                }
            }

            $image = $request->file('about_image');

            // ambil nama asli tanpa ekstensi
            $originalName = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);

            // format nama: lowercase + spasi jadi -
            $baseName = Str::slug($originalName);

            // default nama file
            $fileName = $baseName . '.webp';

            $fullPath = $destination . '/' . $fileName;

            // 🔁 handle jika file sudah ada
            $counter = 1;
            while (File::exists($fullPath)) {
                $fileName = $baseName . " ($counter).webp";
                $fullPath = $destination . '/' . $fileName;
                $counter++;
            }

            // pastikan folder ada
            if (!File::exists($destination)) {
                File::makeDirectory($destination, 0755, true);
            }

            // proses image
            $manager = new ImageManager(new Driver());
            $img = $manager->read($image->getRealPath());

            $img->scale(width: 1200);
            $img->toWebp(80)->save($fullPath);

            // simpan path
            $data['about_image'] = $savePath . '/' . $fileName;
        }


        function generateFileName($file, $prefix = '')
        {
            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeName = Str::slug($originalName);

            return ($prefix ? $prefix . '-' : '') . $safeName . '-' . time() . '.webp';
        }

        $websiteInfo->update($data);

        return back()->with('success', 'Settings berhasil diperbarui');
    }
}
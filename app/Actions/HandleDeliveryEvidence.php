<?php

namespace App\Actions;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class HandleDeliveryEvidence
{
    protected string $uploadPath = '../../public_html/images/delivery-orders';
    protected string $savePath = 'images/delivery_orders';

    public function handle($request, $existingFromDB = [])
    {
        /**
         * 🔥 1. INIT
         */
        $destination = public_path($this->uploadPath);

        if (!File::exists($destination)) {
            File::makeDirectory($destination, 0755, true);
        }

        $manager = new ImageManager(new Driver());

        /**
         * 🔥 2. AMBIL DATA DARI REQUEST
         */
        $existing = $request->input('existing_evidence', []);
        $deleted = $request->input('deleted_evidence', []);
        $newFiles = $request->file('evidence', []);

        /**
         * 🔥 3. DELETE FILE YANG DIHAPUS USER
         * digunakan saat UPDATE
         */
        foreach ($deleted as $path) {
            $fullPath = public_path($path);

            if (File::exists($fullPath)) {
                File::delete($fullPath);
            }
        }

        /**
         * 🔥 4. UPLOAD FILE BARU
         */
        $newPaths = [];

        if ($newFiles) {
            foreach ($newFiles as $file) {

                $fileName = Str::uuid() . '.webp';

                $img = $manager->read($file->getRealPath());
                $img->scale(width: 1200);
                $img->toWebp(80)->save($destination . '/' . $fileName);

                $newPaths[] = $this->savePath . '/' . $fileName;
            }
        }

        /**
         * 🔥 5. FINAL MERGE
         * existing (yang tidak dihapus) + new upload
         */
        return array_values(array_merge($existing, $newPaths));
    }
}
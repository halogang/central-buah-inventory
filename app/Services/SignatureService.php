<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class SignatureService
{
    private $uploadPath = '../../public_html/images/signatures';
    private $savePath = '/images/signatures';

    public function saveBase64($base64, $oldPath = null)
    {
        if (!$base64 || !str_contains($base64, 'base64')) {
            return $oldPath;
        }

        // delete signature lama
        if ($oldPath) {
            $oldFile = public_path($oldPath);
            if (File::exists($oldFile)) {
                File::delete($oldFile);
            }
        }

        $image = preg_replace('/^data:image\/\w+;base64,/', '', $base64);
        $image = str_replace(' ', '+', $image);

        $fileName = 'signature_' . Str::uuid() . '.webp';

        $destination = public_path($this->uploadPath);

        if (!File::exists($destination)) {
            File::makeDirectory($destination, 0755, true);
        }

        $imageData = base64_decode($image);

        $manager = new ImageManager(new Driver());

        $img = $manager->read($imageData);

        /*
        =========================
        Resize signature
        =========================
        */

        $img->scale(width: 600);

        /*
        =========================
        Compress WebP
        =========================
        */

        $img->toWebp(80)->save($destination.'/'.$fileName);

        return $this->savePath.'/'.$fileName;
    }
}
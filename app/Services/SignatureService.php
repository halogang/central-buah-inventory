<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;

class SignatureService
{
    // Laravel public storage
    private $localPath = 'images/signatures';

    // public_html (server production)
    private $serverPath = '../../public_html/images/signatures';

    public function saveBase64($base64, $oldPath = null)
    {
        if (!$base64 || !str_contains($base64, 'base64')) {
            return $oldPath;
        }

        if ($oldPath) {
            $this->deleteOld($oldPath);
        }

        $image = preg_replace('/^data:image\/\w+;base64,/', '', $base64);
        $image = str_replace(' ', '+', $image);

        $fileName = 'signature_' . Str::uuid() . '.png';

        $imageData = base64_decode($image);

        $img = Image::read($imageData)->scale(width: 600);

        // =========================
        // PATHS (FIXED)
        // =========================
        $localDir = public_path('images/signatures');
        $serverDir = base_path('../public_html/images/signatures');

        $this->ensureDirectory($localDir);
        $this->ensureDirectory($serverDir);

        // IMPORTANT: clone image
        $imgLocal = clone $img;
        $imgServer = clone $img;

        // save local (Laravel public)
        $imgLocal->save($localDir . '/' . $fileName, 100);

        // save public_html
        $imgServer->save($serverDir . '/' . $fileName, 100);

        return 'images/signatures/' . $fileName;
    }

    private function deleteOld($oldPath)
    {
        $local = storage_path('app/public/' . $oldPath);
        $server = public_path($this->serverPath . '/' . basename($oldPath));

        if (File::exists($local)) File::delete($local);
        if (File::exists($server)) File::delete($server);
    }

    private function ensureDirectory($path)
    {
        if (!File::exists($path)) {
            File::makeDirectory($path, 0755, true);
        }
    }
}
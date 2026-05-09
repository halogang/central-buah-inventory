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

        // delete old file (both locations)
        if ($oldPath) {
            $this->deleteOld($oldPath);
        }

        $image = preg_replace('/^data:image\/\w+;base64,/', '', $base64);
        $image = str_replace(' ', '+', $image);

        $fileName = 'signature_' . Str::uuid() . '.png';

        $imageData = base64_decode($image);

        $img = Image::read($imageData);

        // resize
        $img->scale(width: 600);

        // ensure directories exist
        $this->ensureDirectory(storage_path('app/public/' . $this->localPath));
        $this->ensureDirectory(public_path($this->serverPath));

        // save to Laravel public (storage/app/public equivalent)
        $localFullPath = storage_path('app/public/' . $this->localPath . '/' . $fileName);
        $img->save($localFullPath, 100);

        // save to public_html
        $serverFullPath = public_path($this->serverPath . '/' . $fileName);
        $img->save($serverFullPath, 100);

        return $this->localPath . '/' . $fileName;
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
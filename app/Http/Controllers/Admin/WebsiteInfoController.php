<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WebsiteInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
            // 'facebook' => 'nullable|url',
            // 'instagram' => 'nullable|url',
            // 'whatsapp' => 'nullable|string',
            // 'footer_copyright' => 'nullable|string',
        ]);

        // if ($request->hasFile('logo')) {
        //     $data['logo'] = $request->file('logo')->store('settings', 'public');
        // }

        // if ($request->hasFile('favicon')) {
        //     $data['favicon'] = $request->file('favicon')->store('settings', 'public');
        // }

        $websiteInfo->update($data);

        return back()->with('success', 'Settings berhasil diperbarui');
    }
}
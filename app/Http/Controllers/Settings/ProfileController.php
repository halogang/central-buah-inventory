<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileDeleteRequest;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\File;

class ProfileController extends Controller
{

    private $signatureUploadPath = '../../public_html/images/signatures';
    private $signatureSavePath = '/images/signatures';
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $data = $request->validated();
        // dd($data, str_contains($data['signature'], 'base64'));

        // jika ada signature base64
        if (!empty($data['signature']) && str_contains($data['signature'], 'base64')) {

            if ($request->user()->signature) {
                $old = public_path($request->user()->signature);
                if (File::exists($old)) {
                    File::delete($old);
                }
            }

            $data['signature'] = $this->saveSignature($data['signature']);
        }

        $request->user()->fill($data);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return to_route('profile.edit');
    }

    private function saveSignature($base64)
    {
        if (!$base64) return null;

        $image = str_replace('data:image/png;base64,', '', $base64);
        $image = str_replace(' ', '+', $image);

        $fileName = 'signature_' . uniqid() . '.png';

        $destination = public_path($this->signatureUploadPath);

        if (!File::exists($destination)) {
            File::makeDirectory($destination, 0755, true);
        }

        File::put(
            $destination.'/'.$fileName,
            base64_decode($image)
        );

        return $this->signatureSavePath.'/'.$fileName;
    }

    /**
     * Delete the user's profile.
     */
    public function destroy(ProfileDeleteRequest $request): RedirectResponse
    {
        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}

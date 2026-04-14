<?php

namespace App\Actions;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class PrepareDeliveryOrderData
{
    public function handle(array $validated)
    {
        $user = Auth::user();

        if ($validated['type'] === 'in') {
            return [
                ...$validated,
                'receiver_name' => $user->name,
                'receiver_signature' => $user->signature ?? null,
            ];
        }

        $sender = User::find($validated['sender_id']);

        return [
            ...$validated,
            'sender_name' => $sender?->name ?? $user->name,
            'sender_signature' => $sender?->signature ?? $user->signature,
        ];
    }
}
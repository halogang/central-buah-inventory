<?php

namespace App\Actions;

class HandleDeliverySignature
{
    public function handle($signatureService, $new, $old = null)
    {
        return $signatureService->saveBase64($new, $old);
    }
}
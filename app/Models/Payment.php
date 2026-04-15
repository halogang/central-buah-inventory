<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'invoice_id',
        'payment_method_id',
        'amount',
        'note',
        'evidence',
        'date'
    ];

    protected $appends = ['evidence_url'];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function getEvidenceUrlAttribute()
    {
        return $this->evidence
            ? asset($this->evidence)
            : null;
    }
}

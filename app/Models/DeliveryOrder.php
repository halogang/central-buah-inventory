<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DeliveryOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'do_number',
        'type',
        'supplier_id',
        'customer_id',
        'linked_delivery_order_id',
        'sender_name',
        'receiver_name',
        'evidence',
        'status',
        'sender_signature',
        'receiver_signature',
        'cart_id',
        'cart_weight',
        'cart_qty',
        'total_amount',
        'total_weight',
        'note'
    ];

    protected $casts = [
        'date' => 'date',
        'evidence' => 'array',
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function invoice()
    {
        return $this->hasOne(Invoice::class);
    }

    public function items()
    {
        return $this->hasMany(DeliveryOrderItem::class);
    }

    public function scopeIn($query)
    {
        return $query->where('type', 'in');
    }

    public function scopeOut($query)
    {
        return $query->where('type', 'out');
    }

    public function getSenderSignatureUrlAttribute()
    {
        return $this->sender_signature
            ? asset($this->sender_signature)
            : null;
    }

    public function getReceiverSignatureUrlAttribute()
    {
        return $this->receiver_signature
            ? asset($this->receiver_signature)
            : null;
    }
}
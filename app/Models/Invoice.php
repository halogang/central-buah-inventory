<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'delivery_order_id',
        'invoice_number',
        'date',
        'customer_id',
        'supplier_id',
        'type',
        'total',
        'loading_cost',
        'paid',
        'remaining',
        'status',
        'signer_name',
        'signature'
    ];

    protected $casts = [
        'date' => 'date',
        'total' => 'decimal:2',
        'loading_cost' => 'decimal:2',
        'paid' => 'decimal:2',
        'remaining' => 'decimal:2',
    ];

    public function deliveryOrder()
    {
        return $this->belongsTo(DeliveryOrder::class);
    }

    public function items()
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
}

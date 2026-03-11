<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Item;

class Warehouse extends Model
{
    protected $fillable = [
        'name',
        'address',
        'user_id',
        'status',
    ];

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function stockOpnames()
    {
        return $this->hasMany(OpnameStock::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

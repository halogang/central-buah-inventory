<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    use HasFactory;

    protected $fillable = [
        'unit_code',
        'description'
    ];

    public function cart()
    {
        return $this->hasMany(Cart::class);
    }

    public function items()
    {
        return $this->hasMany(Item::class);
    }
}

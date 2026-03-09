<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'unit_id',
        'weight',
    ];  

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }
}

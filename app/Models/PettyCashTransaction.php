<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PettyCashTransaction extends Model
{
    protected $fillable = [
        'date',
        'type',
        'amount',
        'evidence',
        'expense_category',
        'description',
        'created_by',
    ];
}

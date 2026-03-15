<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PettyCashTransaction extends Model
{
    protected $fillable = [
        'date',
        'type',
        'amount',
        'expense_category_id',
        'description',
        'created_by'
    ];

    public function category()
    {
        return $this->belongsTo(ExpenseCategory::class, 'expense_category_id');
    }
}

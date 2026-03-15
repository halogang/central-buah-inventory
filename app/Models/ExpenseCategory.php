<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExpenseCategory extends Model
{
    protected $fillable = ['name','status'];

    public function transactions()
    {
        return $this->hasMany(PettyCashTransaction::class);
    }
}

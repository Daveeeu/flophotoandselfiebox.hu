<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactInquiry extends Model
{
    use HasFactory;

    public const STATUSES = [
        'new' => 'Új',
        'in_progress' => 'Folyamatban',
        'closed' => 'Lezárt',
    ];

    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'status',
    ];

    public function scopeLatestFirst(Builder $query): Builder
    {
        return $query->latest();
    }
}

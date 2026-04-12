<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingRequest extends Model
{
    use HasFactory;

    public const STATUSES = [
        'new' => 'Új',
        'confirmed' => 'Visszaigazolt',
        'completed' => 'Teljesítve',
        'cancelled' => 'Lemondva',
    ];

    protected $fillable = [
        'name',
        'email',
        'phone',
        'event_type',
        'event_date',
        'event_time',
        'event_location',
        'guest_count',
        'package_name',
        'notes',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'event_date' => 'date',
        ];
    }

    public function scopeLatestFirst(Builder $query): Builder
    {
        return $query->latest();
    }
}

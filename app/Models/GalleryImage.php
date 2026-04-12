<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class GalleryImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category',
        'description',
        'alt_text',
        'image_path',
        'is_published',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
        ];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->latest('id');
    }

    public function imageUrl(): string
    {
        if (Str::startsWith($this->image_path, ['http://', 'https://'])) {
            return $this->image_path;
        }

        return Storage::disk('public')->url($this->image_path);
    }

    public function isExternal(): bool
    {
        return Str::startsWith($this->image_path, ['http://', 'https://']);
    }
}

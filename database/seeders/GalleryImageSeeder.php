<?php

namespace Database\Seeders;

use App\Models\GalleryImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GalleryImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $images = [
            [
                'title' => 'Eskuvoi selfie sarok',
                'category' => 'Eskuvo',
                'description' => 'Vilagos, elegans beallitas premium nyomtatassal.',
                'alt_text' => 'Eskuvoi selfiebox pillanat',
                'image_path' => 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
                'sort_order' => 1,
            ],
            [
                'title' => 'Ceges esemeny aktivacio',
                'category' => 'Ceges',
                'description' => 'Brandelheto hatterekkel es azonnali megosztassal.',
                'alt_text' => 'Ceges selfiebox esemeny',
                'image_path' => 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
                'sort_order' => 2,
            ],
            [
                'title' => 'Szuletesnapi buli',
                'category' => 'Szuletesnap',
                'description' => 'Vidam kellekekkel, GIF-fel es boomeranggal.',
                'alt_text' => 'Szuletesnapi selfiebox',
                'image_path' => 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80',
                'sort_order' => 3,
            ],
        ];

        foreach ($images as $image) {
            GalleryImage::query()->updateOrCreate(
                ['title' => $image['title']],
                [
                    ...$image,
                    'is_published' => true,
                ],
            );
        }
    }
}

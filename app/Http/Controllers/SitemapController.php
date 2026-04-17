<?php

namespace App\Http\Controllers;

use App\Models\GalleryImage;
use App\Models\SiteContent;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $baseUrl = rtrim(config('app.url'), '/');
        $siteContent = SiteContent::singleton();
        $content = $siteContent->resolvedContent();
        $lastModified = $siteContent->updated_at?->toAtomString() ?? now()->toAtomString();

        $images = collect([
            [
                'loc' => data_get($content, 'seo.og_image_url') ?: data_get($content, 'hero.image_url'),
                'title' => data_get($content, 'seo.og_image_alt'),
                'caption' => data_get($content, 'seo.meta_description'),
            ],
            [
                'loc' => data_get($content, 'hero.image_url'),
                'title' => data_get($content, 'hero.image_alt'),
                'caption' => data_get($content, 'hero.subtitle'),
            ],
        ])
            ->merge(
                collect(data_get($content, 'backgrounds.items', []))->map(fn (array $background) => [
                    'loc' => data_get($background, 'image_url') ?: data_get($background, 'image_path'),
                    'title' => data_get($background, 'label'),
                    'caption' => data_get($content, 'backgrounds.description'),
                ])
            )
            ->merge(
                GalleryImage::published()
                    ->ordered()
                    ->get()
                    ->map(fn (GalleryImage $image) => [
                        'loc' => $image->imageUrl(),
                        'title' => $image->alt_text ?: $image->title,
                        'caption' => $image->description,
                    ])
            )
            ->map(fn (array $image) => [
                ...$image,
                'loc' => $this->absoluteUrl($image['loc'] ?? null, $baseUrl),
            ])
            ->filter(fn (array $image) => filled($image['loc']))
            ->unique('loc')
            ->values()
            ->all();

        $urls = [
            [
                'loc' => "{$baseUrl}/",
                'lastmod' => $lastModified,
                'changefreq' => 'weekly',
                'priority' => '1.0',
                'images' => $images,
            ],
        ];

        $xml = view('seo.sitemap', [
            'urls' => $urls,
        ])->render();

        return response($xml, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }

    private function absoluteUrl(?string $url, string $baseUrl): ?string
    {
        if (! filled($url)) {
            return null;
        }

        if (Str::startsWith($url, ['http://', 'https://'])) {
            return $url;
        }

        return $baseUrl.'/'.ltrim($url, '/');
    }
}

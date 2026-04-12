<?php

namespace App\Http\Controllers;

use App\Models\SiteContent;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $baseUrl = rtrim(config('app.url'), '/');
        $lastModified = SiteContent::singleton()->updated_at?->toAtomString() ?? now()->toAtomString();

        $urls = [
            [
                'loc' => "{$baseUrl}/",
                'lastmod' => $lastModified,
                'changefreq' => 'weekly',
                'priority' => '1.0',
            ],
        ];

        $xml = view('seo.sitemap', [
            'urls' => $urls,
        ])->render();

        return response($xml, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }
}

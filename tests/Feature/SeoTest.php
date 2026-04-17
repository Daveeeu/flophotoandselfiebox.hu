<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SeoTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_renders_server_side_seo_metadata(): void
    {
        $response = $this->get('/');

        $response
            ->assertOk()
            ->assertSee('<meta name="description"', false)
            ->assertSee('<link rel="canonical" href="http://localhost/">', false)
            ->assertSee('<meta property="og:type" content="website">', false)
            ->assertSee('<meta name="twitter:card" content="summary_large_image">', false)
            ->assertSee('<script type="application/ld+json">', false);
    }

    public function test_sitemap_includes_image_entries(): void
    {
        $response = $this->get('/sitemap.xml');

        $response
            ->assertOk()
            ->assertHeader('Content-Type', 'application/xml')
            ->assertSee('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"', false)
            ->assertSee('<image:image>', false);
    }

    public function test_non_canonical_hosts_redirect_to_app_url(): void
    {
        config(['app.url' => 'https://flophotoandselfiebox.hu']);

        $response = $this->withHeader('Host', 'www.flophotoandselfiebox.hu')->get('/sitemap.xml');

        $response
            ->assertMovedPermanently()
            ->assertRedirect('https://flophotoandselfiebox.hu/sitemap.xml');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\GalleryImage;
use App\Models\SiteContent;
use Inertia\Inertia;
use Inertia\Response;

class LandingPageController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('Home', [
            'appUrl' => rtrim(config('app.url'), '/'),
            'siteContent' => SiteContent::singleton()->resolvedContent(),
            'galleryImages' => GalleryImage::query()
                ->published()
                ->ordered()
                ->get()
                ->map(fn (GalleryImage $image) => [
                    'id' => $image->id,
                    'title' => $image->title,
                    'category' => $image->category,
                    'description' => $image->description,
                    'alt_text' => $image->alt_text,
                    'image_url' => $image->imageUrl(),
                ]),
        ]);
    }
}

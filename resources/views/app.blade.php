<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        @php
            $inertiaPage = $page ?? [];
            $component = data_get($inertiaPage, 'component');
            $siteContent = data_get($inertiaPage, 'props.siteContent', []);
            $galleryImages = data_get($inertiaPage, 'props.galleryImages', []);
            $appUrl = rtrim((string) data_get($inertiaPage, 'props.appUrl', config('app.url')), '/');
            $canonicalUrl = "{$appUrl}/";
            $isHome = $component === 'Home';

            $seo = data_get($siteContent, 'seo', []);
            $brandName = trim(data_get($siteContent, 'header.brand_text', 'Flo').data_get($siteContent, 'header.brand_accent', 'photo'));
            $seoTitle = data_get($seo, 'meta_title', config('app.name', 'FloPhoto Selfiebox'));
            $metaDescription = data_get($seo, 'meta_description');
            $metaKeywords = data_get($seo, 'meta_keywords');
            $ogTitle = data_get($seo, 'og_title', $seoTitle);
            $ogDescription = data_get($seo, 'og_description', $metaDescription);
            $heroImage = data_get($siteContent, 'hero.image_url') ?: data_get($siteContent, 'hero.image_path');
            $ogImage = data_get($seo, 'og_image_url') ?: data_get($seo, 'og_image_path') ?: $heroImage;
            $ogImageAlt = data_get($seo, 'og_image_alt', $brandName);
            $twitterCard = data_get($seo, 'twitter_card', 'summary_large_image');
            $locationLines = collect(explode("\n", (string) data_get($siteContent, 'contact.location_value', '')))
                ->map(fn ($location) => trim($location))
                ->filter()
                ->values()
                ->all();
            $sameAs = collect([
                data_get($siteContent, 'footer.facebook_url'),
                data_get($siteContent, 'footer.instagram_url'),
            ])
                ->filter(fn ($url) => filled($url) && $url !== '#')
                ->values()
                ->all();
            $structuredData = [
                '@context' => 'https://schema.org',
                '@graph' => [
                    [
                        '@type' => 'LocalBusiness',
                        '@id' => "{$canonicalUrl}#business",
                        'name' => $brandName,
                        'url' => $canonicalUrl,
                        'image' => $ogImage,
                        'email' => data_get($siteContent, 'contact.email_value'),
                        'telephone' => data_get($siteContent, 'contact.phone_value'),
                        'description' => $metaDescription,
                        'address' => [
                            '@type' => 'PostalAddress',
                            'addressLocality' => 'Szerencs',
                            'addressCountry' => 'HU',
                        ],
                        'areaServed' => count($locationLines) > 0
                            ? collect($locationLines)->map(fn ($location) => [
                                '@type' => 'AdministrativeArea',
                                'name' => $location,
                                'addressCountry' => 'HU',
                            ])->all()
                            : 'HU',
                        'sameAs' => $sameAs,
                        'priceRange' => '100000-150000 HUF',
                    ],
                    [
                        '@type' => 'Service',
                        '@id' => "{$canonicalUrl}#service",
                        'name' => 'Selfiebox kölcsönzés',
                        'serviceType' => 'Selfiebox kölcsönzés',
                        'provider' => [
                            '@id' => "{$canonicalUrl}#business",
                        ],
                        'areaServed' => count($locationLines) > 0 ? $locationLines : 'HU',
                        'description' => $metaDescription,
                    ],
                    [
                        '@type' => 'WebSite',
                        '@id' => "{$canonicalUrl}#website",
                        'url' => $canonicalUrl,
                        'name' => $brandName,
                        'inLanguage' => 'hu-HU',
                    ],
                    [
                        '@type' => 'WebPage',
                        '@id' => "{$canonicalUrl}#webpage",
                        'url' => $canonicalUrl,
                        'name' => $seoTitle,
                        'description' => $metaDescription,
                        'inLanguage' => 'hu-HU',
                        'isPartOf' => [
                            '@id' => "{$canonicalUrl}#website",
                        ],
                        'about' => [
                            '@id' => "{$canonicalUrl}#service",
                        ],
                        'primaryImageOfPage' => $ogImage ? [
                            '@type' => 'ImageObject',
                            'url' => $ogImage,
                            'caption' => $ogImageAlt,
                        ] : null,
                    ],
                ],
            ];
            $structuredData['@graph'] = collect($structuredData['@graph'])
                ->map(fn ($item) => array_filter($item, fn ($value) => $value !== null && $value !== []))
                ->all();
        @endphp
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#111827">

        <title inertia>{{ $seoTitle }}</title>
        @if ($isHome)
            @if ($metaDescription)
                <meta name="description" content="{{ $metaDescription }}">
            @endif
            @if ($metaKeywords)
                <meta name="keywords" content="{{ $metaKeywords }}">
            @endif
            <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
            <link rel="canonical" href="{{ $canonicalUrl }}">
            <link rel="alternate" href="{{ $canonicalUrl }}" hreflang="hu-HU">
            <link rel="alternate" href="{{ $canonicalUrl }}" hreflang="x-default">

            <meta property="og:type" content="website">
            <meta property="og:locale" content="hu_HU">
            <meta property="og:site_name" content="{{ $brandName }}">
            <meta property="og:title" content="{{ $ogTitle }}">
            @if ($ogDescription)
                <meta property="og:description" content="{{ $ogDescription }}">
            @endif
            <meta property="og:url" content="{{ $canonicalUrl }}">
            @if ($ogImage)
                <meta property="og:image" content="{{ $ogImage }}">
                <meta property="og:image:alt" content="{{ $ogImageAlt }}">
            @endif

            <meta name="twitter:card" content="{{ $twitterCard }}">
            <meta name="twitter:title" content="{{ $ogTitle }}">
            @if ($ogDescription)
                <meta name="twitter:description" content="{{ $ogDescription }}">
            @endif
            @if ($ogImage)
                <meta name="twitter:image" content="{{ $ogImage }}">
            @endif

            <script type="application/ld+json">{!! json_encode($structuredData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
        @else
            <meta name="robots" content="noindex,nofollow">
        @endif

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>

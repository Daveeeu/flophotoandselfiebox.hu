<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SiteContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
    ];

    protected function casts(): array
    {
        return [
            'content' => 'array',
        ];
    }

    public static function singleton(): self
    {
        return static::query()->firstOrCreate([], [
            'content' => static::defaultContent(),
        ]);
    }

    public static function defaultContent(): array
    {
        return [
            'header' => [
                'brand_text' => 'Flo',
                'brand_accent' => 'Photo',
                'cta_label' => 'Időpontfoglalás',
                'nav_labels' => [
                    'Főoldal',
                    'Mi az a Selfiebox?',
                    'Galéria',
                    'Csomagok',
                    'Foglalás',
                    'Hátterek',
                    'Kapcsolat',
                ],
            ],
            'hero' => [
                'image_path' => 'https://images.unsplash.com/photo-1738156684532-b79bfb589344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWxmaWUlMjBwaG90byUyMGJvb3RoJTIwcGFydHklMjBldmVudHxlbnwxfHx8fDE3NzUwMzIzMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
                'image_alt' => 'Flophoto Selfie Box Hero',
                'title_prefix' => 'Örökíts meg',
                'title_highlight' => 'minden pillanatot',
                'subtitle' => 'A legmodernebb SelfieBox kölcsönzés',
                'primary_features' => [
                    'céges rendezvényekre',
                    'esküvőkre',
                    'bálokra',
                    'szülinapokra',
                ],
                'secondary_features' => [
                    'professzionális fotók & videók',
                    'korlátlan nyomtatás',
                    'digitális elérés',
                ],
                'primary_cta_label' => 'Időpontfoglalás',
                'secondary_cta_label' => 'Kapcsolat',
            ],
            'seo' => [
                'meta_title' => 'Selfiebox kölcsönzés esküvőre és rendezvényre | FloPhoto',
                'meta_description' => 'FloPhoto selfiebox kölcsönzés esküvőre, céges rendezvényre és privát eseményre Borsod, Szabolcs, Hajdú-Bihar és Heves vármegyében.',
                'meta_keywords' => 'selfiebox, selfie box, fotóautomata, fotóbox kölcsönzés, esküvő selfiebox, rendezvény selfiebox, FloPhoto, Borsod selfiebox',
                'og_title' => 'FloPhoto Selfiebox kölcsönzés',
                'og_description' => 'Prémium selfiebox szolgáltatás esküvőkre, céges eseményekre és privát rendezvényekre Borsod, Szabolcs, Hajdú-Bihar és Heves vármegyében.',
                'og_image_path' => 'https://images.unsplash.com/photo-1738156684532-b79bfb589344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWxmaWUlMjBwaG90byUyMGJvb3RoJTIwcGFydHklMjBldmVudHxlbnwxfHx8fDE3NzUwMzIzMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
                'og_image_alt' => 'Flophoto selfiebox rendezvényen',
                'twitter_card' => 'summary_large_image',
            ],
            'what' => [
                'title' => 'Mi az a Selfiebox?',
                'paragraph_1' => 'A Selfiebox egy modern, interaktív fotóautomata, amely előtt a vendégek vicces kellékekkel fotókat, GIF vagy boomerang videókat készíthetnek, majd azokat azonnal megkapják nyomtatva vagy digitálisan.',
                'paragraph_2' => 'Tökéletes céges rendezvényekre, esküvőkre, bulikra, mert szórakoztat, közösségi élményt ad, és maradandó emlékeket készít - egyszerűen, gyorsan és látványosan.',
                'features' => [
                    [
                        'title' => 'Személyes asszisztencia',
                        'description' => 'Néhány másodperc és a kezedben foghatod a kinyomtatott fényképet',
                    ],
                    [
                        'title' => 'Kiváló minőség',
                        'description' => 'Prémium fényképezőgép, nyomtató és vaku',
                    ],
                    [
                        'title' => 'Azonnali megosztás',
                        'description' => 'QR kód beolvasása után azonnal letöltheted az elkészült fotókat és videókat',
                    ],
                    [
                        'title' => 'Egyedi élmény',
                        'description' => 'Egyszerre szórakoztató, spontán és személyes. Nem csak egy fotó készül, hanem egy közös pillanat.',
                    ],
                ],
            ],
            'gallery' => [
                'title' => 'Referenciák',
                'description' => 'Válogatás korábbi események hangulatából, hogy lásd, milyen élményt ad a selfie box élesben.',
                'fallback_description' => 'Részlet egy korábbi rendezvény galériájából.',
            ],
            'packages' => [
                'title' => 'Csomagok & Árak',
                'description' => 'Válaszd ki a számodra ideális csomagot!',
                'highlight_badge' => 'Legnépszerűbb',
                'items' => [
                    [
                        'name' => 'Alapcsomag',
                        'price' => '100.000 Ft',
                        'duration' => '3 óra',
                        'features' => [
                            'korlátlan fotó nyomtatás',
                            'korlátlan letöltés',
                            'személyes asszisztencia',
                            'vicces kiegészítők',
                            'választható háttér',
                            'személyre szabott keret',
                        ],
                        'cta_label' => 'Választom',
                        'highlighted' => false,
                    ],
                    [
                        'name' => 'Középcsomag',
                        'price' => '125.000 Ft',
                        'duration' => '4 óra',
                        'features' => [
                            'korlátlan fotó nyomtatás',
                            'korlátlan letöltés',
                            'személyes asszisztencia',
                            'vicces kiegészítők',
                            'választható háttér',
                            'személyre szabott keret',
                        ],
                        'cta_label' => 'Választom',
                        'highlighted' => true,
                    ],
                    [
                        'name' => 'Prémium csomag',
                        'price' => '150.000 Ft',
                        'duration' => '5 óra',
                        'features' => [
                            'korlátlan fotó nyomtatás',
                            'korlátlan letöltés',
                            'személyes asszisztencia',
                            'vicces kiegészítők',
                            'választható háttér',
                            'személyre szabott keret',
                        ],
                        'cta_label' => 'Választom',
                        'highlighted' => false,
                    ],
                ],
                'digital' => [
                    'name' => 'Digitális csomag',
                    'price' => '20.000 Ft',
                    'duration' => 'óra',
                    'features' => [
                        'korlátlan letöltés',
                        'személyes asszisztencia',
                        'vicces kiegészítők',
                        'választható háttér',
                        'személyre szabott keret',
                    ],
                    'note' => 'Csak digitális fotók - nyomtatás nélkül',
                    'cta_label' => 'Választom',
                ],
                'custom_note' => 'Egyedi igény esetén keress minket, és személyre szabott árajánlatot készítünk.',
            ],
            'booking' => [
                'title' => 'Foglalj időpontot',
                'description' => 'Küldd el a számodra megfelelő dátumot, és rövid időn belül visszajelzünk az elérhető időpontról és a részletekről.',
                'date_label' => 'Válassz dátumot',
                'form_title' => 'Adatok megadása',
                'name_label' => 'Név',
                'name_placeholder' => 'Teljes neved',
                'email_label' => 'Email',
                'email_placeholder' => 'nev@email.hu',
                'summary_title' => 'Foglalás összefoglaló',
                'summary_note' => 'A foglalás elküldése után e-mailben egyeztetjük a pontos részleteket.',
                'submit_label' => 'Foglalás leadása',
                'submitting_label' => 'Küldés...',
            ],
            'backgrounds' => [
                'title' => 'Elérhető hátterek',
                'description' => 'Prémium 2.5 x 2.5 m könnyűszerkezetes Selfiebox háttér',
                'cta_text' => 'Személyre szabott hátteret szeretnél?',
                'cta_button_label' => 'Kérdezz tőlünk',
                'items' => [
                    [
                        'label' => 'Elegáns fehér',
                        'image_path' => 'https://images.unsplash.com/photo-1738669469256-196b85ef65f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGNlbGVicmF0aW9uJTIwcGFydHl8ZW58MXx8fHwxNzc1MDMyMzIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
                    ],
                    [
                        'label' => 'Ünnepélyes arany',
                        'image_path' => 'https://images.unsplash.com/photo-1761300725208-e8f92da35f5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZlJTIwcGFydHklMjBkZWNvcmF0aW9ucyUyMGJhY2tkcm9wfGVufDF8fHx8MTc3NTAzMjMyNHww&ixlib=rb-4.1.0&q=80&w=1080',
                    ],
                    [
                        'label' => 'Színes party',
                        'image_path' => 'https://images.unsplash.com/photo-1638417568260-32cd7abd212c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMHBhcnR5JTIwY2VsZWJyYXRpb24lMjBmdW58ZW58MXx8fHwxNzc1MDMyMzIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
                    ],
                    [
                        'label' => 'Modern minimal',
                        'image_path' => 'https://images.unsplash.com/photo-1768725844893-dfb68db063f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBldmVudCUyMHBhcnR5JTIwcGVvcGxlfGVufDF8fHx8MTc3NTAzMjMyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
                    ],
                    [
                        'label' => 'Céges elegancia',
                        'image_path' => 'https://images.unsplash.com/photo-1768508949921-9ef52e81bf1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBldmVudCUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc3NTAzMjMyNHww&ixlib=rb-4.1.0&q=80&w=1080',
                    ],
                    [
                        'label' => 'Trendi design',
                        'image_path' => 'https://images.unsplash.com/photo-1738156684532-b79bfb589344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWxmaWUlMjBwaG90byUyMGJvb3RoJTIwcGFydHklMjBldmVudHxlbnwxfHx8fDE3NzUwMzIzMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
                    ],
                ],
            ],
            'contact' => [
                'title' => 'Kapcsolat & Foglalás',
                'description' => 'Kérdésed van, ajánlatot kérnél vagy már időpontot egyeztetnél? Írj nekünk, és rövid időn belül válaszolunk.',
                'info_title' => 'Lépj kapcsolatba velünk',
                'info_description' => 'Esküvőre, céges eseményre, születésnapra vagy privát rendezvényre is segítünk megtalálni a megfelelő selfie box megoldást.',
                'phone_label' => 'Telefon',
                'phone_value' => '+36 70 328 8597',
                'email_label' => 'Email',
                'email_value' => 'info@flophotoandselfiebox.hu',
                'location_label' => 'Kiszállási helyek:',
                'location_value' => "Borsod-Abaúj-Zemplén vármegye\nSzabolcs-Szatmár-Bereg vármegye\nHajdú-Bihar vármegye\nHeves vármegye",
                'form' => [
                    'name_label' => 'Név',
                    'name_placeholder' => 'Teljes neved',
                    'email_label' => 'Email',
                    'email_placeholder' => 'nev@email.hu',
                    'message_label' => 'Üzenet',
                    'message_placeholder' => 'Írd meg, milyen eseményre kérnél ajánlatot vagy milyen kérdésed van...',
                    'submit_label' => 'Üzenet küldése',
                    'submitting_label' => 'Küldés...',
                ],
            ],
            'footer' => [
                'brand_text' => 'Flo',
                'brand_accent' => 'Photo',
                'description' => 'Selfie box szolgáltatás rendezvényekre, profi kiszolgálással és gyors, gördülékeny egyeztetéssel.',
                'quick_links_title' => 'Gyors linkek',
                'contact_title' => 'Kapcsolat',
                'social_title' => 'Kövess minket',
                'phone' => '+36 70 328 8597',
                'email' => 'info@flophotoandselfiebox.hu',
                'facebook_url' => '#',
                'instagram_url' => '#',
                'copyright' => 'Minden jog fenntartva.',
            ],
        ];
    }

    public function mergedContent(): array
    {
        $content = $this->content ?? [];
        $mergedContent = array_replace_recursive(static::defaultContent(), $content);

        if (array_key_exists('items', data_get($content, 'backgrounds', []))) {
            $mergedContent['backgrounds']['items'] = data_get($content, 'backgrounds.items', []);
        }

        return $mergedContent;
    }

    public function resolvedContent(): array
    {
        $content = $this->mergedContent();
        $content['hero']['image_url'] = static::resolveImageUrl($content['hero']['image_path'] ?? null);
        $content['seo']['og_image_url'] = static::resolveImageUrl($content['seo']['og_image_path'] ?? null);

        $content['backgrounds']['items'] = collect($content['backgrounds']['items'] ?? [])
            ->map(fn (array $item) => [
                ...$item,
                'image_url' => static::resolveImageUrl($item['image_path'] ?? null),
            ])
            ->all();

        return $content;
    }

    public static function resolveImageUrl(?string $path): ?string
    {
        if (! filled($path)) {
            return null;
        }

        if (Str::startsWith($path, ['http://', 'https://'])) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }

    public static function isExternalPath(?string $path): bool
    {
        return filled($path) && Str::startsWith($path, ['http://', 'https://']);
    }
}

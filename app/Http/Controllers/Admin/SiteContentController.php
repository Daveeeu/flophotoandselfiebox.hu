<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateSiteContentRequest;
use App\Models\SiteContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SiteContentController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/Content/Edit', [
            'content' => SiteContent::singleton()->resolvedContent(),
        ]);
    }

    public function update(UpdateSiteContentRequest $request): RedirectResponse
    {
        $siteContent = SiteContent::singleton();
        $content = $request->validated('content');
        $currentContent = $siteContent->mergedContent();

        $content['hero']['image_path'] = $this->resolveImagePath(
            $request->file('hero_image'),
            $content['hero']['image_path'] ?? null,
            data_get($currentContent, 'hero.image_path'),
        );

        $content['seo']['og_image_path'] = $this->resolveImagePath(
            $request->file('seo_og_image'),
            $content['seo']['og_image_path'] ?? null,
            data_get($currentContent, 'seo.og_image_path'),
        );

        foreach ($content['backgrounds']['items'] as $index => $item) {
            $content['backgrounds']['items'][$index]['image_path'] = $this->resolveImagePath(
                $request->file("background_images.{$index}"),
                $item['image_path'] ?? null,
                data_get($currentContent, "backgrounds.items.{$index}.image_path"),
            );
        }

        $siteContent->update([
            'content' => $content,
        ]);

        return back()->with('success', 'A publikus tartalmak frissültek.');
    }

    private function resolveImagePath(
        ?UploadedFile $uploadedFile,
        ?string $incomingPath,
        ?string $existingPath,
    ): string {
        if ($uploadedFile instanceof UploadedFile) {
            $this->deleteLocalFile($existingPath);

            return $uploadedFile->store('site-content', 'public');
        }

        if (filled($incomingPath)) {
            if ($incomingPath !== $existingPath) {
                $this->deleteLocalFile($existingPath);
            }

            return $incomingPath;
        }

        return (string) $existingPath;
    }

    private function deleteLocalFile(?string $path): void
    {
        if (! filled($path) || SiteContent::isExternalPath($path)) {
            return;
        }

        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}

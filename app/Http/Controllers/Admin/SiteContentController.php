<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateSiteContentRequest;
use App\Models\SiteContent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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

    public function storeImage(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'image' => ['required', 'image', 'max:8192'],
        ]);

        /** @var UploadedFile $image */
        $image = $validated['image'];
        $path = $image->store('site-content', 'public');

        return response()->json([
            'path' => $path,
            'url' => Storage::disk('public')->url($path),
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
            $content['backgrounds']['items'][$index]['image_path'] = $this->resolveBackgroundImagePath(
                $request->file("background_images.{$index}"),
                $item['image_path'] ?? null,
                data_get($currentContent, "backgrounds.items.{$index}.image_path"),
            );
        }

        foreach ($content['ai_selfie']['characters'] as $index => $character) {
            $content['ai_selfie']['characters'][$index]['image_path'] = $this->resolveImagePath(
                $request->file("ai_character_images.{$index}"),
                $character['image_path'] ?? null,
                data_get($currentContent, "ai_selfie.characters.{$index}.image_path"),
            );
        }

        $this->deleteRemovedBackgroundImages($currentContent, $content);

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

    private function deleteRemovedBackgroundImages(array $currentContent, array $incomingContent): void
    {
        $currentPaths = collect(data_get($currentContent, 'backgrounds.items', []))
            ->pluck('image_path')
            ->filter()
            ->all();

        $incomingPaths = collect(data_get($incomingContent, 'backgrounds.items', []))
            ->pluck('image_path')
            ->filter()
            ->all();

        collect($currentPaths)
            ->diff($incomingPaths)
            ->each(fn (string $path) => $this->deleteLocalFile($path));
    }

    private function resolveBackgroundImagePath(
        ?UploadedFile $uploadedFile,
        ?string $incomingPath,
        ?string $existingPath,
    ): string {
        if ($uploadedFile instanceof UploadedFile) {
            return $uploadedFile->store('site-content', 'public');
        }

        if (filled($incomingPath)) {
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

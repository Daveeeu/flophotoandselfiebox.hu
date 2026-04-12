<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGalleryImageRequest;
use App\Http\Requests\UpdateGalleryImageRequest;
use App\Models\GalleryImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryImageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Gallery/Index', [
            'images' => GalleryImage::query()
                ->ordered()
                ->paginate(12)
                ->through(fn (GalleryImage $image) => [
                    'id' => $image->id,
                    'title' => $image->title,
                    'category' => $image->category,
                    'description' => $image->description,
                    'alt_text' => $image->alt_text,
                    'image_path' => $image->image_path,
                    'image_url' => $image->imageUrl(),
                    'is_external' => $image->isExternal(),
                    'is_published' => $image->is_published,
                    'sort_order' => $image->sort_order,
                    'created_at' => $image->created_at?->toDateTimeString(),
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Gallery/Create');
    }

    public function store(StoreGalleryImageRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        GalleryImage::query()->create([
            'title' => $validated['title'],
            'category' => $validated['category'] ?? null,
            'description' => $validated['description'] ?? null,
            'alt_text' => $validated['alt_text'] ?? null,
            'image_path' => $this->resolveImagePath($request->file('image'), $validated['image_url'] ?? null),
            'is_published' => $validated['is_published'] ?? false,
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return redirect()->route('admin.gallery.index')->with('success', 'A kép bekerült a galériába.');
    }

    public function edit(GalleryImage $galleryImage): Response
    {
        return Inertia::render('Admin/Gallery/Edit', [
            'image' => [
                'id' => $galleryImage->id,
                'title' => $galleryImage->title,
                'category' => $galleryImage->category,
                'description' => $galleryImage->description,
                'alt_text' => $galleryImage->alt_text,
                'image_path' => $galleryImage->image_path,
                'image_url' => $galleryImage->imageUrl(),
                'is_external' => $galleryImage->isExternal(),
                'is_published' => $galleryImage->is_published,
                'sort_order' => $galleryImage->sort_order,
            ],
        ]);
    }

    public function update(UpdateGalleryImageRequest $request, GalleryImage $galleryImage): RedirectResponse
    {
        $validated = $request->validated();
        $imagePath = $galleryImage->image_path;

        if ($request->hasFile('image') || filled($validated['image_url'] ?? null)) {
            $this->deleteStoredImageIfLocal($galleryImage);
            $imagePath = $this->resolveImagePath($request->file('image'), $validated['image_url'] ?? null);
        }

        $galleryImage->update([
            'title' => $validated['title'],
            'category' => $validated['category'] ?? null,
            'description' => $validated['description'] ?? null,
            'alt_text' => $validated['alt_text'] ?? null,
            'image_path' => $imagePath,
            'is_published' => $validated['is_published'] ?? false,
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return redirect()->route('admin.gallery.index')->with('success', 'A kép adatai frissültek.');
    }

    public function destroy(GalleryImage $galleryImage): RedirectResponse
    {
        $this->deleteStoredImageIfLocal($galleryImage);
        $galleryImage->delete();

        return back()->with('success', 'A kép törölve lett.');
    }

    private function resolveImagePath(?UploadedFile $image, ?string $imageUrl): string
    {
        if ($image instanceof UploadedFile) {
            return $image->store('gallery', 'public');
        }

        return (string) $imageUrl;
    }

    private function deleteStoredImageIfLocal(GalleryImage $galleryImage): void
    {
        if (! $galleryImage->isExternal() && Storage::disk('public')->exists($galleryImage->image_path)) {
            Storage::disk('public')->delete($galleryImage->image_path);
        }
    }
}

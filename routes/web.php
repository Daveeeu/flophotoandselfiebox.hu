<?php

use App\Http\Controllers\Admin\BookingRequestController as AdminBookingRequestController;
use App\Http\Controllers\Admin\ContactInquiryController as AdminContactInquiryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\GalleryImageController as AdminGalleryImageController;
use App\Http\Controllers\Admin\SiteContentController;
use App\Http\Controllers\BookingRequestController;
use App\Http\Controllers\ContactInquiryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingPageController::class, 'show'])->name('home');
Route::get('/sitemap.xml', SitemapController::class)->name('sitemap');
Route::post('/contact', [ContactInquiryController::class, 'store'])->name('contact.store');
Route::post('/booking', [BookingRequestController::class, 'store'])->name('booking.store');

Route::redirect('/dashboard', '/admin')->middleware('auth')->name('dashboard');

Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');
    Route::get('/content', [SiteContentController::class, 'edit'])->name('content.edit');
    Route::put('/content', [SiteContentController::class, 'update'])->name('content.update');
    Route::post('/content/images', [SiteContentController::class, 'storeImage'])->name('content.images.store');
    Route::get('/contacts', [AdminContactInquiryController::class, 'index'])->name('contacts.index');
    Route::patch('/contacts/{contactInquiry}', [AdminContactInquiryController::class, 'update'])->name('contacts.update');
    Route::get('/bookings', [AdminBookingRequestController::class, 'index'])->name('bookings.index');
    Route::get('/bookings/{bookingRequest}/edit', [AdminBookingRequestController::class, 'edit'])->name('bookings.edit');
    Route::patch('/bookings/{bookingRequest}', [AdminBookingRequestController::class, 'update'])->name('bookings.update');
    Route::put('/bookings/{bookingRequest}/details', [AdminBookingRequestController::class, 'updateFull'])->name('bookings.save');
    Route::get('/gallery', [AdminGalleryImageController::class, 'index'])->name('gallery.index');
    Route::get('/gallery/create', [AdminGalleryImageController::class, 'create'])->name('gallery.create');
    Route::post('/gallery', [AdminGalleryImageController::class, 'store'])->name('gallery.store');
    Route::get('/gallery/{galleryImage}/edit', [AdminGalleryImageController::class, 'edit'])->name('gallery.edit');
    Route::match(['put', 'patch'], '/gallery/{galleryImage}', [AdminGalleryImageController::class, 'update'])->name('gallery.update');
    Route::delete('/gallery/{galleryImage}', [AdminGalleryImageController::class, 'destroy'])->name('gallery.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BookingRequest;
use App\Models\ContactInquiry;
use App\Models\GalleryImage;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'contact_inquiries' => ContactInquiry::query()->count(),
                'booking_requests' => BookingRequest::query()->count(),
                'published_images' => GalleryImage::query()->published()->count(),
            ],
            'latestContacts' => ContactInquiry::query()
                ->latestFirst()
                ->take(5)
                ->get()
                ->map(fn (ContactInquiry $inquiry) => [
                    'id' => $inquiry->id,
                    'name' => $inquiry->name,
                    'email' => $inquiry->email,
                    'subject' => $inquiry->subject,
                    'status' => $inquiry->status,
                    'created_at' => $inquiry->created_at?->toDateTimeString(),
                ]),
            'latestBookings' => BookingRequest::query()
                ->latestFirst()
                ->take(5)
                ->get()
                ->map(fn (BookingRequest $booking) => [
                    'id' => $booking->id,
                    'name' => $booking->name,
                    'event_type' => $booking->event_type,
                    'event_date' => $booking->event_date?->toDateString(),
                    'event_time' => $booking->event_time,
                    'status' => $booking->status,
                    'created_at' => $booking->created_at?->toDateTimeString(),
                ]),
        ]);
    }
}

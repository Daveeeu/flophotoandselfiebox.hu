<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateBookingRequest;
use App\Http\Requests\UpdateBookingStatusRequest;
use App\Models\BookingRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BookingRequestController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Bookings/Index', [
            'statuses' => BookingRequest::STATUSES,
            'bookings' => BookingRequest::query()
                ->latestFirst()
                ->paginate(12)
                ->through(fn (BookingRequest $booking) => [
                    'id' => $booking->id,
                    'name' => $booking->name,
                    'email' => $booking->email,
                    'phone' => $booking->phone,
                    'event_type' => $booking->event_type,
                    'event_date' => $booking->event_date?->toDateString(),
                    'event_time' => $booking->event_time,
                    'event_location' => $booking->event_location,
                    'guest_count' => $booking->guest_count,
                    'package_name' => $booking->package_name,
                    'notes' => $booking->notes,
                    'status' => $booking->status,
                    'created_at' => $booking->created_at?->toDateTimeString(),
                ]),
        ]);
    }

    public function edit(BookingRequest $bookingRequest): Response
    {
        return Inertia::render('Admin/Bookings/Edit', [
            'statuses' => BookingRequest::STATUSES,
            'booking' => [
                'id' => $bookingRequest->id,
                'name' => $bookingRequest->name,
                'email' => $bookingRequest->email,
                'phone' => $bookingRequest->phone,
                'event_type' => $bookingRequest->event_type,
                'event_date' => $bookingRequest->event_date?->toDateString(),
                'event_time' => $bookingRequest->event_time,
                'event_location' => $bookingRequest->event_location,
                'guest_count' => $bookingRequest->guest_count,
                'package_name' => $bookingRequest->package_name,
                'notes' => $bookingRequest->notes,
                'status' => $bookingRequest->status,
            ],
        ]);
    }

    public function update(UpdateBookingStatusRequest $request, BookingRequest $bookingRequest): RedirectResponse
    {
        $bookingRequest->update($request->validated());

        return back()->with('success', 'A foglalás állapota frissült.');
    }

    public function updateFull(UpdateBookingRequest $request, BookingRequest $bookingRequest): RedirectResponse
    {
        $validated = $request->validated();

        $bookingRequest->update([
            ...$validated,
            'event_type' => $validated['event_type'] ?: 'Általános érdeklődés',
            'event_location' => $validated['event_location'] ?: 'Egyeztetés alatt',
        ]);

        return redirect()->route('admin.bookings.index')->with('success', 'A foglalás adatai frissültek.');
    }
}

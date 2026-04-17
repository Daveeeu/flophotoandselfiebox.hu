<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Mail\BookingRequestConfirmation;
use App\Mail\BookingRequestReceived;
use App\Models\BookingRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class BookingRequestController extends Controller
{
    public function store(StoreBookingRequest $request): RedirectResponse
    {
        $booking = BookingRequest::query()->create([
            ...$request->safe()->except(['event_type', 'event_location']),
            'event_type' => $request->validated('event_type') ?: 'Általános érdeklődés',
            'event_location' => $request->validated('event_location') ?: 'Egyeztetés alatt',
            'status' => 'new',
        ]);

        $this->sendNotification($booking);
        $this->sendConfirmation($booking);

        return back()->with('success', 'A foglalási igényt rögzítettük, hamarosan visszajelzünk.');
    }

    private function sendNotification(BookingRequest $booking): void
    {
        $address = config('mail.notifications.to.address');

        if (! filled($address)) {
            return;
        }

        try {
            Mail::to($address, config('mail.notifications.to.name'))
                ->send(new BookingRequestReceived($booking));
        } catch (Throwable $exception) {
            Log::error('Booking request notification email failed.', [
                'booking_request_id' => $booking->id,
                'exception' => $exception,
            ]);
        }
    }

    private function sendConfirmation(BookingRequest $booking): void
    {
        try {
            Mail::to($booking->email, $booking->name)
                ->send(new BookingRequestConfirmation($booking));
        } catch (Throwable $exception) {
            Log::error('Booking request confirmation email failed.', [
                'booking_request_id' => $booking->id,
                'exception' => $exception,
            ]);
        }
    }
}

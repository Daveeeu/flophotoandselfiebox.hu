<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Models\BookingRequest;
use Illuminate\Http\RedirectResponse;

class BookingRequestController extends Controller
{
    public function store(StoreBookingRequest $request): RedirectResponse
    {
        BookingRequest::query()->create([
            ...$request->safe()->except(['event_type', 'event_location']),
            'event_type' => $request->validated('event_type') ?: 'Általános érdeklődés',
            'event_location' => $request->validated('event_location') ?: 'Egyeztetés alatt',
            'status' => 'new',
        ]);

        return back()->with('success', 'A foglalási igényt rögzítettük, hamarosan visszajelzünk.');
    }
}

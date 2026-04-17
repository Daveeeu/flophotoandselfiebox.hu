<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactInquiryRequest;
use App\Mail\ContactInquiryReceived;
use App\Models\ContactInquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ContactInquiryController extends Controller
{
    public function store(StoreContactInquiryRequest $request): RedirectResponse
    {
        $inquiry = ContactInquiry::query()->create([
            ...$request->safe()->except(['subject']),
            'subject' => $request->validated('subject') ?: 'Kapcsolatfelvétel',
            'status' => 'new',
        ]);

        $this->sendNotification($inquiry);

        return back()->with('success', 'Köszönjük az üzenetet, hamarosan jelentkezünk.');
    }

    private function sendNotification(ContactInquiry $inquiry): void
    {
        $address = config('mail.notifications.to.address');

        if (! filled($address)) {
            return;
        }

        try {
            Mail::to($address, config('mail.notifications.to.name'))
                ->send(new ContactInquiryReceived($inquiry));
        } catch (Throwable $exception) {
            Log::error('Contact inquiry notification email failed.', [
                'contact_inquiry_id' => $inquiry->id,
                'exception' => $exception,
            ]);
        }
    }
}

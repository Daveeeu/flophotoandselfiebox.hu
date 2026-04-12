<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactInquiryRequest;
use App\Models\ContactInquiry;
use Illuminate\Http\RedirectResponse;

class ContactInquiryController extends Controller
{
    public function store(StoreContactInquiryRequest $request): RedirectResponse
    {
        ContactInquiry::query()->create([
            ...$request->safe()->except(['subject']),
            'subject' => $request->validated('subject') ?: 'Kapcsolatfelvétel',
            'status' => 'new',
        ]);

        return back()->with('success', 'Köszönjük az üzenetet, hamarosan jelentkezünk.');
    }
}

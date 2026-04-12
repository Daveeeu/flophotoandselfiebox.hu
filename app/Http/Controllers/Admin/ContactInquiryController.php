<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateInquiryStatusRequest;
use App\Models\ContactInquiry;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactInquiryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Contacts/Index', [
            'statuses' => ContactInquiry::STATUSES,
            'contacts' => ContactInquiry::query()
                ->latestFirst()
                ->paginate(12)
                ->through(fn (ContactInquiry $inquiry) => [
                    'id' => $inquiry->id,
                    'name' => $inquiry->name,
                    'email' => $inquiry->email,
                    'phone' => $inquiry->phone,
                    'subject' => $inquiry->subject,
                    'message' => $inquiry->message,
                    'status' => $inquiry->status,
                    'created_at' => $inquiry->created_at?->toDateTimeString(),
                ]),
        ]);
    }

    public function update(UpdateInquiryStatusRequest $request, ContactInquiry $contactInquiry): RedirectResponse
    {
        $contactInquiry->update($request->validated());

        return back()->with('success', 'A kapcsolatfelvétel állapota frissült.');
    }
}

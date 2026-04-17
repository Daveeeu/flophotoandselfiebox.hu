<?php

namespace App\Mail;

use App\Models\BookingRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingRequestConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public BookingRequest $booking) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            replyTo: [config('mail.from.address')],
            subject: 'Megkaptuk a foglalási igényedet - FloPhoto Selfiebox',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.booking-request-confirmation',
        );
    }
}

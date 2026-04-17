<?php

namespace App\Mail;

use App\Models\BookingRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingRequestReceived extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public BookingRequest $booking) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            replyTo: [$this->booking->email],
            subject: 'Új foglalási igény: '.$this->booking->name,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.booking-request-received',
        );
    }
}

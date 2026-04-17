<?php

namespace Tests\Feature;

use App\Mail\BookingRequestConfirmation;
use App\Mail\BookingRequestReceived;
use App\Mail\ContactInquiryConfirmation;
use App\Mail\ContactInquiryReceived;
use App\Models\BookingRequest;
use App\Models\ContactInquiry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class InquiryNotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_form_sends_admin_and_customer_emails(): void
    {
        Mail::fake();
        config(['mail.notifications.to.address' => 'info@jandldavid.hu']);

        $this->post('/contact', [
            'name' => 'Teszt Elek',
            'email' => 'teszt@example.com',
            'phone' => '+36 30 123 4567',
            'subject' => 'Ajánlatkérés',
            'message' => 'Szeretnék ajánlatot kérni.',
        ])->assertSessionHasNoErrors();

        Mail::assertSent(ContactInquiryReceived::class, function (ContactInquiryReceived $mail) {
            return $mail->hasTo('info@jandldavid.hu')
                && $mail->inquiry->email === 'teszt@example.com'
                && $mail->inquiry->subject === 'Ajánlatkérés';
        });

        Mail::assertSent(ContactInquiryConfirmation::class, function (ContactInquiryConfirmation $mail) {
            return $mail->hasTo('teszt@example.com')
                && $mail->inquiry->name === 'Teszt Elek';
        });
    }

    public function test_booking_form_sends_admin_and_customer_emails(): void
    {
        Mail::fake();
        config(['mail.notifications.to.address' => 'info@jandldavid.hu']);

        $this->post('/booking', [
            'name' => 'Teszt Elek',
            'email' => 'teszt@example.com',
            'phone' => '+36 30 123 4567',
            'event_type' => 'Esküvő',
            'event_date' => now()->addDay()->toDateString(),
            'event_time' => '18:00',
            'event_location' => 'Szerencs',
            'guest_count' => 80,
            'package_name' => 'Prémium csomag',
            'notes' => 'Kültéri helyszín.',
        ])->assertSessionHasNoErrors();

        Mail::assertSent(BookingRequestReceived::class, function (BookingRequestReceived $mail) {
            return $mail->hasTo('info@jandldavid.hu')
                && $mail->booking->email === 'teszt@example.com'
                && $mail->booking->event_type === 'Esküvő';
        });

        Mail::assertSent(BookingRequestConfirmation::class, function (BookingRequestConfirmation $mail) {
            return $mail->hasTo('teszt@example.com')
                && $mail->booking->name === 'Teszt Elek';
        });
    }

    public function test_customer_confirmation_templates_render(): void
    {
        $inquiry = ContactInquiry::query()->create([
            'name' => 'Teszt Elek',
            'email' => 'teszt@example.com',
            'subject' => 'Ajánlatkérés',
            'message' => 'Szeretnék ajánlatot kérni.',
            'status' => 'new',
        ]);
        $booking = BookingRequest::query()->create([
            'name' => 'Teszt Elek',
            'email' => 'teszt@example.com',
            'event_type' => 'Esküvő',
            'event_date' => now()->addDay()->toDateString(),
            'event_location' => 'Szerencs',
            'status' => 'new',
        ]);

        $this->assertStringContainsString(
            'Megkaptuk az üzenetedet',
            (new ContactInquiryConfirmation($inquiry))->render(),
        );
        $this->assertStringContainsString(
            'Megkaptuk a foglalási igényedet',
            (new BookingRequestConfirmation($booking))->render(),
        );
    }
}

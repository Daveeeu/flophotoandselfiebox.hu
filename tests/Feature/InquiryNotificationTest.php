<?php

namespace Tests\Feature;

use App\Mail\BookingRequestReceived;
use App\Mail\ContactInquiryReceived;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class InquiryNotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_form_sends_admin_notification_email(): void
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
    }

    public function test_booking_form_sends_admin_notification_email(): void
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
    }
}

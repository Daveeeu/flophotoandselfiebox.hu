<x-email.customer-shell
    title="Megkaptuk a foglalási igényedet"
    preheader="A foglalási igényed feldolgozás alatt van, hamarosan visszajelzünk."
>
    <p style="margin: 0 0 18px; font-size: 18px; line-height: 1.6;">
        Szia {{ $booking->name }}!
    </p>

    <p style="margin: 0 0 22px; font-size: 16px; line-height: 1.7; color: #374151;">
        Köszönjük a foglalási igényedet. Rögzítettük az adatokat, ellenőrizzük az elérhetőséget, és hamarosan visszajelzünk a részletekkel.
    </p>

    <div style="margin: 26px 0; padding: 20px; border: 1px solid #d7eef2; border-radius: 16px; background: #f0fbfc;">
        <div style="margin-bottom: 14px; color: #0f766e; font-size: 13px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
            Foglalási adatok
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Esemény</td>
                <td align="right" style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 700;">{{ $booking->event_type }}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Dátum</td>
                <td align="right" style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 700;">{{ $booking->event_date?->format('Y. m. d.') }}</td>
            </tr>
            @if ($booking->event_time)
                <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Időpont</td>
                    <td align="right" style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 700;">{{ $booking->event_time }}</td>
                </tr>
            @endif
            <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Helyszín</td>
                <td align="right" style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 700;">{{ $booking->event_location }}</td>
            </tr>
            @if ($booking->package_name)
                <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Csomag</td>
                    <td align="right" style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 700;">{{ $booking->package_name }}</td>
                </tr>
            @endif
            <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Állapot</td>
                <td align="right" style="padding: 8px 0;">
                    <span style="display: inline-block; padding: 7px 12px; border-radius: 999px; background: #cffafe; color: #0e7490; font-size: 13px; font-weight: 800;">
                        Feldolgozás alatt
                    </span>
                </td>
            </tr>
        </table>
    </div>

    <p style="margin: 0 0 22px; font-size: 15px; line-height: 1.7; color: #4b5563;">
        Ez még nem végleges visszaigazolás. A dátumot és a részleteket külön e-mailben egyeztetjük veled.
    </p>

    <a href="{{ config('app.url') }}" style="display: inline-block; padding: 14px 20px; border-radius: 12px; background: #06b6d4; color: #ffffff; font-size: 15px; font-weight: 800; text-decoration: none;">
        Vissza a weboldalra
    </a>
</x-email.customer-shell>

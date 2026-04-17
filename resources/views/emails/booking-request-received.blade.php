<h1>Új foglalási igény</h1>

<p>Új foglalási igény érkezett a FloPhoto Selfiebox weboldalról.</p>

<table>
    <tr>
        <th align="left">Név</th>
        <td>{{ $booking->name }}</td>
    </tr>
    <tr>
        <th align="left">Email</th>
        <td>{{ $booking->email }}</td>
    </tr>
    @if ($booking->phone)
        <tr>
            <th align="left">Telefon</th>
            <td>{{ $booking->phone }}</td>
        </tr>
    @endif
    <tr>
        <th align="left">Esemény típusa</th>
        <td>{{ $booking->event_type }}</td>
    </tr>
    <tr>
        <th align="left">Dátum</th>
        <td>{{ $booking->event_date?->format('Y. m. d.') }}</td>
    </tr>
    @if ($booking->event_time)
        <tr>
            <th align="left">Időpont</th>
            <td>{{ $booking->event_time }}</td>
        </tr>
    @endif
    <tr>
        <th align="left">Helyszín</th>
        <td>{{ $booking->event_location }}</td>
    </tr>
    @if ($booking->guest_count)
        <tr>
            <th align="left">Vendégek száma</th>
            <td>{{ $booking->guest_count }}</td>
        </tr>
    @endif
    @if ($booking->package_name)
        <tr>
            <th align="left">Csomag</th>
            <td>{{ $booking->package_name }}</td>
        </tr>
    @endif
    <tr>
        <th align="left">Érkezett</th>
        <td>{{ $booking->created_at?->timezone('Europe/Budapest')->format('Y. m. d. H:i') }}</td>
    </tr>
</table>

@if ($booking->notes)
    <h2>Megjegyzés</h2>
    <p>{!! nl2br(e($booking->notes)) !!}</p>
@endif

<p>
    Admin felület:
    <a href="{{ route('admin.bookings.index') }}">{{ route('admin.bookings.index') }}</a>
</p>

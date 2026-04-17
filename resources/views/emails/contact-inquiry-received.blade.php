<h1>Új kapcsolatfelvétel</h1>

<p>Új üzenet érkezett a FloPhoto Selfiebox weboldalról.</p>

<table>
    <tr>
        <th align="left">Név</th>
        <td>{{ $inquiry->name }}</td>
    </tr>
    <tr>
        <th align="left">Email</th>
        <td>{{ $inquiry->email }}</td>
    </tr>
    @if ($inquiry->phone)
        <tr>
            <th align="left">Telefon</th>
            <td>{{ $inquiry->phone }}</td>
        </tr>
    @endif
    <tr>
        <th align="left">Tárgy</th>
        <td>{{ $inquiry->subject }}</td>
    </tr>
    <tr>
        <th align="left">Érkezett</th>
        <td>{{ $inquiry->created_at?->timezone('Europe/Budapest')->format('Y. m. d. H:i') }}</td>
    </tr>
</table>

<h2>Üzenet</h2>
<p>{!! nl2br(e($inquiry->message)) !!}</p>

<p>
    Admin felület:
    <a href="{{ route('admin.contacts.index') }}">{{ route('admin.contacts.index') }}</a>
</p>

@props([
    'preheader' => '',
    'title',
    'eyebrow' => 'FloPhoto Selfiebox',
])

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title }}</title>
</head>
<body style="margin: 0; padding: 0; background: #f3f7f8; color: #111827; font-family: Arial, Helvetica, sans-serif;">
    @if ($preheader)
        <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">
            {{ $preheader }}
        </div>
    @endif

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f3f7f8; padding: 28px 12px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 640px; overflow: hidden; border-radius: 24px; background: #ffffff; box-shadow: 0 18px 45px rgba(17, 24, 39, 0.12);">
                    <tr>
                        <td style="padding: 0;">
                            <div style="background: linear-gradient(135deg, #101827 0%, #0f766e 54%, #06b6d4 100%); padding: 34px 30px; color: #ffffff;">
                                <div style="font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255, 255, 255, 0.78);">
                                    {{ $eyebrow }}
                                </div>
                                <h1 style="margin: 12px 0 0; font-size: 30px; line-height: 1.18; font-weight: 800;">
                                    {{ $title }}
                                </h1>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            {{ $slot }}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 24px 30px; background: #101827; color: rgba(255, 255, 255, 0.76);">
                            <p style="margin: 0 0 8px; color: #ffffff; font-size: 16px; font-weight: 700;">
                                FloPhoto Selfiebox
                            </p>
                            <p style="margin: 0; font-size: 14px; line-height: 1.6;">
                                Esküvők, céges események és privát rendezvények emlékezetes pillanataihoz.
                            </p>
                            <p style="margin: 14px 0 0; font-size: 14px;">
                                <a href="{{ config('app.url') }}" style="color: #67e8f9; text-decoration: none;">{{ parse_url(config('app.url'), PHP_URL_HOST) }}</a>
                                <span style="color: rgba(255, 255, 255, 0.35);"> · </span>
                                <a href="mailto:{{ config('mail.from.address') }}" style="color: #67e8f9; text-decoration: none;">{{ config('mail.from.address') }}</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

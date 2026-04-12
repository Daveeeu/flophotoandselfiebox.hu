type FlashBannerProps = {
    message?: string;
    variant?: 'success' | 'error';
};

export default function FlashBanner({
    message,
    variant = 'success',
}: FlashBannerProps) {
    if (!message) {
        return null;
    }

    const tone =
        variant === 'success'
            ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
            : 'border-rose-200 bg-rose-50 text-rose-900';

    return (
        <div className={`rounded-2xl border px-4 py-3 text-sm ${tone}`}>
            {message}
        </div>
    );
}

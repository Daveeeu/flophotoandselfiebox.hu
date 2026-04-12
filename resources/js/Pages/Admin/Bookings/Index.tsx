import Pagination from '@/Components/Pagination';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type Booking = {
    id: number;
    name: string;
    email: string;
    phone: string;
    event_type: string;
    event_date: string | null;
    event_time: string;
    event_location: string;
    guest_count: number | null;
    package_name: string | null;
    notes: string | null;
    status: string;
    created_at: string | null;
};

type Paginated<T> = {
    data: T[];
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
};

type BookingsPageProps = {
    statuses: Record<string, string>;
    bookings: Paginated<Booking>;
};

export default function BookingsIndex({ statuses, bookings }: BookingsPageProps) {
    return (
        <AdminLayout
            title="Foglalási igények"
            description="A beérkező foglalások státusza itt kezelhető, a fontos eseményadatokkal együtt."
        >
            <div className="space-y-5">
                {bookings.data.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} statuses={statuses} />
                ))}
            </div>

            <div className="mt-6">
                <Pagination links={bookings.links} />
            </div>
        </AdminLayout>
    );
}

function BookingCard({
    booking,
    statuses,
}: {
    booking: Booking;
    statuses: Record<string, string>;
}) {
    const form = useForm({
        status: booking.status,
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        form.patch(route('admin.bookings.update', booking.id), {
            preserveScroll: true,
        });
    };

    return (
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-4xl">
                    <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-semibold text-slate-900">{booking.name}</h3>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-700">
                            {booking.event_type}
                        </span>
                    </div>

                    <div className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2 xl:grid-cols-3">
                        <InfoRow label="Email" value={booking.email} />
                        <InfoRow label="Telefon" value={booking.phone} />
                        <InfoRow label="Dátum" value={booking.event_date || 'Nincs megadva'} />
                        <InfoRow label="Időpont" value={booking.event_time || 'Nincs megadva'} />
                        <InfoRow label="Helyszín" value={booking.event_location} />
                        <InfoRow
                            label="Vendégszám"
                            value={booking.guest_count ? String(booking.guest_count) : 'Nincs megadva'}
                        />
                        <InfoRow
                            label="Csomag"
                            value={booking.package_name || 'Nincs kiválasztva'}
                        />
                    </div>

                    {booking.notes ? (
                        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                                Megjegyzés
                            </p>
                            <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-700">
                                {booking.notes}
                            </p>
                        </div>
                    ) : null}
                </div>

                <form onSubmit={submit} className="w-full max-w-xs space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <label className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                        Állapot
                    </label>
                    <select
                        value={form.data.status}
                        onChange={(event) => form.setData('status', event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-0"
                    >
                        {Object.entries(statuses).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        disabled={form.processing}
                        className="w-full rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {form.processing ? 'Mentés...' : 'Státusz mentése'}
                    </button>
                    <Link
                        href={route('admin.bookings.edit', booking.id)}
                        className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:border-cyan-400 hover:text-slate-900"
                    >
                        Foglalás szerkesztése
                    </Link>
                </form>
            </div>
        </article>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{label}</p>
            <p className="mt-1 text-sm text-slate-700">{value}</p>
        </div>
    );
}

import InputError from '@/Components/InputError';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import type { FormEvent, ReactNode } from 'react';

type EditBookingProps = {
    statuses: Record<string, string>;
    booking: {
        id: number;
        name: string;
        email: string;
        phone: string | null;
        event_type: string;
        event_date: string | null;
        event_time: string | null;
        event_location: string;
        guest_count: number | null;
        package_name: string | null;
        notes: string | null;
        status: string;
    };
};

export default function EditBooking({ statuses, booking }: EditBookingProps) {
    const form = useForm({
        name: booking.name,
        email: booking.email,
        phone: booking.phone ?? '',
        event_type: booking.event_type,
        event_date: booking.event_date ?? '',
        event_time: booking.event_time ?? '',
        event_location: booking.event_location,
        guest_count: booking.guest_count ?? '',
        package_name: booking.package_name ?? '',
        notes: booking.notes ?? '',
        status: booking.status,
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        form.put(route('admin.bookings.save', booking.id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout
            title="Foglalás szerkesztése"
            description="Itt módosíthatod a foglalás teljes adatlapját, nem csak az állapotát."
        >
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900">
                            #{booking.id} foglalás
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Teljes szerkesztés admin felületről.
                        </p>
                    </div>
                    <Link
                        href={route('admin.bookings.index')}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-cyan-400 hover:text-slate-900"
                    >
                        Vissza a listához
                    </Link>
                </div>

                <form onSubmit={submit} className="grid gap-5 md:grid-cols-2">
                    <Field label="Név" error={form.errors.name}>
                        <input
                            type="text"
                            value={form.data.name}
                            onChange={(event) => form.setData('name', event.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900"
                        />
                    </Field>

                    <Field label="Email" error={form.errors.email}>
                        <input
                            type="email"
                            value={form.data.email}
                            onChange={(event) => form.setData('email', event.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900"
                        />
                    </Field>

                    <Field label="Telefon" error={form.errors.phone}>
                        <input
                            type="text"
                            value={form.data.phone}
                            onChange={(event) => form.setData('phone', event.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900"
                        />
                    </Field>

                    <Field label="Állapot" error={form.errors.status}>
                        <select
                            value={form.data.status}
                            onChange={(event) => form.setData('status', event.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900"
                        >
                            {Object.entries(statuses).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <Field label="Esemény típusa" error={form.errors.event_type}>
                        <input
                            type="text"
                            value={form.data.event_type}
                            onChange={(event) =>
                                form.setData('event_type', event.target.value)
                            }
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900"
                        />
                    </Field>

                    <Field label="Helyszín" error={form.errors.event_location}>
                        <input
                            type="text"
                            value={form.data.event_location}
                            onChange={(event) =>
                                form.setData('event_location', event.target.value)
                            }
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900"
                        />
                    </Field>

                    <Field label="Dátum" error={form.errors.event_date}>
                        <input
                            type="date"
                            value={form.data.event_date}
                            onChange={(event) =>
                                form.setData('event_date', event.target.value)
                            }
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900"
                        />
                    </Field>

                    <Field label="Időpont" error={form.errors.event_time}>
                        <input
                            type="time"
                            value={form.data.event_time}
                            onChange={(event) =>
                                form.setData('event_time', event.target.value)
                            }
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900"
                        />
                    </Field>

                    <Field label="Vendégszám" error={form.errors.guest_count}>
                        <input
                            type="number"
                            min={1}
                            value={form.data.guest_count}
                            onChange={(event) =>
                                form.setData(
                                    'guest_count',
                                    event.target.value === '' ? '' : Number(event.target.value),
                                )
                            }
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900"
                        />
                    </Field>

                    <Field label="Csomag" error={form.errors.package_name}>
                        <input
                            type="text"
                            value={form.data.package_name}
                            onChange={(event) =>
                                form.setData('package_name', event.target.value)
                            }
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900"
                        />
                    </Field>

                    <div className="md:col-span-2">
                        <Field label="Megjegyzés" error={form.errors.notes}>
                            <textarea
                                rows={5}
                                value={form.data.notes}
                                onChange={(event) => form.setData('notes', event.target.value)}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900"
                            />
                        </Field>
                    </div>

                    <div className="md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {form.processing ? 'Mentés...' : 'Foglalás mentése'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: ReactNode;
}) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
            {children}
            <InputError message={error} className="mt-2" />
        </label>
    );
}

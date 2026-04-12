import AdminLayout from '@/Layouts/AdminLayout';

type DashboardProps = {
    stats: {
        contact_inquiries: number;
        booking_requests: number;
        published_images: number;
    };
    latestContacts: Array<{
        id: number;
        name: string;
        email: string;
        subject: string;
        status: string;
        created_at: string | null;
    }>;
    latestBookings: Array<{
        id: number;
        name: string;
        event_type: string;
        event_date: string | null;
        event_time: string;
        status: string;
        created_at: string | null;
    }>;
};

const statusStyles: Record<string, string> = {
    new: 'bg-amber-100 text-amber-800',
    in_progress: 'bg-sky-100 text-sky-800',
    closed: 'bg-emerald-100 text-emerald-800',
    confirmed: 'bg-sky-100 text-sky-800',
    completed: 'bg-emerald-100 text-emerald-800',
    cancelled: 'bg-rose-100 text-rose-800',
};

export default function Dashboard({
    stats,
    latestContacts,
    latestBookings,
}: DashboardProps) {
    return (
        <AdminLayout
            title="Áttekintés"
            description="Gyors rálátás a bejövő kapcsolatokra, foglalásokra és a publikus galériára."
        >
            <div className="grid gap-6 md:grid-cols-3">
                <StatCard
                    label="Kapcsolatfelvételek"
                    value={stats.contact_inquiries}
                    description="Összes beérkezett kapcsolatfelvétel"
                />
                <StatCard
                    label="Foglalási igények"
                    value={stats.booking_requests}
                    description="Adminból visszaigazolható bejegyzések"
                />
                <StatCard
                    label="Publikus képek"
                    value={stats.published_images}
                    description="Jelenleg megjelenő galériaelemek"
                />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-slate-900">Legutóbbi kapcsolatok</h3>
                        <a
                            href="/admin/contacts"
                            className="text-sm text-cyan-600 transition hover:text-cyan-700"
                        >
                            Összes megnyitása
                        </a>
                    </div>

                    <div className="mt-6 space-y-4">
                        {latestContacts.map((contact) => (
                            <article
                                key={contact.id}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="font-medium text-slate-900">{contact.name}</p>
                                        <p className="text-sm text-slate-500">{contact.email}</p>
                                    </div>
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] ${
                                            statusStyles[contact.status] || 'bg-slate-100 text-slate-700'
                                        }`}
                                    >
                                        {contact.status}
                                    </span>
                                </div>
                                <p className="mt-4 text-sm text-slate-600">{contact.subject}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-slate-900">Legutóbbi foglalások</h3>
                        <a
                            href="/admin/bookings"
                            className="text-sm text-cyan-600 transition hover:text-cyan-700"
                        >
                            Összes megnyitása
                        </a>
                    </div>

                    <div className="mt-6 space-y-4">
                        {latestBookings.map((booking) => (
                            <article
                                key={booking.id}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="font-medium text-slate-900">{booking.name}</p>
                                        <p className="text-sm text-slate-500">
                                            {booking.event_type}
                                        </p>
                                    </div>
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] ${
                                            statusStyles[booking.status] || 'bg-slate-100 text-slate-700'
                                        }`}
                                    >
                                        {booking.status}
                                    </span>
                                </div>
                                <p className="mt-4 text-sm text-slate-600">
                                    Dátum: {booking.event_date || 'Nincs megadva'}
                                    {booking.event_time ? ` • ${booking.event_time}` : ''}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}

function StatCard({
    label,
    value,
    description,
}: {
    label: string;
    value: number;
    description: string;
}) {
    return (
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">{label}</p>
            <p className="mt-4 text-5xl font-semibold text-slate-900">{value}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        </article>
    );
}

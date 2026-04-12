import Pagination from '@/Components/Pagination';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type Contact = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string;
    message: string;
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

type ContactsPageProps = {
    statuses: Record<string, string>;
    contacts: Paginated<Contact>;
};

export default function ContactsIndex({ statuses, contacts }: ContactsPageProps) {
    return (
        <AdminLayout
            title="Kapcsolatfelvételek"
            description="Minden beérkező üzenet itt jelenik meg, státusz szerint kezelhető formában."
        >
            <div className="space-y-5">
                {contacts.data.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} statuses={statuses} />
                ))}
            </div>

            <div className="mt-6">
                <Pagination links={contacts.links} />
            </div>
        </AdminLayout>
    );
}

function ContactCard({
    contact,
    statuses,
}: {
    contact: Contact;
    statuses: Record<string, string>;
}) {
    const form = useForm({
        status: contact.status,
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        form.patch(route('admin.contacts.update', contact.id), {
            preserveScroll: true,
        });
    };

    return (
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-semibold text-slate-900">{contact.subject}</h3>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-700">
                            #{contact.id}
                        </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                        <span>{contact.name}</span>
                        <span>{contact.email}</span>
                        {contact.phone ? <span>{contact.phone}</span> : null}
                        {contact.created_at ? <span>{contact.created_at}</span> : null}
                    </div>

                    <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-700">
                        {contact.message}
                    </p>
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
                </form>
            </div>
        </article>
    );
}

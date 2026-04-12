import { showToast } from '@/lib/toast';
import type { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Camera, CalendarDays, FileText, LayoutDashboard, Mail, LogOut } from 'lucide-react';
import { PropsWithChildren, useEffect } from 'react';

type AdminLayoutProps = PropsWithChildren<{
    title: string;
    description?: string;
}>;

const navigation = [
    {
        label: 'Attekintes',
        href: '/admin',
        icon: LayoutDashboard,
        matches: (url: string) => url === '/admin',
    },
    {
        label: 'Kapcsolatok',
        href: '/admin/contacts',
        icon: Mail,
        matches: (url: string) => url.startsWith('/admin/contacts'),
    },
    {
        label: 'Foglalasok',
        href: '/admin/bookings',
        icon: CalendarDays,
        matches: (url: string) => url.startsWith('/admin/bookings'),
    },
    {
        label: 'Galeria',
        href: '/admin/gallery',
        icon: Camera,
        matches: (url: string) => url.startsWith('/admin/gallery'),
    },
    {
        label: 'Tartalom',
        href: '/admin/content',
        icon: FileText,
        matches: (url: string) => url.startsWith('/admin/content'),
    },
];

export default function AdminLayout({
    title,
    description,
    children,
}: AdminLayoutProps) {
    const { auth, flash } = usePage<PageProps>().props;
    const { url } = usePage();

    useEffect(() => {
        if (flash.success) {
            showToast('success', flash.success);
        }

        if (flash.error) {
            showToast('error', flash.error);
        }
    }, [flash.error, flash.success]);

    return (
        <>
            <Head title={title}>
                <meta name="robots" content="noindex,nofollow" />
            </Head>

            <div className="min-h-screen bg-slate-100 text-slate-900">
                <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
                    <aside className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-6 lg:h-fit lg:w-72">
                        <Link href="/" className="block">
                            <p className="text-sm uppercase tracking-[0.35em] text-cyan-600">
                                Flophoto
                            </p>
                            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                                Admin felulet
                            </h1>
                        </Link>

                        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                                Bejelentkezve
                            </p>
                            <p className="mt-3 text-lg font-medium text-slate-900">
                                {auth.user?.name}
                            </p>
                            <p className="text-sm text-slate-500">
                                {auth.user?.email}
                            </p>
                        </div>

                        <nav className="mt-8 space-y-2">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                const active = item.matches(url);

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                                            active
                                                ? 'bg-cyan-500 text-white'
                                                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="mt-8 flex flex-col gap-3">
                            <Link
                                href="/"
                                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition hover:border-cyan-400 hover:text-slate-900"
                            >
                                Publikus oldal megnyitasa
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                            >
                                <LogOut className="h-4 w-4" />
                                Kijelentkezes
                            </Link>
                        </div>
                    </aside>

                    <div className="flex-1 space-y-6">
                        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <p className="text-sm uppercase tracking-[0.32em] text-cyan-600">
                                Kezeles
                            </p>
                            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                                {title}
                            </h2>
                            {description ? (
                                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                                    {description}
                                </p>
                            ) : null}
                        </header>
                        <main>{children}</main>
                    </div>
                </div>
            </div>
        </>
    );
}

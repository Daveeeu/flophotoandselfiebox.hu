import { confirmAction } from '@/lib/toast';
import Pagination from '@/Components/Pagination';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';

type GalleryImage = {
    id: number;
    title: string;
    category: string | null;
    description: string | null;
    alt_text: string | null;
    image_path: string;
    image_url: string;
    is_external: boolean;
    is_published: boolean;
    sort_order: number;
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

type GalleryIndexProps = {
    images: Paginated<GalleryImage>;
};

export default function GalleryIndex({ images }: GalleryIndexProps) {
    return (
        <AdminLayout
            title="Galéria"
            description="Képfeltöltés, publikálási állapot és sorrend kezelése a publikus referencia szekcióhoz."
        >
            <div className="mb-6 flex justify-end">
                <Link
                    href={route('admin.gallery.create')}
                    className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
                >
                    Új kép hozzáadása
                </Link>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                {images.data.map((image) => (
                    <article
                        key={image.id}
                        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                    >
                        <img
                            src={image.image_url}
                            alt={image.alt_text || image.title}
                            className="h-72 w-full object-cover"
                        />
                        <div className="space-y-4 p-6">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h3 className="text-2xl font-semibold text-slate-900">
                                        {image.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-500">
                                        {image.category || 'nincs kategória'}
                                    </p>
                                </div>
                                <span
                                    className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.28em] ${
                                        image.is_published
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : 'bg-amber-100 text-amber-800'
                                    }`}
                                >
                                    {image.is_published ? 'publikus' : 'rejtett'}
                                </span>
                            </div>

                            <p className="text-sm leading-7 text-slate-600">
                                {image.description || 'Ehhez a képhez még nem tartozik leírás.'}
                            </p>

                            <div className="grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
                                <InfoTile label="Sorrend" value={String(image.sort_order)} />
                                <InfoTile
                                    label="Forrás"
                                    value={image.is_external ? 'külső URL' : 'helyi feltöltés'}
                                />
                                <InfoTile
                                    label="Létrehozva"
                                    value={image.created_at || 'nincs adat'}
                                />
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href={route('admin.gallery.edit', image.id)}
                                    className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                                >
                                    Szerkesztés
                                </Link>
                                <button
                                    type="button"
                                    onClick={async () => {
                                        const result = await confirmAction({
                                            title: 'Biztosan törlöd ezt a galériaelemet?',
                                            text: 'A művelet nem vonható vissza.',
                                            confirmButtonText: 'Törlés',
                                        });

                                        if (result.isConfirmed) {
                                            router.delete(
                                                route('admin.gallery.destroy', image.id),
                                                {
                                                    preserveScroll: true,
                                                },
                                            );
                                        }
                                    }}
                                    className="rounded-xl border border-rose-200 px-4 py-3 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
                                >
                                    Törlés
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <div className="mt-6">
                <Pagination links={images.links} />
            </div>
        </AdminLayout>
    );
}

function InfoTile({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{label}</p>
            <p className="mt-1 text-sm text-slate-700">{value}</p>
        </div>
    );
}

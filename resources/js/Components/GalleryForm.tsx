import InputError from '@/Components/InputError';
import type { PageProps } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

type GalleryFormProps = {
    title: string;
    submitLabel: string;
    action: string;
    method?: 'post' | 'patch';
    image?: {
        id: number;
        title: string;
        category: string | null;
        description: string | null;
        alt_text: string | null;
        image_url: string;
        image_path: string;
        is_published: boolean;
        sort_order: number;
    };
};

export default function GalleryForm({
    title,
    submitLabel,
    action,
    method = 'post',
    image,
}: GalleryFormProps) {
    const { flash } = usePage<PageProps>().props;
    const [selectedFileName, setSelectedFileName] = useState('');
    const form = useForm({
        title: image?.title ?? '',
        category: image?.category ?? '',
        description: image?.description ?? '',
        alt_text: image?.alt_text ?? '',
        image: null as File | null,
        image_url: '',
        sort_order: image?.sort_order ?? 0,
        is_published: image?.is_published ?? true,
        _method: method,
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (method === 'patch') {
            form.post(action, {
                forceFormData: true,
                preserveScroll: true,
            });

            return;
        }

        form.post(action, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title={title} />

            <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            Tölts fel saját képet, vagy adj meg külső kép URL-t.
                        </p>
                    </div>
                    <Link
                        href="/admin/gallery"
                        className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition hover:border-cyan-400 hover:text-slate-900"
                    >
                        Vissza a listához
                    </Link>
                </div>

                {flash.success ? (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                        {flash.success}
                    </div>
                ) : null}

                <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-5">
                        <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Cím
                            </label>
                            <input
                                type="text"
                                value={form.data.title}
                                onChange={(event) => form.setData('title', event.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-0"
                            />
                            <InputError message={form.errors.title} className="mt-2" />
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Kategória
                                </label>
                                <input
                                    type="text"
                                    value={form.data.category}
                                    onChange={(event) => form.setData('category', event.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-0"
                                />
                                <InputError message={form.errors.category} className="mt-2" />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Sorrend
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    value={form.data.sort_order}
                                    onChange={(event) =>
                                        form.setData('sort_order', Number(event.target.value) || 0)
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-0"
                                />
                                <InputError message={form.errors.sort_order} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Leírás
                            </label>
                            <textarea
                                rows={5}
                                value={form.data.description}
                                onChange={(event) => form.setData('description', event.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-0"
                            />
                            <InputError message={form.errors.description} className="mt-2" />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Alt szöveg
                            </label>
                            <input
                                type="text"
                                value={form.data.alt_text}
                                onChange={(event) => form.setData('alt_text', event.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-0"
                            />
                            <InputError message={form.errors.alt_text} className="mt-2" />
                        </div>
                    </div>

                    <div className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                        <div>
                            <p className="text-sm font-medium text-slate-700">Jelenlegi kép</p>
                            <div className="mt-3 overflow-hidden rounded-3xl border border-slate-200 bg-white">
                                {image ? (
                                    <img
                                        src={image.image_url}
                                        alt={image.alt_text || image.title}
                                        className="h-72 w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-72 items-center justify-center px-6 text-center text-sm text-slate-500">
                                        Új elem létrehozása. A kép előnézete mentés után jelenik meg.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Fájl feltöltés
                            </label>
                            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-700 transition hover:border-cyan-400">
                                <span>Válassz képfájlt</span>
                                <span className="text-xs text-slate-500">
                                    PNG, JPG vagy WEBP, max 8 MB
                                </span>
                                <span className="text-xs text-cyan-600">
                                    {selectedFileName || 'Még nincs fájl kiválasztva'}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(event) => {
                                        const file = event.target.files?.[0] ?? null;
                                        form.setData('image', file);
                                        setSelectedFileName(file?.name ?? '');
                                    }}
                                />
                            </label>
                            <InputError message={form.errors.image} className="mt-2" />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Vagy külső kép URL
                            </label>
                            <input
                                type="url"
                                value={form.data.image_url}
                                onChange={(event) => form.setData('image_url', event.target.value)}
                                placeholder="https://..."
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-0"
                            />
                            <InputError message={form.errors.image_url} className="mt-2" />
                        </div>

                        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                            <input
                                type="checkbox"
                                checked={form.data.is_published}
                                onChange={(event) =>
                                    form.setData('is_published', event.target.checked)
                                }
                                className="rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                            />
                            Megjelenhet a publikus galériában
                        </label>

                        <button
                            type="submit"
                            disabled={form.processing}
                            className="w-full rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {form.processing ? 'Mentés...' : submitLabel}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

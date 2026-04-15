import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import type { SiteContent } from '../../../../../src/app/site-content';

type EditContentProps = {
    content: SiteContent;
};

type ContentFormData = {
    content: SiteContent;
    hero_image: File | null;
    seo_og_image: File | null;
    background_images: Array<File | null>;
    _method: 'put';
};

export default function EditContent({ content }: EditContentProps) {
    const [uploadingBackgroundImages, setUploadingBackgroundImages] = useState<boolean[]>(
        content.backgrounds.items.map(() => false),
    );
    const [backgroundUploadErrors, setBackgroundUploadErrors] = useState<Record<number, string>>({});

    const form = useForm<ContentFormData>({
        content,
        hero_image: null,
        seo_og_image: null,
        background_images: content.backgrounds.items.map(() => null),
        _method: 'put',
    });
    const isUploadingBackgroundImage = uploadingBackgroundImages.some(Boolean);

    const updateContent = (path: Array<string | number>, value: unknown) => {
        const next = structuredClone(form.data.content);
        let current: Record<string | number, unknown> = next as unknown as Record<string | number, unknown>;

        path.slice(0, -1).forEach((segment) => {
            current = current[segment] as Record<string | number, unknown>;
        });

        current[path[path.length - 1]] = value;
        form.setData((data) => ({
            ...data,
            content: next,
        }));
    };

    const updateStringList = (path: Array<string | number>, value: string) => {
        updateContent(
            path,
            value
                .split('\n')
                .map((item) => item.trim())
                .filter(Boolean),
        );
    };

    const updateBackgroundImage = (index: number, file: File | null) => {
        const next = [...form.data.background_images];
        next[index] = file;
        form.setData((data) => ({
            ...data,
            background_images: next,
        }));
    };

    const addBackgroundItem = () => {
        const next = structuredClone(form.data.content);

        next.backgrounds.items.push({
            label: '',
            image_path: '',
            image_url: null,
        });

        form.setData((data) => ({
            ...data,
            content: next,
            background_images: [...data.background_images, null],
        }));
        setUploadingBackgroundImages((statuses) => [...statuses, false]);
    };

    const removeBackgroundItem = (index: number) => {
        if (form.data.content.backgrounds.items.length <= 1) {
            return;
        }

        const next = structuredClone(form.data.content);
        next.backgrounds.items.splice(index, 1);

        form.setData((data) => ({
            ...data,
            content: next,
            background_images: data.background_images.filter((_, itemIndex) => itemIndex !== index),
        }));
        setUploadingBackgroundImages((statuses) =>
            statuses.filter((_, itemIndex) => itemIndex !== index),
        );
        setBackgroundUploadErrors((errors) =>
            Object.fromEntries(
                Object.entries(errors)
                    .filter(([key]) => Number(key) !== index)
                    .map(([key, value]) => {
                        const numericKey = Number(key);

                        return [numericKey > index ? numericKey - 1 : numericKey, value];
                    }),
            ),
        );
    };

    const updateBackgroundItemImage = (index: number, path: string, url: string) => {
        const next = structuredClone(form.data.content);

        next.backgrounds.items[index].image_path = path;
        next.backgrounds.items[index].image_url = url;

        form.setData((data) => ({
            ...data,
            content: next,
        }));
    };

    const uploadBackgroundImage = async (index: number, file: File | null) => {
        if (!file) {
            updateBackgroundImage(index, null);
            return;
        }

        updateBackgroundImage(index, file);
        setBackgroundUploadErrors((errors) => {
            const next = { ...errors };
            delete next[index];
            return next;
        });
        setUploadingBackgroundImages((statuses) => {
            const next = [...statuses];
            next[index] = true;
            return next;
        });

        const payload = new FormData();
        payload.append('image', file);

        try {
            const response = await axios.post<{ path: string; url: string }>(
                route('admin.content.images.store'),
                payload,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            updateBackgroundItemImage(index, response.data.path, response.data.url);
            updateBackgroundImage(index, null);
        } catch (error) {
            let message = 'A kép feltöltése nem sikerült. Ellenőrizd a fájlt és próbáld újra.';

            if (axios.isAxiosError(error)) {
                const validationMessage = error.response?.data?.errors?.image?.[0];
                const responseMessage = error.response?.data?.message;

                if (typeof validationMessage === 'string') {
                    message = validationMessage;
                } else if (typeof responseMessage === 'string') {
                    message = responseMessage;
                }
            }

            setBackgroundUploadErrors((errors) => ({
                ...errors,
                [index]: message,
            }));
            updateBackgroundImage(index, null);
        } finally {
            setUploadingBackgroundImages((statuses) => {
                const next = [...statuses];
                next[index] = false;
                return next;
            });
        }
    };

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        form.post(route('admin.content.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout
            title="Tartalomkezelés"
            description="Itt szerkesztheted a publikus landing összes szövegét és a nem galériás képeket."
        >
            <form onSubmit={submit} className="space-y-6">
                <SectionCard
                    title="SEO"
                    description="Keresőoptimalizálási meta adatok, Open Graph kép és megosztási előnézet."
                >
                    <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="space-y-5">
                            <div className="grid gap-5 md:grid-cols-2">
                                <TextField
                                    label="Meta title"
                                    value={form.data.content.seo.meta_title}
                                    onChange={(value) => updateContent(['seo', 'meta_title'], value)}
                                    className="md:col-span-2"
                                />
                                <TextareaField
                                    label="Meta description"
                                    value={form.data.content.seo.meta_description}
                                    onChange={(value) => updateContent(['seo', 'meta_description'], value)}
                                    className="md:col-span-2"
                                />
                                <TextField
                                    label="Meta keywords"
                                    value={form.data.content.seo.meta_keywords}
                                    onChange={(value) => updateContent(['seo', 'meta_keywords'], value)}
                                    className="md:col-span-2"
                                />
                                <TextField
                                    label="Open Graph title"
                                    value={form.data.content.seo.og_title}
                                    onChange={(value) => updateContent(['seo', 'og_title'], value)}
                                    className="md:col-span-2"
                                />
                                <TextareaField
                                    label="Open Graph description"
                                    value={form.data.content.seo.og_description}
                                    onChange={(value) => updateContent(['seo', 'og_description'], value)}
                                    className="md:col-span-2"
                                />
                                <TextField
                                    label="Open Graph kép alt"
                                    value={form.data.content.seo.og_image_alt}
                                    onChange={(value) => updateContent(['seo', 'og_image_alt'], value)}
                                />
                                <label className="block">
                                    <span className="mb-2 block text-sm font-medium text-slate-700">
                                        Twitter card
                                    </span>
                                    <select
                                        value={form.data.content.seo.twitter_card}
                                        onChange={(event) =>
                                            updateContent(['seo', 'twitter_card'], event.target.value)
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-0"
                                    >
                                        <option value="summary_large_image">summary_large_image</option>
                                        <option value="summary">summary</option>
                                    </select>
                                </label>
                                <TextField
                                    label="Open Graph kép URL vagy tárolt útvonal"
                                    value={form.data.content.seo.og_image_path}
                                    onChange={(value) => updateContent(['seo', 'og_image_path'], value)}
                                    className="md:col-span-2"
                                />
                            </div>
                        </div>

                        <ImageUploadCard
                            label="Open Graph kép feltöltése"
                            previewUrl={
                                form.data.content.seo.og_image_url || form.data.content.seo.og_image_path
                            }
                            file={form.data.seo_og_image}
                            onChange={(file) =>
                                form.setData((data) => ({
                                    ...data,
                                    seo_og_image: file,
                                }))
                            }
                        />
                    </div>
                </SectionCard>

                <SectionCard
                    title="Fejléc"
                    description="Logó, navigációs címkék és a fő CTA gomb szövege."
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        <TextField
                            label="Márkanév első része"
                            value={form.data.content.header.brand_text}
                            onChange={(value) => updateContent(['header', 'brand_text'], value)}
                        />
                        <TextField
                            label="Márkanév kiemelt része"
                            value={form.data.content.header.brand_accent}
                            onChange={(value) => updateContent(['header', 'brand_accent'], value)}
                        />
                        <TextField
                            label="Fejléc CTA felirat"
                            value={form.data.content.header.cta_label}
                            onChange={(value) => updateContent(['header', 'cta_label'], value)}
                            className="md:col-span-2"
                        />
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {form.data.content.header.nav_labels.map((label, index) => (
                            <TextField
                                key={index}
                                label={`Navigáció ${index + 1}.`}
                                value={label}
                                onChange={(value) => updateContent(['header', 'nav_labels', index], value)}
                            />
                        ))}
                    </div>
                </SectionCard>

                <SectionCard
                    title="Hero"
                    description="Nyitó blokk címei, kiemelések és a fő hero kép."
                >
                    <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="space-y-5">
                            <div className="grid gap-5 md:grid-cols-2">
                                <TextField
                                    label="Hero főcím eleje"
                                    value={form.data.content.hero.title_prefix}
                                    onChange={(value) => updateContent(['hero', 'title_prefix'], value)}
                                />
                                <TextField
                                    label="Hero kiemelt rész"
                                    value={form.data.content.hero.title_highlight}
                                    onChange={(value) => updateContent(['hero', 'title_highlight'], value)}
                                />
                                <TextField
                                    label="Hero alcím"
                                    value={form.data.content.hero.subtitle}
                                    onChange={(value) => updateContent(['hero', 'subtitle'], value)}
                                    className="md:col-span-2"
                                />
                                <TextField
                                    label="Első CTA"
                                    value={form.data.content.hero.primary_cta_label}
                                    onChange={(value) => updateContent(['hero', 'primary_cta_label'], value)}
                                />
                                <TextField
                                    label="Második CTA"
                                    value={form.data.content.hero.secondary_cta_label}
                                    onChange={(value) => updateContent(['hero', 'secondary_cta_label'], value)}
                                />
                                <TextField
                                    label="Kép alt szöveg"
                                    value={form.data.content.hero.image_alt}
                                    onChange={(value) => updateContent(['hero', 'image_alt'], value)}
                                    className="md:col-span-2"
                                />
                                <TextField
                                    label="Hero kép URL vagy tárolt útvonal"
                                    value={form.data.content.hero.image_path}
                                    onChange={(value) => updateContent(['hero', 'image_path'], value)}
                                    className="md:col-span-2"
                                />
                            </div>

                            <TextareaField
                                label="Első feature sor"
                                value={form.data.content.hero.primary_features.join('\n')}
                                onChange={(value) => updateStringList(['hero', 'primary_features'], value)}
                                hint="Soronkent egy címke."
                            />
                            <TextareaField
                                label="Második feature sor"
                                value={form.data.content.hero.secondary_features.join('\n')}
                                onChange={(value) => updateStringList(['hero', 'secondary_features'], value)}
                                hint="Soronkent egy címke."
                            />
                        </div>

                        <ImageUploadCard
                            label="Hero kép feltöltése"
                            previewUrl={form.data.content.hero.image_url || form.data.content.hero.image_path}
                            file={form.data.hero_image}
                            onChange={(file) =>
                                form.setData((data) => ({
                                    ...data,
                                    hero_image: file,
                                }))
                            }
                        />
                    </div>
                </SectionCard>

                <SectionCard
                    title="Mi az a Selfiebox"
                    description="Bemutatkozó szekció szövegei és az információs kártyák."
                >
                    <div className="space-y-5">
                        <TextField
                            label="Szekció cím"
                            value={form.data.content.what.title}
                            onChange={(value) => updateContent(['what', 'title'], value)}
                        />
                        <TextareaField
                            label="Első bekezdés"
                            value={form.data.content.what.paragraph_1}
                            onChange={(value) => updateContent(['what', 'paragraph_1'], value)}
                        />
                        <TextareaField
                            label="Második bekezdés"
                            value={form.data.content.what.paragraph_2}
                            onChange={(value) => updateContent(['what', 'paragraph_2'], value)}
                        />

                        <div className="grid gap-5 md:grid-cols-2">
                            {form.data.content.what.features.map((feature, index) => (
                                <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="mb-4 text-xs uppercase tracking-[0.28em] text-slate-500">
                                        Információs kártya {index + 1}
                                    </p>
                                    <div className="space-y-4">
                                        <TextField
                                            label="Cím"
                                            value={feature.title}
                                            onChange={(value) =>
                                                updateContent(['what', 'features', index, 'title'], value)
                                            }
                                        />
                                        <TextareaField
                                            label="Leírás"
                                            value={feature.description}
                                            onChange={(value) =>
                                                updateContent(['what', 'features', index, 'description'], value)
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionCard>

                <SectionCard
                    title="Galéria szekció"
                    description="A galéria képei külön adminból kezelhetők, itt csak a szekció feliratai módosíthatók."
                    action={
                        <Link
                            href={route('admin.gallery.index')}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-cyan-400 hover:text-slate-900"
                        >
                            Galéria megnyitása
                        </Link>
                    }
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        <TextField
                            label="Cím"
                            value={form.data.content.gallery.title}
                            onChange={(value) => updateContent(['gallery', 'title'], value)}
                        />
                        <TextField
                            label="Fallback leírás"
                            value={form.data.content.gallery.fallback_description}
                            onChange={(value) =>
                                updateContent(['gallery', 'fallback_description'], value)
                            }
                        />
                        <TextareaField
                            label="Leírás"
                            value={form.data.content.gallery.description}
                            onChange={(value) => updateContent(['gallery', 'description'], value)}
                            className="md:col-span-2"
                        />
                    </div>
                </SectionCard>

                <SectionCard
                    title="Csomagok"
                    description="A három fő csomag és a digitális csomag teljes szövegezése szerkeszthető."
                >
                    <div className="space-y-5">
                        <div className="grid gap-5 md:grid-cols-2">
                            <TextField
                                label="Szekció cím"
                                value={form.data.content.packages.title}
                                onChange={(value) => updateContent(['packages', 'title'], value)}
                            />
                            <TextField
                                label="Kiemelt badge felirat"
                                value={form.data.content.packages.highlight_badge}
                                onChange={(value) =>
                                    updateContent(['packages', 'highlight_badge'], value)
                                }
                            />
                            <TextareaField
                                label="Szekció leírás"
                                value={form.data.content.packages.description}
                                onChange={(value) => updateContent(['packages', 'description'], value)}
                                className="md:col-span-2"
                            />
                        </div>

                        <div className="grid gap-5 xl:grid-cols-3">
                            {form.data.content.packages.items.map((item, index) => (
                                <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="mb-4 text-xs uppercase tracking-[0.28em] text-slate-500">
                                        Csomag {index + 1}
                                    </p>
                                    <div className="space-y-4">
                                        <TextField
                                            label="Név"
                                            value={item.name}
                                            onChange={(value) =>
                                                updateContent(['packages', 'items', index, 'name'], value)
                                            }
                                        />
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <TextField
                                                label="Ár"
                                                value={item.price}
                                                onChange={(value) =>
                                                    updateContent(['packages', 'items', index, 'price'], value)
                                                }
                                            />
                                            <TextField
                                                label="Időtartam"
                                                value={item.duration}
                                                onChange={(value) =>
                                                    updateContent(['packages', 'items', index, 'duration'], value)
                                                }
                                            />
                                        </div>
                                        <TextField
                                            label="CTA felirat"
                                            value={item.cta_label}
                                            onChange={(value) =>
                                                updateContent(['packages', 'items', index, 'cta_label'], value)
                                            }
                                        />
                                        <CheckboxField
                                            label="Kiemelt csomag"
                                            checked={item.highlighted}
                                            onChange={(checked) =>
                                                updateContent(['packages', 'items', index, 'highlighted'], checked)
                                            }
                                        />
                                        <TextareaField
                                            label="Tulajdonságok"
                                            value={item.features.join('\n')}
                                            onChange={(value) =>
                                                updateStringList(['packages', 'items', index, 'features'], value)
                                            }
                                            hint="Soronkent egy elem."
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-slate-500">
                                Digitális csomag
                            </p>
                            <div className="grid gap-5 md:grid-cols-2">
                                <TextField
                                    label="Név"
                                    value={form.data.content.packages.digital.name}
                                    onChange={(value) =>
                                        updateContent(['packages', 'digital', 'name'], value)
                                    }
                                />
                                <TextField
                                    label="CTA felirat"
                                    value={form.data.content.packages.digital.cta_label}
                                    onChange={(value) =>
                                        updateContent(['packages', 'digital', 'cta_label'], value)
                                    }
                                />
                                <TextField
                                    label="Ár"
                                    value={form.data.content.packages.digital.price}
                                    onChange={(value) =>
                                        updateContent(['packages', 'digital', 'price'], value)
                                    }
                                />
                                <TextField
                                    label="Időtartam"
                                    value={form.data.content.packages.digital.duration}
                                    onChange={(value) =>
                                        updateContent(['packages', 'digital', 'duration'], value)
                                    }
                                />
                                <TextField
                                    label="Megjegyzés"
                                    value={form.data.content.packages.digital.note}
                                    onChange={(value) =>
                                        updateContent(['packages', 'digital', 'note'], value)
                                    }
                                    className="md:col-span-2"
                                />
                                <TextareaField
                                    label="Tulajdonságok"
                                    value={form.data.content.packages.digital.features.join('\n')}
                                    onChange={(value) =>
                                        updateStringList(['packages', 'digital', 'features'], value)
                                    }
                                    hint="Soronkent egy elem."
                                    className="md:col-span-2"
                                />
                            </div>
                        </div>

                        <TextareaField
                            label="Egyedi ajánlat megjegyzés"
                            value={form.data.content.packages.custom_note}
                            onChange={(value) => updateContent(['packages', 'custom_note'], value)}
                        />
                    </div>
                </SectionCard>

                <SectionCard
                    title="Foglalás szekció"
                    description="Foglalási blokk címei, mezőfeliratai és gombszövegei."
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        <TextField
                            label="Cím"
                            value={form.data.content.booking.title}
                            onChange={(value) => updateContent(['booking', 'title'], value)}
                        />
                        <TextField
                            label="Dátum doboz címe"
                            value={form.data.content.booking.date_label}
                            onChange={(value) => updateContent(['booking', 'date_label'], value)}
                        />
                        <TextareaField
                            label="Leírás"
                            value={form.data.content.booking.description}
                            onChange={(value) => updateContent(['booking', 'description'], value)}
                            className="md:col-span-2"
                        />
                        <TextField
                            label="Űrlap címe"
                            value={form.data.content.booking.form_title}
                            onChange={(value) => updateContent(['booking', 'form_title'], value)}
                        />
                        <TextField
                            label="Összefoglaló cím"
                            value={form.data.content.booking.summary_title}
                            onChange={(value) => updateContent(['booking', 'summary_title'], value)}
                        />
                        <TextField
                            label="Név mező címkéje"
                            value={form.data.content.booking.name_label}
                            onChange={(value) => updateContent(['booking', 'name_label'], value)}
                        />
                        <TextField
                            label="Név placeholder"
                            value={form.data.content.booking.name_placeholder}
                            onChange={(value) =>
                                updateContent(['booking', 'name_placeholder'], value)
                            }
                        />
                        <TextField
                            label="Email mező címkéje"
                            value={form.data.content.booking.email_label}
                            onChange={(value) => updateContent(['booking', 'email_label'], value)}
                        />
                        <TextField
                            label="Email placeholder"
                            value={form.data.content.booking.email_placeholder}
                            onChange={(value) =>
                                updateContent(['booking', 'email_placeholder'], value)
                            }
                        />
                        <TextField
                            label="Küldés felirat"
                            value={form.data.content.booking.submit_label}
                            onChange={(value) => updateContent(['booking', 'submit_label'], value)}
                        />
                        <TextField
                            label="Küldés folyamatban felirat"
                            value={form.data.content.booking.submitting_label}
                            onChange={(value) =>
                                updateContent(['booking', 'submitting_label'], value)
                            }
                        />
                        <TextareaField
                            label="Összefoglaló megjegyzés"
                            value={form.data.content.booking.summary_note}
                            onChange={(value) => updateContent(['booking', 'summary_note'], value)}
                            className="md:col-span-2"
                        />
                    </div>
                </SectionCard>

                <SectionCard
                    title="Háttér szekció"
                    description="A szekció szövegei és a háttérképek egyenként szerkeszthetők."
                    action={
                        <button
                            type="button"
                            onClick={addBackgroundItem}
                            className="rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-700 transition hover:border-cyan-400 hover:bg-cyan-100"
                        >
                            Új háttér hozzáadása
                        </button>
                    }
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        <TextField
                            label="Cím"
                            value={form.data.content.backgrounds.title}
                            onChange={(value) => updateContent(['backgrounds', 'title'], value)}
                        />
                        <TextField
                            label="CTA gomb"
                            value={form.data.content.backgrounds.cta_button_label}
                            onChange={(value) =>
                                updateContent(['backgrounds', 'cta_button_label'], value)
                            }
                        />
                        <TextField
                            label="Leírás"
                            value={form.data.content.backgrounds.description}
                            onChange={(value) =>
                                updateContent(['backgrounds', 'description'], value)
                            }
                        />
                        <TextField
                            label="CTA szöveg"
                            value={form.data.content.backgrounds.cta_text}
                            onChange={(value) => updateContent(['backgrounds', 'cta_text'], value)}
                        />
                    </div>

                    <div className="mt-5 grid gap-5 xl:grid-cols-2">
                        {form.data.content.backgrounds.items.map((item, index) => (
                            <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <div className="mb-4 flex items-center justify-between gap-3">
                                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                                        Háttér {index + 1}
                                    </p>
                                    <button
                                        type="button"
                                        disabled={form.data.content.backgrounds.items.length <= 1}
                                        onClick={() => removeBackgroundItem(index)}
                                        className="rounded-lg border border-rose-200 bg-white px-3 py-2 text-xs font-medium text-rose-600 transition hover:border-rose-300 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Törlés
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <TextField
                                        label="Megnevezés"
                                        value={item.label}
                                        onChange={(value) =>
                                            updateContent(['backgrounds', 'items', index, 'label'], value)
                                        }
                                    />
                                    <TextField
                                        label="Kép URL vagy tárolt útvonal"
                                        value={item.image_path}
                                        onChange={(value) =>
                                            updateContent(
                                                ['backgrounds', 'items', index, 'image_path'],
                                                value,
                                            )
                                        }
                                    />
                                    <ImageUploadCard
                                        label="Új háttérkép feltöltése"
                                        previewUrl={item.image_url || item.image_path}
                                        file={form.data.background_images[index]}
                                        isUploading={uploadingBackgroundImages[index] ?? false}
                                        error={backgroundUploadErrors[index]}
                                        onChange={(file) => void uploadBackgroundImage(index, file)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                <SectionCard
                    title="Kapcsolat"
                    description="Kapcsolati blokk és űrlap szövegei."
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        <TextField
                            label="Cím"
                            value={form.data.content.contact.title}
                            onChange={(value) => updateContent(['contact', 'title'], value)}
                        />
                        <TextField
                            label="Információs doboz címe"
                            value={form.data.content.contact.info_title}
                            onChange={(value) => updateContent(['contact', 'info_title'], value)}
                        />
                        <TextareaField
                            label="Szekció leírás"
                            value={form.data.content.contact.description}
                            onChange={(value) => updateContent(['contact', 'description'], value)}
                            className="md:col-span-2"
                        />
                        <TextareaField
                            label="Információs doboz leírás"
                            value={form.data.content.contact.info_description}
                            onChange={(value) =>
                                updateContent(['contact', 'info_description'], value)
                            }
                            className="md:col-span-2"
                        />
                        <TextField
                            label="Telefon címke"
                            value={form.data.content.contact.phone_label}
                            onChange={(value) => updateContent(['contact', 'phone_label'], value)}
                        />
                        <TextField
                            label="Telefon érték"
                            value={form.data.content.contact.phone_value}
                            onChange={(value) => updateContent(['contact', 'phone_value'], value)}
                        />
                        <TextField
                            label="Email címke"
                            value={form.data.content.contact.email_label}
                            onChange={(value) => updateContent(['contact', 'email_label'], value)}
                        />
                        <TextField
                            label="Email érték"
                            value={form.data.content.contact.email_value}
                            onChange={(value) => updateContent(['contact', 'email_value'], value)}
                        />
                        <TextField
                            label="Kiszállási helyek címke"
                            value={form.data.content.contact.location_label}
                            onChange={(value) =>
                                updateContent(['contact', 'location_label'], value)
                            }
                        />
                        <TextareaField
                            label="Kiszállási helyek"
                            value={form.data.content.contact.location_value}
                            onChange={(value) =>
                                updateContent(['contact', 'location_value'], value)
                            }
                            hint="Soronként egy vármegyét vagy kiszállási területet adj meg."
                        />
                    </div>

                    <div className="mt-5 grid gap-5 md:grid-cols-2">
                        <TextField
                            label="Űrlap név címke"
                            value={form.data.content.contact.form.name_label}
                            onChange={(value) =>
                                updateContent(['contact', 'form', 'name_label'], value)
                            }
                        />
                        <TextField
                            label="Űrlap név placeholder"
                            value={form.data.content.contact.form.name_placeholder}
                            onChange={(value) =>
                                updateContent(['contact', 'form', 'name_placeholder'], value)
                            }
                        />
                        <TextField
                            label="Űrlap email címke"
                            value={form.data.content.contact.form.email_label}
                            onChange={(value) =>
                                updateContent(['contact', 'form', 'email_label'], value)
                            }
                        />
                        <TextField
                            label="Űrlap email placeholder"
                            value={form.data.content.contact.form.email_placeholder}
                            onChange={(value) =>
                                updateContent(['contact', 'form', 'email_placeholder'], value)
                            }
                        />
                        <TextField
                            label="Űrlap üzenet címke"
                            value={form.data.content.contact.form.message_label}
                            onChange={(value) =>
                                updateContent(['contact', 'form', 'message_label'], value)
                            }
                        />
                        <TextField
                            label="Űrlap CTA"
                            value={form.data.content.contact.form.submit_label}
                            onChange={(value) =>
                                updateContent(['contact', 'form', 'submit_label'], value)
                            }
                        />
                        <TextField
                            label="Űrlap folyamatban felirat"
                            value={form.data.content.contact.form.submitting_label}
                            onChange={(value) =>
                                updateContent(['contact', 'form', 'submitting_label'], value)
                            }
                        />
                        <TextareaField
                            label="Űrlap üzenet placeholder"
                            value={form.data.content.contact.form.message_placeholder}
                            onChange={(value) =>
                                updateContent(['contact', 'form', 'message_placeholder'], value)
                            }
                            className="md:col-span-2"
                        />
                    </div>
                </SectionCard>

                <SectionCard
                    title="Lábléc"
                    description="Lábléc brand, kapcsolat és közösségi linkek."
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        <TextField
                            label="Márkanév első része"
                            value={form.data.content.footer.brand_text}
                            onChange={(value) => updateContent(['footer', 'brand_text'], value)}
                        />
                        <TextField
                            label="Márkanév második része"
                            value={form.data.content.footer.brand_accent}
                            onChange={(value) => updateContent(['footer', 'brand_accent'], value)}
                        />
                        <TextareaField
                            label="Leírás"
                            value={form.data.content.footer.description}
                            onChange={(value) => updateContent(['footer', 'description'], value)}
                            className="md:col-span-2"
                        />
                        <TextField
                            label="Gyors linkek cím"
                            value={form.data.content.footer.quick_links_title}
                            onChange={(value) =>
                                updateContent(['footer', 'quick_links_title'], value)
                            }
                        />
                        <TextField
                            label="Kapcsolat cím"
                            value={form.data.content.footer.contact_title}
                            onChange={(value) =>
                                updateContent(['footer', 'contact_title'], value)
                            }
                        />
                        <TextField
                            label="Social cím"
                            value={form.data.content.footer.social_title}
                            onChange={(value) => updateContent(['footer', 'social_title'], value)}
                        />
                        <TextField
                            label="Telefon"
                            value={form.data.content.footer.phone}
                            onChange={(value) => updateContent(['footer', 'phone'], value)}
                        />
                        <TextField
                            label="Email"
                            value={form.data.content.footer.email}
                            onChange={(value) => updateContent(['footer', 'email'], value)}
                        />
                        <TextField
                            label="Facebook URL"
                            value={form.data.content.footer.facebook_url}
                            onChange={(value) =>
                                updateContent(['footer', 'facebook_url'], value)
                            }
                        />
                        <TextField
                            label="Instagram URL"
                            value={form.data.content.footer.instagram_url}
                            onChange={(value) =>
                                updateContent(['footer', 'instagram_url'], value)
                            }
                        />
                        <TextField
                            label="Copyright"
                            value={form.data.content.footer.copyright}
                            onChange={(value) => updateContent(['footer', 'copyright'], value)}
                            className="md:col-span-2"
                        />
                    </div>
                </SectionCard>

                {Object.keys(form.errors).length > 0 ? (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        Mentés előtt ellenőrizd a kötelező mezőket és a feltöltött képeket.
                    </div>
                ) : null}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={form.processing || isUploadingBackgroundImage}
                        className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {form.processing
                            ? 'Mentés...'
                            : isUploadingBackgroundImage
                                ? 'Kép feltöltése...'
                                : 'Tartalom mentése'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}

function SectionCard({
    title,
    description,
    action,
    children,
}: {
    title: string;
    description: string;
    action?: ReactNode;
    children: ReactNode;
}) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                        {description}
                    </p>
                </div>
                {action}
            </div>
            {children}
        </section>
    );
}

function TextField({
    label,
    value,
    onChange,
    className = '',
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
}) {
    return (
        <label className={`block ${className}`.trim()}>
            <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
            <input
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-0"
            />
        </label>
    );
}

function TextareaField({
    label,
    value,
    onChange,
    hint,
    className = '',
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    hint?: string;
    className?: string;
}) {
    return (
        <label className={`block ${className}`.trim()}>
            <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
            <textarea
                rows={4}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-0"
            />
            {hint ? <span className="mt-2 block text-xs text-slate-500">{hint}</span> : null}
        </label>
    );
}

function CheckboxField({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
            <input
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
                className="rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
            />
            {label}
        </label>
    );
}

function ImageUploadCard({
    label,
    previewUrl,
    file,
    isUploading = false,
    error,
    onChange,
}: {
    label: string;
    previewUrl?: string | null;
    file: File | null;
    isUploading?: boolean;
    error?: string;
    onChange: (file: File | null) => void;
}) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.files?.[0] ?? null);
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-sm font-medium text-slate-700">{label}</p>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {previewUrl ? (
                    <img src={previewUrl} alt={label} className="h-56 w-full object-cover" />
                ) : (
                    <div className="flex h-56 items-center justify-center px-6 text-center text-sm text-slate-500">
                        Nincs beállított kép.
                    </div>
                )}
            </div>

            <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-sm text-slate-700 transition hover:border-cyan-400">
                <span>{isUploading ? 'Feltöltés folyamatban...' : 'Új kép kiválasztása'}</span>
                <span className="text-xs text-slate-500">
                    PNG, JPG vagy WEBP, max 8 MB. Kiválasztás után azonnal feltöltődik.
                </span>
                <span className="text-xs text-cyan-600">
                    {isUploading ? file?.name : file ? `${file.name} feltöltve` : 'Még nincs új fájl kiválasztva'}
                </span>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isUploading}
                    onChange={handleChange}
                />
            </label>
            {error ? <p className="mt-2 text-xs text-rose-600">{error}</p> : null}
        </div>
    );
}

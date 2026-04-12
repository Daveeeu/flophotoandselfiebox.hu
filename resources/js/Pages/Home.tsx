import type { PageProps } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useEffect } from 'react';
import { showToast } from '@/lib/toast';
import LandingApp from '../../../src/app/App';
import type { SiteContent } from '../../../src/app/site-content';

type GalleryImage = {
    id: number;
    title: string;
    category: string | null;
    description: string | null;
    alt_text: string | null;
    image_url: string;
};

type HomeProps = {
    galleryImages: GalleryImage[];
    appUrl: string;
    siteContent: SiteContent;
};

type ContactFormData = {
    name: string;
    email: string;
    message: string;
};

type BookingFormData = {
    name: string;
    email: string;
    event_date: string;
};

export default function Home({ galleryImages, appUrl, siteContent }: HomeProps) {
    const { flash } = usePage<PageProps>().props;
    const contactForm = useForm<ContactFormData>({
        name: '',
        email: '',
        message: '',
    });
    const bookingForm = useForm<BookingFormData>({
        name: '',
        email: '',
        event_date: '',
    });

    useEffect(() => {
        if (flash.success) {
            showToast('success', flash.success);
        }

        if (flash.error) {
            showToast('error', flash.error);
        }
    }, [flash.error, flash.success]);

    const canonicalUrl = `${appUrl}/`;
    const seo = siteContent.seo;
    const heroImage = siteContent.hero.image_url || siteContent.hero.image_path;
    const ogImage = seo.og_image_url || seo.og_image_path || heroImage;
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'LocalBusiness',
                name: `${siteContent.header.brand_text}${siteContent.header.brand_accent}`,
                image: ogImage,
                url: canonicalUrl,
                email: siteContent.contact.email_value,
                telephone: siteContent.contact.phone_value,
                description: seo.meta_description,
                areaServed: 'HU',
                address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'HU',
                    addressLocality: 'Szerencs',
                },
                sameAs: [siteContent.footer.facebook_url, siteContent.footer.instagram_url].filter(Boolean),
            },
            {
                '@type': 'Service',
                serviceType: 'Selfiebox kölcsönzés',
                provider: {
                    '@type': 'LocalBusiness',
                    name: `${siteContent.header.brand_text}${siteContent.header.brand_accent}`,
                    url: canonicalUrl,
                },
                areaServed: 'HU',
                description: seo.meta_description,
            },
            {
                '@type': 'WebSite',
                name: `${siteContent.header.brand_text}${siteContent.header.brand_accent}`,
                url: canonicalUrl,
                inLanguage: 'hu-HU',
            },
        ],
    };

    return (
        <>
            <Head title={seo.meta_title}>
                <html lang="hu-HU" />
                <meta name="description" content={seo.meta_description} />
                <meta name="keywords" content={seo.meta_keywords} />
                <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
                <link rel="canonical" href={canonicalUrl} />

                <meta property="og:type" content="website" />
                <meta property="og:locale" content="hu_HU" />
                <meta property="og:site_name" content={`${siteContent.header.brand_text}${siteContent.header.brand_accent}`} />
                <meta property="og:title" content={seo.og_title} />
                <meta property="og:description" content={seo.og_description} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:image:alt" content={seo.og_image_alt} />

                <meta name="twitter:card" content={seo.twitter_card} />
                <meta name="twitter:title" content={seo.og_title} />
                <meta name="twitter:description" content={seo.og_description} />
                <meta name="twitter:image" content={ogImage} />

                <link rel="alternate" hrefLang="hu-HU" href={canonicalUrl} />
                <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Head>

            <LandingApp
                galleryImages={galleryImages}
                siteContent={siteContent}
                contact={{
                    data: contactForm.data,
                    errors: contactForm.errors,
                    processing: contactForm.processing,
                    onChange: (field: keyof ContactFormData, value: string) =>
                        contactForm.setData(field, value),
                    onSubmit: (event: FormEvent<HTMLFormElement>) => {
                        event.preventDefault();

                        contactForm.transform((data) => ({
                            ...data,
                            subject: 'Kapcsolatfelvétel',
                        }));
                        contactForm.post(route('contact.store'), {
                            preserveScroll: true,
                            onSuccess: () => contactForm.reset(),
                        });
                    },
                }}
                booking={{
                    data: bookingForm.data,
                    errors: bookingForm.errors,
                    processing: bookingForm.processing,
                    onChange: (field: keyof BookingFormData, value: string) =>
                        bookingForm.setData(field, value),
                    onSubmit: (event: FormEvent<HTMLFormElement>) => {
                        event.preventDefault();

                        bookingForm.transform((data) => ({
                            ...data,
                            event_type: 'Általános érdeklődés',
                            event_location: 'Egyeztetés alatt',
                        }));
                        bookingForm.post(route('booking.store'), {
                            preserveScroll: true,
                            onSuccess: () => bookingForm.reset(),
                        });
                    },
                }}
            />
        </>
    );
}

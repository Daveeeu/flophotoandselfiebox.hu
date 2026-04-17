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

export default function Home({ galleryImages, siteContent }: HomeProps) {
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

    const seo = siteContent.seo;

    return (
        <>
            <Head title={seo.meta_title} />

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

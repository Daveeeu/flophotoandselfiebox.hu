import type { FormEvent } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhatIsSelfieBox } from './components/WhatIsSelfieBox';
import { AiSelfie } from './components/AiSelfie';
import { Gallery } from './components/Gallery';
import { Packages } from './components/Packages';
import { Booking } from './components/Booking';
import { Backgrounds } from './components/Backgrounds';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import type { SiteContent } from './site-content';

type GalleryImage = {
  image_url: string;
  alt_text?: string | null;
  title: string;
  description?: string | null;
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

type AppProps = {
  galleryImages: GalleryImage[];
  siteContent: SiteContent;
  contact: {
    data: ContactFormData;
    errors: Partial<Record<keyof ContactFormData, string>>;
    processing: boolean;
    onChange: (field: keyof ContactFormData, value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  };
  booking: {
    data: BookingFormData;
    errors: Partial<Record<keyof BookingFormData, string>>;
    processing: boolean;
    onChange: (field: keyof BookingFormData, value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  };
};

export default function App({ galleryImages, siteContent, contact, booking }: AppProps) {
  return (
    <div className="min-h-screen">
      <Header content={siteContent.header} />
      
      <main>
        <section id="hero">
          <Hero content={siteContent.hero} />
        </section>

        <section id="what">
          <WhatIsSelfieBox content={siteContent.what} />
        </section>

        <section id="ai-selfie">
          <AiSelfie content={siteContent.ai_selfie} />
        </section>

        <section id="gallery">
          <Gallery content={siteContent.gallery} images={galleryImages} />
        </section>

        <section id="packages">
          <Packages content={siteContent.packages} />
        </section>

        <section id="booking">
          <Booking content={siteContent.booking} {...booking} />
        </section>

        <section id="backgrounds">
          <Backgrounds content={siteContent.backgrounds} />
        </section>

        <section id="contact">
          <Contact content={siteContent.contact} {...contact} />
        </section>
      </main>

      <Footer headerNavLabels={siteContent.header.nav_labels} content={siteContent.footer} />
    </div>
  );
}

export type SiteContent = {
  header: {
    brand_text: string;
    brand_accent: string;
    cta_label: string;
    nav_labels: string[];
  };
  hero: {
    image_path: string;
    image_url?: string | null;
    image_alt: string;
    title_prefix: string;
    title_highlight: string;
    subtitle: string;
    primary_features: string[];
    secondary_features: string[];
    primary_cta_label: string;
    secondary_cta_label: string;
  };
  seo: {
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    og_title: string;
    og_description: string;
    og_image_path: string;
    og_image_url?: string | null;
    og_image_alt: string;
    twitter_card: 'summary' | 'summary_large_image';
  };
  what: {
    title: string;
    paragraph_1: string;
    paragraph_2: string;
    features: Array<{
      title: string;
      description: string;
    }>;
  };
  ai_selfie: {
    title: string;
    lead: string;
    how_title: string;
    how_paragraphs: string[];
    characters_title: string;
    characters_note: string;
    price_note: string;
    characters: Array<{
      label: string;
      image_path: string;
      image_url?: string | null;
    }>;
  };
  gallery: {
    title: string;
    description: string;
    fallback_description: string;
  };
  packages: {
    title: string;
    description: string;
    highlight_badge: string;
    items: Array<{
      name: string;
      price: string;
      duration: string;
      features: string[];
      cta_label: string;
      highlighted: boolean;
    }>;
    digital: {
      name: string;
      price: string;
      duration: string;
      features: string[];
      note: string;
      cta_label: string;
    };
    custom_note: string;
  };
  booking: {
    title: string;
    description: string;
    date_label: string;
    form_title: string;
    name_label: string;
    name_placeholder: string;
    email_label: string;
    email_placeholder: string;
    summary_title: string;
    summary_note: string;
    submit_label: string;
    submitting_label: string;
  };
  backgrounds: {
    title: string;
    description: string;
    cta_text: string;
    cta_button_label: string;
    items: Array<{
      label: string;
      image_path: string;
      image_url?: string | null;
    }>;
  };
  contact: {
    title: string;
    description: string;
    info_title: string;
    info_description: string;
    phone_label: string;
    phone_value: string;
    email_label: string;
    email_value: string;
    location_label: string;
    location_value: string;
    form: {
      name_label: string;
      name_placeholder: string;
      email_label: string;
      email_placeholder: string;
      message_label: string;
      message_placeholder: string;
      submit_label: string;
      submitting_label: string;
    };
  };
  footer: {
    brand_text: string;
    brand_accent: string;
    description: string;
    quick_links_title: string;
    contact_title: string;
    social_title: string;
    phone: string;
    email: string;
    facebook_url: string;
    instagram_url: string;
    copyright: string;
  };
};

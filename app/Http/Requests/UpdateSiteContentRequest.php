<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSiteContentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'content' => ['required', 'array'],

            'content.header.brand_text' => ['required', 'string', 'max:80'],
            'content.header.brand_accent' => ['required', 'string', 'max:80'],
            'content.header.cta_label' => ['required', 'string', 'max:120'],
            'content.header.nav_labels' => ['required', 'array', 'size:7'],
            'content.header.nav_labels.*' => ['required', 'string', 'max:120'],

            'content.hero.image_path' => ['nullable', 'string', 'max:2000'],
            'content.hero.image_alt' => ['required', 'string', 'max:180'],
            'content.hero.title_prefix' => ['required', 'string', 'max:160'],
            'content.hero.title_highlight' => ['required', 'string', 'max:160'],
            'content.hero.subtitle' => ['required', 'string', 'max:240'],
            'content.hero.primary_features' => ['required', 'array', 'size:4'],
            'content.hero.primary_features.*' => ['required', 'string', 'max:120'],
            'content.hero.secondary_features' => ['required', 'array', 'size:3'],
            'content.hero.secondary_features.*' => ['required', 'string', 'max:120'],
            'content.hero.primary_cta_label' => ['required', 'string', 'max:120'],
            'content.hero.secondary_cta_label' => ['required', 'string', 'max:120'],
            'hero_image' => ['nullable', 'image', 'max:8192'],

            'content.seo.meta_title' => ['required', 'string', 'max:160'],
            'content.seo.meta_description' => ['required', 'string', 'max:320'],
            'content.seo.meta_keywords' => ['nullable', 'string', 'max:500'],
            'content.seo.og_title' => ['required', 'string', 'max:160'],
            'content.seo.og_description' => ['required', 'string', 'max:320'],
            'content.seo.og_image_path' => ['nullable', 'string', 'max:2000'],
            'content.seo.og_image_alt' => ['required', 'string', 'max:180'],
            'content.seo.twitter_card' => ['required', 'string', 'in:summary,summary_large_image'],
            'seo_og_image' => ['nullable', 'image', 'max:8192'],

            'content.what.title' => ['required', 'string', 'max:160'],
            'content.what.paragraph_1' => ['required', 'string', 'max:2000'],
            'content.what.paragraph_2' => ['required', 'string', 'max:2000'],
            'content.what.features' => ['required', 'array', 'size:4'],
            'content.what.features.*.title' => ['required', 'string', 'max:160'],
            'content.what.features.*.description' => ['required', 'string', 'max:500'],

            'content.ai_selfie.title' => ['required', 'string', 'max:160'],
            'content.ai_selfie.lead' => ['required', 'string', 'max:400'],
            'content.ai_selfie.how_title' => ['required', 'string', 'max:160'],
            'content.ai_selfie.how_paragraphs' => ['required', 'array', 'min:1'],
            'content.ai_selfie.how_paragraphs.*' => ['required', 'string', 'max:2000'],
            'content.ai_selfie.characters_title' => ['required', 'string', 'max:160'],
            'content.ai_selfie.characters_note' => ['required', 'string', 'max:240'],
            'content.ai_selfie.price_note' => ['required', 'string', 'max:240'],
            'content.ai_selfie.characters' => ['required', 'array', 'min:1'],
            'content.ai_selfie.characters.*.label' => ['required', 'string', 'max:120'],
            'content.ai_selfie.characters.*.image_path' => ['nullable', 'string', 'max:2000'],
            'ai_character_images' => ['nullable', 'array'],
            'ai_character_images.*' => ['nullable', 'image', 'max:8192'],

            'content.gallery.title' => ['required', 'string', 'max:160'],
            'content.gallery.description' => ['required', 'string', 'max:500'],
            'content.gallery.fallback_description' => ['required', 'string', 'max:300'],

            'content.packages.title' => ['required', 'string', 'max:160'],
            'content.packages.description' => ['required', 'string', 'max:300'],
            'content.packages.highlight_badge' => ['required', 'string', 'max:120'],
            'content.packages.items' => ['required', 'array', 'size:3'],
            'content.packages.items.*.name' => ['required', 'string', 'max:120'],
            'content.packages.items.*.price' => ['required', 'string', 'max:80'],
            'content.packages.items.*.duration' => ['required', 'string', 'max:80'],
            'content.packages.items.*.features' => ['required', 'array', 'min:1'],
            'content.packages.items.*.features.*' => ['required', 'string', 'max:160'],
            'content.packages.items.*.cta_label' => ['required', 'string', 'max:120'],
            'content.packages.items.*.highlighted' => ['required', 'boolean'],
            'content.packages.digital.name' => ['required', 'string', 'max:120'],
            'content.packages.digital.price' => ['required', 'string', 'max:80'],
            'content.packages.digital.duration' => ['required', 'string', 'max:80'],
            'content.packages.digital.features' => ['required', 'array', 'min:1'],
            'content.packages.digital.features.*' => ['required', 'string', 'max:160'],
            'content.packages.digital.note' => ['required', 'string', 'max:200'],
            'content.packages.digital.cta_label' => ['required', 'string', 'max:120'],
            'content.packages.custom_note' => ['required', 'string', 'max:300'],

            'content.booking.title' => ['required', 'string', 'max:160'],
            'content.booking.description' => ['required', 'string', 'max:400'],
            'content.booking.date_label' => ['required', 'string', 'max:120'],
            'content.booking.form_title' => ['required', 'string', 'max:120'],
            'content.booking.name_label' => ['required', 'string', 'max:120'],
            'content.booking.name_placeholder' => ['required', 'string', 'max:160'],
            'content.booking.email_label' => ['required', 'string', 'max:120'],
            'content.booking.email_placeholder' => ['required', 'string', 'max:160'],
            'content.booking.summary_title' => ['required', 'string', 'max:120'],
            'content.booking.summary_note' => ['required', 'string', 'max:240'],
            'content.booking.submit_label' => ['required', 'string', 'max:120'],
            'content.booking.submitting_label' => ['required', 'string', 'max:120'],

            'content.backgrounds.title' => ['required', 'string', 'max:160'],
            'content.backgrounds.description' => ['required', 'string', 'max:240'],
            'content.backgrounds.cta_text' => ['required', 'string', 'max:180'],
            'content.backgrounds.cta_button_label' => ['required', 'string', 'max:120'],
            'content.backgrounds.items' => ['required', 'array', 'min:1'],
            'content.backgrounds.items.*.label' => ['required', 'string', 'max:120'],
            'content.backgrounds.items.*.image_path' => ['nullable', 'string', 'max:2000'],
            'background_images' => ['nullable', 'array'],
            'background_images.*' => ['nullable', 'image', 'max:8192'],

            'content.contact.title' => ['required', 'string', 'max:160'],
            'content.contact.description' => ['required', 'string', 'max:400'],
            'content.contact.info_title' => ['required', 'string', 'max:160'],
            'content.contact.info_description' => ['required', 'string', 'max:500'],
            'content.contact.phone_label' => ['required', 'string', 'max:120'],
            'content.contact.phone_value' => ['required', 'string', 'max:160'],
            'content.contact.email_label' => ['required', 'string', 'max:120'],
            'content.contact.email_value' => ['required', 'string', 'max:160'],
            'content.contact.location_label' => ['required', 'string', 'max:120'],
            'content.contact.location_value' => ['required', 'string', 'max:200'],
            'content.contact.form.name_label' => ['required', 'string', 'max:120'],
            'content.contact.form.name_placeholder' => ['required', 'string', 'max:160'],
            'content.contact.form.email_label' => ['required', 'string', 'max:120'],
            'content.contact.form.email_placeholder' => ['required', 'string', 'max:160'],
            'content.contact.form.message_label' => ['required', 'string', 'max:120'],
            'content.contact.form.message_placeholder' => ['required', 'string', 'max:300'],
            'content.contact.form.submit_label' => ['required', 'string', 'max:120'],
            'content.contact.form.submitting_label' => ['required', 'string', 'max:120'],

            'content.footer.brand_text' => ['required', 'string', 'max:80'],
            'content.footer.brand_accent' => ['required', 'string', 'max:80'],
            'content.footer.description' => ['required', 'string', 'max:300'],
            'content.footer.quick_links_title' => ['required', 'string', 'max:120'],
            'content.footer.contact_title' => ['required', 'string', 'max:120'],
            'content.footer.social_title' => ['required', 'string', 'max:120'],
            'content.footer.phone' => ['required', 'string', 'max:160'],
            'content.footer.email' => ['required', 'string', 'max:160'],
            'content.footer.facebook_url' => ['nullable', 'string', 'max:2000'],
            'content.footer.instagram_url' => ['nullable', 'string', 'max:2000'],
            'content.footer.copyright' => ['required', 'string', 'max:180'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $content = $this->input('content', []);

        foreach (data_get($content, 'packages.items', []) as $index => $package) {
            data_set(
                $content,
                "packages.items.{$index}.highlighted",
                filter_var($package['highlighted'] ?? false, FILTER_VALIDATE_BOOL),
            );
        }

        $this->merge([
            'content' => $content,
        ]);
    }
}

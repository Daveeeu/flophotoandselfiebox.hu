import type { FormEvent } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { SiteContent } from '../site-content';

type ContactProps = {
  content: SiteContent['contact'];
  data: {
    name: string;
    email: string;
    message: string;
  };
  errors: Partial<Record<'name' | 'email' | 'message', string>>;
  processing: boolean;
  onChange: (field: 'name' | 'email' | 'message', value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function Contact({ content, data, errors, processing, onChange, onSubmit }: ContactProps) {

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl !font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl !font-bold text-gray-900 mb-6">
                {content.info_title}
              </h3>
              <p className="text-gray-600 mb-8">
                {content.info_description}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h4 className="!font-semibold text-gray-900 mb-1">{content.phone_label}</h4>
                  <p className="text-gray-600">{content.phone_value}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h4 className="!font-semibold text-gray-900 mb-1">{content.email_label}</h4>
                  <p className="text-gray-600">{content.email_value}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h4 className="!font-semibold text-gray-900 mb-1">{content.location_label}</h4>
                  <p className="whitespace-pre-line text-gray-600">{content.location_value}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="backdrop-blur-lg bg-gradient-to-br from-gray-50/90 to-white/90 p-8 rounded-3xl shadow-lg border border-white/50">
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm !font-medium text-gray-700 mb-2">
                  {content.form.name_label}
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder={content.form.name_placeholder}
                  value={data.name}
                  onChange={(e) => onChange('name', e.target.value)}
                  className="w-full px-4 py-6 rounded-xl border-gray-200 focus:border-cyan-500 focus:ring-cyan-500"
                  required
                />
                {errors.name ? <p className="mt-2 text-sm text-rose-500">{errors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm !font-medium text-gray-700 mb-2">
                  {content.form.email_label}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={content.form.email_placeholder}
                  value={data.email}
                  onChange={(e) => onChange('email', e.target.value)}
                  className="w-full px-4 py-6 rounded-xl border-gray-200 focus:border-cyan-500 focus:ring-cyan-500"
                  required
                />
                {errors.email ? <p className="mt-2 text-sm text-rose-500">{errors.email}</p> : null}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm !font-medium text-gray-700 mb-2">
                  {content.form.message_label}
                </label>
                <Textarea
                  id="message"
                  placeholder={content.form.message_placeholder}
                  rows={5}
                  value={data.message}
                  onChange={(e) => onChange('message', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-cyan-500 focus:ring-cyan-500 resize-none"
                  required
                />
                {errors.message ? <p className="mt-2 text-sm text-rose-500">{errors.message}</p> : null}
              </div>

              <Button
                type="submit"
                disabled={processing}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-6 rounded-xl !font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                {processing ? content.form.submitting_label : content.form.submit_label}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

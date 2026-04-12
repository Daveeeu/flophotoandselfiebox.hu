import type { FormEvent } from 'react';
import type { SelectSingleEventHandler } from 'react-day-picker';
import { Calendar } from './ui/calendar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CalendarDays } from 'lucide-react';
import type { SiteContent } from '../site-content';

type BookingProps = {
  content: SiteContent['booking'];
  data: {
    name: string;
    email: string;
    event_date: string;
  };
  errors: Partial<Record<'name' | 'email' | 'event_date', string>>;
  processing: boolean;
  onChange: (field: 'name' | 'email' | 'event_date', value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function Booking({ content, data, errors, processing, onChange, onSubmit }: BookingProps) {
  const selectedDate = data.event_date ? new Date(`${data.event_date}T00:00:00`) : undefined;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleSelect: SelectSingleEventHandler = (date) => {
    if (!date) {
      onChange('event_date', '');
      return;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    onChange('event_date', `${year}-${month}-${day}`);
  };

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-gray-50"></div>
      
      {/* Decorative blurred circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-300 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full opacity-15 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl !font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        {/* Glassmorphism Card */}
        <div className="max-w-5xl mx-auto backdrop-blur-xl bg-white/60 rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12">
          <form onSubmit={onSubmit}>
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Date & Time Selection */}
              <div className="space-y-8">
                {/* Calendar */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CalendarDays className="w-5 h-5 text-cyan-600" />
                    <h3 className="text-xl !font-semibold text-gray-900">{content.date_label}</h3>
                  </div>
                  <div className="backdrop-blur-md bg-white/80 rounded-2xl p-4 border border-white/50 shadow-lg">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleSelect}
                      disabled={(date: Date) => date < today}
                      className="mx-auto"
                    />
                  </div>
                  {errors.event_date ? <p className="mt-3 text-sm text-rose-500">{errors.event_date}</p> : null}
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="flex flex-col justify-between">
                <div className="space-y-6">
                  <h3 className="text-xl !font-semibold text-gray-900 mb-6">
                    {content.form_title}
                  </h3>

                  <div>
                    <label htmlFor="booking-name" className="block text-sm !font-medium text-gray-700 mb-2">
                      {content.name_label}
                    </label>
                    <Input
                      id="booking-name"
                      type="text"
                      placeholder={content.name_placeholder}
                      value={data.name}
                      onChange={(e) => onChange('name', e.target.value)}
                      className="backdrop-blur-md bg-white/80 border-white/50 px-4 py-6 rounded-xl focus:border-cyan-500 focus:ring-cyan-500"
                      required
                    />
                    {errors.name ? <p className="mt-2 text-sm text-rose-500">{errors.name}</p> : null}
                  </div>

                  <div>
                    <label htmlFor="booking-email" className="block text-sm !font-medium text-gray-700 mb-2">
                      {content.email_label}
                    </label>
                    <Input
                      id="booking-email"
                      type="email"
                      placeholder={content.email_placeholder}
                      value={data.email}
                      onChange={(e) => onChange('email', e.target.value)}
                      className="backdrop-blur-md bg-white/80 border-white/50 px-4 py-6 rounded-xl focus:border-cyan-500 focus:ring-cyan-500"
                      required
                    />
                    {errors.email ? <p className="mt-2 text-sm text-rose-500">{errors.email}</p> : null}
                  </div>

                  {/* Summary */}
                  {selectedDate && (
                    <div className="backdrop-blur-md bg-cyan-50/50 rounded-xl p-6 border border-cyan-200/50">
                      <h4 className="!font-semibold text-gray-900 mb-3">{content.summary_title}</h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        {selectedDate && (
                          <p>
                            <span className="!font-medium">Dátum:</span>{' '}
                            {selectedDate.toLocaleDateString('hu-HU', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        )}
                        <p>
                          {content.summary_note}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white py-7 rounded-xl !font-bold text-lg shadow-xl hover:shadow-2xl transition-all mt-8"
                >
                  {processing ? content.submitting_label : content.submit_label}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

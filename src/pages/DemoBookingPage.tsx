import BookingForm from '../components/BookingForm';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Internal demo-only booking flow. Saves to localStorage. Not linked from
 * public navigation. Real bookings are made through Google Calendar — see
 * `BookingPage` and `bookingUrl` in `src/data/siteConfig.ts`.
 */
export default function DemoBookingPage() {
  const { t } = useLanguage();

  return (
    <div className="container-page section">
      <header className="mb-8 max-w-2xl">
        <span className="eyebrow mb-3">demo</span>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-3 tracking-tight">
          {t('booking.title')}
        </h1>
        <p className="text-slate-600">{t('demoBooking.note')}</p>
      </header>
      <BookingForm />
    </div>
  );
}

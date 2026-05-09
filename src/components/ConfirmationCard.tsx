import { Link } from 'react-router-dom';
import BookingButton from './BookingButton';
import { useLanguage } from '../contexts/LanguageContext';
import type { Booking } from '../types';
import { describeInstant } from '../utils/timeSlots';

interface Props {
  booking: Booking;
}

export default function ConfirmationCard({ booking }: Props) {
  const { t } = useLanguage();
  const times = resolveBookingTimes(booking, t);

  const rows: { label: string; value: string }[] = [
    { label: t('confirm.bookingId'), value: booking.id },
    { label: t('confirm.subject'), value: t(`subject.${booking.subject}`) },
    { label: t('confirm.topic'), value: t(`topic.${booking.topic}.title`) },
    { label: t('confirm.lessonType'), value: t(`lessonType.${booking.lessonType}`) },
    {
      label: t('confirm.duration'),
      value: `${booking.duration} ${t('common.minutes')}`,
    },
    { label: t('confirm.level'), value: t(`level.${booking.studentLevel}`) },
    { label: t('confirm.fullName'), value: booking.fullName },
    { label: t('confirm.phone'), value: booking.phone },
    { label: t('confirm.email'), value: booking.email },
  ];
  if (booking.notes) {
    rows.push({ label: t('confirm.notes'), value: booking.notes });
  }

  return (
    <div className="card relative overflow-hidden animate-fade-up">
      <div
        aria-hidden
        className="absolute -top-24 -end-24 w-64 h-64 bg-accent-200/40 rounded-full blur-3xl"
      />
      <div className="relative">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 grid place-items-center text-white text-3xl shadow-soft shrink-0">
            ✓
          </div>
          <div>
            <span className="eyebrow mb-2">
              {t('confirm.bookingId')} · {booking.id}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              {t('confirm.title')}
            </h2>
            <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
              {t('confirm.subtitle')}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-brand-50/60 border border-brand-100 p-4 mb-6">
          <p className="text-xs uppercase tracking-wider font-semibold text-brand-700 mb-2">
            {t('confirm.lessonTime')}
          </p>
          <p className="text-slate-900 font-semibold">{times.israel}</p>
        </div>

        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-1 mt-2">
          {rows.map((row, idx) => (
            <div
              key={row.label}
              className={[
                'flex items-start justify-between gap-4 py-3 text-sm border-b border-slate-100',
                idx >= rows.length - 2 ? 'sm:col-span-2' : '',
              ].join(' ')}
            >
              <dt className="text-slate-500">{row.label}</dt>
              <dd className="font-semibold text-slate-900 text-end break-words">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/" className="btn-secondary">
            {t('confirm.backHome')}
          </Link>
          <BookingButton labelKey="confirm.bookAnother" />
        </div>
      </div>
    </div>
  );
}

function resolveBookingTimes(
  booking: Booking,
  t: (key: string) => string,
): { israel: string } {
  // Customer-facing display is always Israel-time only — no zone label.
  // (Admin dashboard shows both zones; see BookingTable.)
  if (booking.isoStart) {
    const { israel } = describeInstant(booking.isoStart);
    return {
      israel: `${t(`booking.day.${israel.weekdayKey}`)}, ${israel.time}`,
    };
  }
  // Legacy fallback for bookings made before timezone-aware fields existed.
  return { israel: `${t(`booking.day.${booking.date}`)}, ${booking.time}` };
}

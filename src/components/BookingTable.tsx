import { useLanguage } from '../contexts/LanguageContext';
import type { Booking, BookingStatus } from '../types';
import { describeInstant } from '../utils/timeSlots';

interface Props {
  bookings: Booking[];
  onStatusChange: (id: string, status: BookingStatus) => void;
  onDelete: (id: string) => void;
}

const statuses: BookingStatus[] = ['new', 'confirmed', 'cancelled'];

const statusStyle: Record<BookingStatus, string> = {
  new: 'bg-brand-50 text-brand-700 border-brand-100',
  confirmed: 'bg-accent-500/10 text-accent-600 border-accent-500/20',
  cancelled: 'bg-slate-100 text-slate-500 border-slate-200',
};

export default function BookingTable({ bookings, onStatusChange, onDelete }: Props) {
  const { t } = useLanguage();

  return (
    <div className="card overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <Th>{t('admin.table.student')}</Th>
              <Th>{t('admin.table.subject')}</Th>
              <Th>{t('admin.table.topic')}</Th>
              <Th>{t('admin.table.dateTime')}</Th>
              <Th>{t('admin.table.contact')}</Th>
              <Th>{t('admin.table.status')}</Th>
              <Th>{t('admin.table.actions')}</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50/50">
                <Td>
                  <div className="font-medium text-slate-900">{b.fullName}</div>
                  <div className="text-xs text-slate-500">
                    {t(`level.${b.studentLevel}`)} · {t(`lessonType.${b.lessonType}`)}
                  </div>
                </Td>
                <Td>{t(`subject.${b.subject}.short`)}</Td>
                <Td>
                  <div>{t(`topic.${b.topic}.title`)}</div>
                  <div className="text-xs text-slate-500">
                    {b.duration} {t('common.minutes')}
                  </div>
                </Td>
                <Td>
                  <BookingDateTime booking={b} />
                </Td>
                <Td>
                  <div className="text-xs">{b.phone}</div>
                  <div className="text-xs text-slate-500">{b.email}</div>
                </Td>
                <Td>
                  <select
                    value={b.status}
                    onChange={(e) =>
                      onStatusChange(b.id, e.target.value as BookingStatus)
                    }
                    className={[
                      'rounded-full px-3 py-1 text-xs font-medium border focus:outline-none',
                      statusStyle[b.status],
                    ].join(' ')}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {t(`status.${s}`)}
                      </option>
                    ))}
                  </select>
                </Td>
                <Td>
                  <button
                    type="button"
                    data-umami-event="admin-booking-delete"
                    onClick={() => {
                      if (window.confirm(t('admin.action.confirmDelete'))) {
                        onDelete(b.id);
                      }
                    }}
                    className="text-xs text-red-600 hover:text-red-700 hover:underline"
                  >
                    {t('admin.action.delete')}
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      scope="col"
      className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-wider"
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 align-top">{children}</td>;
}

function BookingDateTime({ booking }: { booking: Booking }) {
  const { t } = useLanguage();

  // New (timezone-aware) bookings: derive both zones from the stored ISO instant.
  if (booking.isoStart) {
    const { israel, california } = describeInstant(booking.isoStart);
    return (
      <div className="space-y-1">
        <div className="text-slate-900">
          <span className="text-[11px] text-slate-500">{t('tz.israel')}: </span>
          <span className="font-medium">
            {t(`booking.day.${israel.weekdayKey}`)}, {israel.time}
          </span>
        </div>
        <div className="text-slate-700">
          <span className="text-[11px] text-slate-500">{t('tz.california')}: </span>
          <span>
            {t(`booking.day.${california.weekdayKey}`)}, {california.time}
          </span>
        </div>
      </div>
    );
  }

  // Legacy fallback for bookings created before timezone-aware fields existed.
  return (
    <div>
      <div className="text-slate-900">{t(`booking.day.${booking.date}`)}</div>
      <div className="text-xs text-slate-500">{booking.time}</div>
    </div>
  );
}

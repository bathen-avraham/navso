import { useEffect, useState } from 'react';
import BookingTable from '../components/BookingTable';
import DashboardStats from '../components/DashboardStats';
import EmptyState from '../components/EmptyState';
import { useLanguage } from '../contexts/LanguageContext';
import type { Booking, BookingStatus, Subject } from '../types';
import {
  deleteBooking,
  getBookings,
  updateBookingStatus,
} from '../utils/storage';

type SubjectFilter = 'all' | Subject;
type StatusFilter = 'all' | BookingStatus;

export default function AdminPage() {
  const { t } = useLanguage();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  function refresh() {
    setBookings(getBookings());
  }

  function handleStatusChange(id: string, status: BookingStatus) {
    updateBookingStatus(id, status);
    refresh();
  }

  function handleDelete(id: string) {
    deleteBooking(id);
    refresh();
  }

  const filtered = bookings.filter((b) => {
    if (subjectFilter !== 'all' && b.subject !== subjectFilter) return false;
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    return true;
  });

  const subjectOptions: SubjectFilter[] = ['all', 'hebrew', 'math'];
  const statusOptions: StatusFilter[] = ['all', 'new', 'confirmed', 'cancelled'];

  return (
    <div className="container-page section">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow mb-3">{t('admin.eyebrow')}</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2 tracking-tight">
            {t('admin.title')}
          </h1>
          <p className="text-slate-600 max-w-xl">{t('admin.subtitle')}</p>
        </div>
      </header>

      <div
        role="note"
        className="mb-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 text-amber-900 px-4 py-3.5 text-sm"
      >
        <span aria-hidden className="text-base leading-none mt-0.5">ⓘ</span>
        <span>{t('admin.demoNote')}</span>
      </div>

      <DashboardStats bookings={bookings} />

      <section className="mt-8">
        <div className="flex flex-wrap items-end gap-4 mb-4">
          <div>
            <label className="label" htmlFor="subjectFilter">
              {t('admin.filter.subject')}
            </label>
            <select
              id="subjectFilter"
              className="input min-w-[160px]"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value as SubjectFilter)}
            >
              {subjectOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === 'all'
                    ? t('admin.filter.all')
                    : t(`subject.${opt}.short`)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="statusFilter">
              {t('admin.filter.status')}
            </label>
            <select
              id="statusFilter"
              className="input min-w-[160px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === 'all' ? t('admin.filter.all') : t(`status.${opt}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          bookings.length === 0 ? (
            <EmptyState
              title={t('admin.empty.title')}
              subtitle={t('admin.empty.subtitle')}
            />
          ) : (
            <EmptyState
              title={t('admin.noResults.title')}
              subtitle={t('admin.noResults.subtitle')}
              action={
                <button
                  type="button"
                  data-umami-event="admin-filter-clear"
                  className="btn-secondary"
                  onClick={() => {
                    setSubjectFilter('all');
                    setStatusFilter('all');
                  }}
                >
                  {t('admin.noResults.clear')}
                </button>
              }
            />
          )
        ) : (
          <BookingTable
            bookings={filtered}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        )}
      </section>
    </div>
  );
}

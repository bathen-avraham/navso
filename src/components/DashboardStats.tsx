import type { ReactNode } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Booking } from '../types';
import { HebrewIcon, MathIcon } from './icons';

interface Props {
  bookings: Booking[];
}

interface Stat {
  label: string;
  value: number;
  icon: ReactNode;
  iconBg: string;
}

export default function DashboardStats({ bookings }: Props) {
  const { t } = useLanguage();

  const total = bookings.length;
  const hebrew = bookings.filter((b) => b.subject === 'hebrew').length;
  const math = bookings.filter((b) => b.subject === 'math').length;
  const thisWeek = bookings.filter((b) => isThisWeek(b.createdAt)).length;

  const stats: Stat[] = [
    {
      label: t('admin.stats.total'),
      value: total,
      icon: <span className="font-semibold text-lg leading-none">◇</span>,
      iconBg: 'bg-brand-gradient',
    },
    {
      label: t('admin.stats.hebrew'),
      value: hebrew,
      icon: <HebrewIcon size={20} />,
      iconBg: 'bg-gradient-to-br from-brand-500 to-brand-700',
    },
    {
      label: t('admin.stats.math'),
      value: math,
      icon: <MathIcon size={20} />,
      iconBg: 'bg-gradient-to-br from-accent-400 to-accent-600',
    },
    {
      label: t('admin.stats.thisWeek'),
      value: thisWeek,
      icon: <span className="font-semibold text-lg leading-none">○</span>,
      iconBg: 'bg-gradient-to-br from-slate-400 to-slate-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="card flex items-center gap-4">
          <div
            aria-hidden
            className={`w-11 h-11 rounded-xl ${s.iconBg} grid place-items-center text-white font-semibold shadow-soft shrink-0`}
          >
            {s.icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-500 truncate">{s.label}</p>
            <p className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              {s.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function isThisWeek(iso: string): boolean {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return false;
  const now = new Date();
  const day = now.getDay();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(now.getDate() - day);
  const end = new Date(start);
  end.setDate(start.getDate() + 7);
  return d >= start && d < end;
}

import type { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function EmptyState({ title, subtitle, action }: Props) {
  return (
    <div className="card text-center py-12">
      <div
        aria-hidden
        className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 mx-auto mb-4 grid place-items-center text-2xl"
      >
        ✦
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      {subtitle && <p className="text-sm text-slate-600 max-w-md mx-auto">{subtitle}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

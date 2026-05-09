import { useLanguage } from '../contexts/LanguageContext';
import { timeSlots } from '../data/mockData';

interface Props {
  selectedDay: string;
  selectedTime: string;
  onSelect: (day: string, time: string) => void;
}

export default function TimeSlotPicker({ selectedDay, selectedTime, onSelect }: Props) {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      {timeSlots.map((slot) => (
        <div key={slot.day}>
          <h4 className="text-sm font-medium text-slate-700 mb-2">
            {t(`booking.day.${slot.day}`)}
          </h4>
          <div className="flex flex-wrap gap-2">
            {slot.times.map((time) => {
              const active = selectedDay === slot.day && selectedTime === time;
              return (
                <button
                  key={`${slot.day}-${time}`}
                  type="button"
                  onClick={() => onSelect(slot.day, time)}
                  aria-pressed={active}
                  data-umami-event="slot-pick"
                  data-umami-event-day={slot.day}
                  data-umami-event-time={time}
                  className={[
                    'px-4 py-2 rounded-xl text-sm border transition-colors',
                    active
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-brand-400 hover:bg-brand-50',
                  ].join(' ')}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

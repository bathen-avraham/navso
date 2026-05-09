import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { hebrewTopics, mathTopics } from '../data/mockData';
import type {
  HebrewTopic,
  MathTopic,
  StudentLevel,
  Subject,
  Topic,
} from '../types';
import { saveBooking } from '../utils/storage';
import {
  CALIFORNIA_TIMEZONE,
  ISRAEL_TIMEZONE,
  LESSON_DURATION_MINUTES,
  generateAvailableSlots,
} from '../utils/timeSlots';
import { isNonEmpty, isValidEmail, isValidPhone } from '../utils/validation';

const studentLevels: StudentLevel[] = [
  'elementary',
  'middleSchool',
  'highSchool',
  'bagrutPrep',
];

interface Errors {
  subject?: string;
  topic?: string;
  studentLevel?: string;
  dateTime?: string;
  fullName?: string;
  phone?: string;
  email?: string;
}

export default function BookingForm() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const initialSubject = (params.get('subject') as Subject) || '';
  const initialTopic = (params.get('topic') as Topic) || '';

  const [subject, setSubject] = useState<Subject | ''>(
    initialSubject === 'hebrew' || initialSubject === 'math' ? initialSubject : '',
  );
  const [topic, setTopic] = useState<Topic | ''>('');
  const [studentLevel, setStudentLevel] = useState<StudentLevel | ''>('');
  const [slotId, setSlotId] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  // Generated once per mount — slots are tied to "now".
  const slots = useMemo(() => generateAvailableSlots(), []);
  const slotById = useMemo(() => {
    const map = new Map<string, (typeof slots)[number]>();
    for (const s of slots) map.set(s.id, s);
    return map;
  }, [slots]);

  const availableTopics = useMemo<readonly (HebrewTopic | MathTopic)[]>(() => {
    if (subject === 'hebrew') return hebrewTopics;
    if (subject === 'math') return mathTopics;
    return [];
  }, [subject]);

  // If the topic does not belong to the chosen subject, clear it.
  useEffect(() => {
    if (!subject) {
      setTopic('');
      return;
    }
    if (topic && !availableTopics.includes(topic as HebrewTopic | MathTopic)) {
      setTopic('');
    }
  }, [subject, topic, availableTopics]);

  // Pre-select topic from URL only when it's valid for the chosen subject.
  useEffect(() => {
    if (
      initialTopic &&
      subject &&
      initialTopic !== topic &&
      availableTopics.includes(initialTopic as HebrewTopic | MathTopic)
    ) {
      setTopic(initialTopic);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTopic, subject, availableTopics]);

  function validate(): boolean {
    const e: Errors = {};
    if (!subject) e.subject = t('booking.choose.subject');
    if (!topic) e.topic = t('booking.choose.topic');
    if (!studentLevel) e.studentLevel = t('booking.required');
    if (!slotId) e.dateTime = t('booking.choose.timeFirst');
    if (!isNonEmpty(fullName)) e.fullName = t('booking.required');
    if (!isValidPhone(phone)) e.phone = t('booking.invalid.phone');
    if (!isValidEmail(email)) e.email = t('booking.invalid.email');
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    if (!subject || !topic || !studentLevel || !slotId) return;
    const slot = slotById.get(slotId);
    if (!slot) return;

    const booking = saveBooking({
      subject,
      topic,
      lessonType: 'online',
      duration: 60,
      studentLevel,
      // Legacy fields populated for backward compatibility.
      date: slot.israel.date,
      time: slot.israel.time,
      // Timezone-aware fields for future Google Calendar integration.
      isoStart: slot.isoStart,
      israelDateTime: `${slot.israel.date} ${slot.israel.time}`,
      californiaDateTime: `${slot.california.date} ${slot.california.time}`,
      sourceTimeZone: ISRAEL_TIMEZONE,
      tutorTimeZone: CALIFORNIA_TIMEZONE,
      durationMinutes: LESSON_DURATION_MINUTES,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      notes: notes.trim(),
    });
    navigate(`/demo-booking/confirmation?id=${booking.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <Step number={1} label={t('booking.step.subject')}>
        <Select
          id="subject"
          value={subject}
          onChange={(v) => setSubject(v as Subject | '')}
          placeholder={t('booking.choose.subject')}
          error={errors.subject}
          options={(['hebrew', 'math'] as const).map((s) => ({
            value: s,
            label: t(`subject.${s}`),
          }))}
        />
      </Step>

      <Step number={2} label={t('booking.step.topic')}>
        <Select
          id="topic"
          value={topic}
          onChange={(v) => setTopic(v as Topic | '')}
          placeholder={
            subject ? t('booking.choose.topic') : t('booking.choose.subjectFirst')
          }
          disabled={!subject}
          error={errors.topic}
          options={availableTopics.map((tp) => ({
            value: tp,
            label: t(`topic.${tp}.title`),
          }))}
        />
      </Step>

      <Step number={3} label={t('booking.step.level')}>
        <Select
          id="studentLevel"
          value={studentLevel}
          onChange={(v) => setStudentLevel(v as StudentLevel | '')}
          placeholder={t('booking.choose.level')}
          error={errors.studentLevel}
          options={studentLevels.map((l) => ({
            value: l,
            label: t(`level.${l}`),
          }))}
        />
      </Step>

      <Step number={4} label={t('booking.step.dateTime')}>
        <p className="text-sm text-slate-600 mb-3 leading-relaxed">
          {t('booking.dateTime.hint')}
        </p>
        {slots.length === 0 ? (
          <p className="text-sm text-slate-500 bg-slate-50 rounded-xl p-4">
            {t('booking.dateTime.empty')}
          </p>
        ) : (
          <Select
            id="dateTime"
            value={slotId}
            onChange={setSlotId}
            placeholder={t('booking.dateTime.label')}
            error={errors.dateTime}
            options={slots.map((s) => ({
              value: s.id,
              label: formatSlotOption(s, t),
            }))}
          />
        )}
      </Step>

      <Step number={5} label={t('booking.step.lessonInfo')}>
        <ul className="grid sm:grid-cols-2 gap-3 text-sm">
          <FixedRow
            label={t('home.info.lessonType')}
            value={t('lessonType.fixed')}
          />
          <FixedRow
            label={t('home.info.duration')}
            value={t('home.info.durationValue')}
          />
        </ul>
      </Step>

      <Step number={6} label={t('booking.step.details')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="fullName">
              {t('booking.field.fullName')}
            </label>
            <input
              id="fullName"
              className="input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
            />
            {errors.fullName && <FieldError msg={errors.fullName} />}
          </div>
          <div>
            <label className="label" htmlFor="phone">
              {t('booking.field.phone')}
            </label>
            <input
              id="phone"
              type="tel"
              className="input"
              dir="ltr"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
            />
            {errors.phone && <FieldError msg={errors.phone} />}
          </div>
          <div className="md:col-span-2">
            <label className="label" htmlFor="email">
              {t('booking.field.email')}
            </label>
            <input
              id="email"
              type="email"
              className="input"
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            {errors.email && <FieldError msg={errors.email} />}
          </div>
          <div className="md:col-span-2">
            <label className="label" htmlFor="notes">
              {t('booking.field.notes')}{' '}
              <span className="text-xs text-slate-400 font-normal">
                ({t('common.optional')})
              </span>
            </label>
            <textarea
              id="notes"
              className="input min-h-[120px] resize-y"
              placeholder={t(
                topic === 'general'
                  ? 'booking.field.notes.placeholder.general'
                  : 'booking.field.notes.placeholder',
              )}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            {topic === 'general' && (
              <p className="text-xs text-brand-700 mt-2">
                {t('booking.field.notes.hint.general')}
              </p>
            )}
          </div>
        </div>
      </Step>

      <div className="card flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-xs text-slate-500 leading-relaxed">
          {t('booking.submitNote')}
        </p>
        <button
          type="submit"
          className="btn-primary w-full sm:w-auto sm:px-10 text-base"
        >
          {t('booking.submit')}
          <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}

function formatSlotOption(
  slot: ReturnType<typeof generateAvailableSlots>[number],
  t: (key: string) => string,
): string {
  const weekday = t(`booking.day.${slot.israel.weekdayKey}`);
  return `${weekday}, ${slot.israel.time}`;
}

function Step({
  number,
  label,
  children,
}: {
  number: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-9 h-9 grid place-items-center rounded-xl bg-brand-gradient text-white font-semibold text-sm shadow-soft">
          {number}
        </span>
        <h3 className="font-semibold text-slate-900 text-lg">{label}</h3>
      </div>
      {children}
    </section>
  );
}

interface SelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  disabled?: boolean;
  error?: string;
}

function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
  disabled,
  error,
}: SelectProps) {
  return (
    <div>
      <div className="relative">
        <select
          id={id}
          className={[
            'input appearance-none pe-10 cursor-pointer',
            disabled ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : '',
            error ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100' : '',
          ].join(' ')}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-slate-400"
        >
          ▾
        </span>
      </div>
      {error && <FieldError msg={error} />}
    </div>
  );
}

function FixedRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3">
      <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
        {label}
      </p>
      <p className="font-semibold text-slate-900">{value}</p>
    </li>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p role="alert" className="field-error">
      <span aria-hidden>⚠</span>
      {msg}
    </p>
  );
}

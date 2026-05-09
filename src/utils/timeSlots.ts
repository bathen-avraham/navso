/**
 * Time-slot generator and timezone helpers.
 *
 * Booking windows are defined in Israel local time.
 * The browser may be in any timezone, so we use Intl.DateTimeFormat with the
 * timeZone option (built into every modern browser, DST-aware) to convert
 * between Asia/Jerusalem wall-clock times, America/Los_Angeles wall-clock
 * times, and absolute UTC instants. No hardcoded offsets.
 *
 * Future Google Calendar integration should consume each slot as:
 *   - isoStart  (UTC ISO 8601 instant; pass as the event start)
 *   - durationMinutes: 60
 *   - tutorTimeZone: America/Los_Angeles
 *   - studentDisplayTimeZone: Asia/Jerusalem
 */

export const ISRAEL_TIMEZONE = 'Asia/Jerusalem';
export const CALIFORNIA_TIMEZONE = 'America/Los_Angeles';
export const LESSON_DURATION_MINUTES = 60;
export const SLOT_DAYS_AHEAD = 14;

interface Window {
  start: { hour: number; minute: number };
  end: { hour: number; minute: number };
}

// Available booking windows in Israel local time.
const ISRAEL_WINDOWS: Window[] = [
  { start: { hour: 7, minute: 0 }, end: { hour: 10, minute: 0 } },
  { start: { hour: 16, minute: 0 }, end: { hour: 21, minute: 0 } },
];

export type WeekdayKey =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export interface SlotZoned {
  date: string; // YYYY-MM-DD in that zone
  weekdayKey: WeekdayKey;
  time: string; // HH:mm in that zone
}

export interface AvailableSlot {
  /** Unique identifier — also used as the dropdown option value. */
  id: string;
  /** Absolute UTC instant in ISO 8601. Suitable for Google Calendar event start. */
  isoStart: string;
  israel: SlotZoned;
  california: SlotZoned;
  durationMinutes: number;
  sourceTimeZone: typeof ISRAEL_TIMEZONE;
  tutorTimeZone: typeof CALIFORNIA_TIMEZONE;
}

/**
 * Returns the offset (in milliseconds) that `timeZone` is ahead of UTC at the
 * given instant. DST-aware — derived from Intl.DateTimeFormat formatting.
 */
function tzOffsetMs(date: Date, timeZone: string): number {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const parts = fmt.formatToParts(date).reduce<Record<string, string>>(
    (acc, p) => {
      acc[p.type] = p.value;
      return acc;
    },
    {},
  );
  const hour = Number(parts.hour) % 24; // some locales emit "24" for midnight
  const asUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    hour,
    Number(parts.minute),
    Number(parts.second),
  );
  return asUTC - date.getTime();
}

/**
 * Builds the absolute UTC instant for a wall-clock time interpreted in
 * `timeZone`. Works around the lack of a native API by guessing once and
 * adjusting by the zone's offset at that instant.
 */
function zonedWallClockToUTC(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): Date {
  const guess = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const offset = tzOffsetMs(guess, timeZone);
  return new Date(guess.getTime() - offset);
}

const WEEKDAY_KEYS: Record<string, WeekdayKey> = {
  Sunday: 'sunday',
  Monday: 'monday',
  Tuesday: 'tuesday',
  Wednesday: 'wednesday',
  Thursday: 'thursday',
  Friday: 'friday',
  Saturday: 'saturday',
};

/**
 * Returns the wall-clock representation of `instant` in `timeZone`.
 */
export function getZoned(instant: Date, timeZone: string): SlotZoned {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const parts = fmt.formatToParts(instant).reduce<Record<string, string>>(
    (acc, p) => {
      acc[p.type] = p.value;
      return acc;
    },
    {},
  );
  const hour = Number(parts.hour) % 24;
  const hh = String(hour).padStart(2, '0');
  const mm = parts.minute.padStart(2, '0');
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    weekdayKey: WEEKDAY_KEYS[parts.weekday] ?? 'sunday',
    time: `${hh}:${mm}`,
  };
}

/**
 * Generates the list of bookable 60-minute slots for the next N days,
 * starting from `now`, based on Israel-local windows. Past slots and
 * windows that have already started are filtered out.
 */
export function generateAvailableSlots(now: Date = new Date()): AvailableSlot[] {
  const slots: AvailableSlot[] = [];

  // Anchor on today's calendar date in Israel.
  const todayIsrael = getZoned(now, ISRAEL_TIMEZONE);
  const [y0, m0, d0] = todayIsrael.date.split('-').map(Number);

  // Walk through the next SLOT_DAYS_AHEAD calendar dates in Israel.
  const cursor = new Date(Date.UTC(y0, m0 - 1, d0));
  for (let i = 0; i < SLOT_DAYS_AHEAD; i++) {
    const y = cursor.getUTCFullYear();
    const m = cursor.getUTCMonth() + 1;
    const d = cursor.getUTCDate();

    for (const win of ISRAEL_WINDOWS) {
      const startMin = win.start.hour * 60 + win.start.minute;
      const endMin = win.end.hour * 60 + win.end.minute;
      // Generate 60-minute starts. The last valid start is endMin - duration.
      for (
        let mins = startMin;
        mins + LESSON_DURATION_MINUTES <= endMin;
        mins += LESSON_DURATION_MINUTES
      ) {
        const hour = Math.floor(mins / 60);
        const minute = mins % 60;
        const utc = zonedWallClockToUTC(y, m, d, hour, minute, ISRAEL_TIMEZONE);
        if (utc.getTime() <= now.getTime()) continue;

        const israel = getZoned(utc, ISRAEL_TIMEZONE);
        const california = getZoned(utc, CALIFORNIA_TIMEZONE);
        slots.push({
          id: utc.toISOString(),
          isoStart: utc.toISOString(),
          israel,
          california,
          durationMinutes: LESSON_DURATION_MINUTES,
          sourceTimeZone: ISRAEL_TIMEZONE,
          tutorTimeZone: CALIFORNIA_TIMEZONE,
        });
      }
    }

    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return slots;
}

/**
 * Looks up an available slot by id (its ISO start instant).
 */
export function findSlotById(
  slots: AvailableSlot[],
  id: string,
): AvailableSlot | undefined {
  return slots.find((s) => s.id === id);
}

/**
 * Convenience: format a stored ISO instant back into Israel + California
 * wall-clock parts. Used by the confirmation page and admin dashboard for
 * bookings created with the new model.
 */
export function describeInstant(isoStart: string): {
  israel: SlotZoned;
  california: SlotZoned;
} {
  const instant = new Date(isoStart);
  return {
    israel: getZoned(instant, ISRAEL_TIMEZONE),
    california: getZoned(instant, CALIFORNIA_TIMEZONE),
  };
}

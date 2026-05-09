import type { Booking, BookingStatus, Language } from '../types';

const BOOKINGS_KEY = 'navso.bookings.v1';
const LANGUAGE_KEY = 'navso.language.v1';

function readBookingsRaw(): Booking[] {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Booking[]) : [];
  } catch {
    return [];
  }
}

function writeBookingsRaw(bookings: Booking[]): void {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

export function getBookings(): Booking[] {
  return readBookingsRaw().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getBookingById(id: string): Booking | undefined {
  return readBookingsRaw().find((b) => b.id === id);
}

export function saveBooking(
  booking: Omit<Booking, 'id' | 'status' | 'createdAt'>,
): Booking {
  const newBooking: Booking = {
    ...booking,
    id: generateId(),
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  const all = readBookingsRaw();
  all.push(newBooking);
  writeBookingsRaw(all);
  return newBooking;
}

export function updateBookingStatus(id: string, status: BookingStatus): void {
  const all = readBookingsRaw();
  const idx = all.findIndex((b) => b.id === id);
  if (idx === -1) return;
  all[idx] = { ...all[idx], status };
  writeBookingsRaw(all);
}

export function deleteBooking(id: string): void {
  const all = readBookingsRaw().filter((b) => b.id !== id);
  writeBookingsRaw(all);
}

export function getStoredLanguage(): Language | null {
  const raw = localStorage.getItem(LANGUAGE_KEY);
  if (raw === 'he' || raw === 'en') return raw;
  return null;
}

export function setStoredLanguage(lang: Language): void {
  localStorage.setItem(LANGUAGE_KEY, lang);
}

function generateId(): string {
  // Lightweight unique-ish id without external deps.
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  ).toUpperCase();
}

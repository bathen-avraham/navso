export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed) return false;
  // Pragmatic email check — good enough for client-side validation.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-().]/g, '');
  if (!cleaned) return false;
  // Accept optional leading + and 7 to 15 digits (covers IL and international).
  return /^\+?\d{7,15}$/.test(cleaned);
}

export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

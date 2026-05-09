/**
 * Public site configuration.
 *
 * These values are not secret — they are public links/numbers visible on
 * every customer-facing page. Centralized here so they only need to change
 * in one place when the booking link or WhatsApp number is updated.
 */

/** Real booking happens through this Google Calendar Appointment Schedule. */
export const bookingUrl = 'https://calendar.app.google/7zukAfPYaZDfnALR9';

/** Public email address. */
export const emailAddress = 'bathen035@gmail.com';

/** Real anchor href for the email — opens default mail compose. */
export const emailHref = 'mailto:bathen035@gmail.com';

/** Israeli phone — digits-only form used in tel: links. */
export const phoneIsraelDial = '0508866512';

/** Real anchor href for the Israeli phone — opens dialler. */
export const phoneIsraelHref = 'tel:0508866512';

/** WhatsApp number in international format (no '+' or spaces). */
export const whatsappNumber = '972508866512';

/** Base WhatsApp deep link, no message. */
export const whatsappBase = 'https://wa.me/972508866512';

/** WhatsApp deep link with the standard Hebrew prefilled message. */
export const whatsappHrefHe =
  'https://wa.me/972508866512?text=' +
  encodeURIComponent(
    'שלום, אשמח לקבל פרטים על שיעור פרטי בלשון או מתמטיקה',
  );

/** WhatsApp deep link with the standard English prefilled message. */
export const whatsappHrefEn =
  'https://wa.me/972508866512?text=' +
  encodeURIComponent(
    'Hello, I would love to get details about a private Hebrew or math lesson',
  );

/** Build a WhatsApp deep link with an optional pre-filled message. */
export function whatsappLink(prefilledMessage?: string): string {
  const base = `https://wa.me/${whatsappNumber}`;
  return prefilledMessage
    ? `${base}?text=${encodeURIComponent(prefilledMessage)}`
    : base;
}

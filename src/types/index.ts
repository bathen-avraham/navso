export type Language = 'he' | 'en';

export type Subject = 'hebrew' | 'math';

export type HebrewTopic =
  | 'morphology'
  | 'numbers'
  | 'reading'
  | 'integratedWriting'
  | 'bagrut'
  | 'general';

export type MathTopic =
  | 'algebra'
  | 'functions'
  | 'geometry'
  | 'probability'
  | 'examPrep'
  | 'general';

export type Topic = HebrewTopic | MathTopic;

export type LessonType = 'online' | 'inPerson';

export type LessonDuration = 60;

export type StudentLevel =
  | 'elementary'
  | 'middleSchool'
  | 'highSchool'
  | 'bagrutPrep';

export type BookingStatus = 'new' | 'confirmed' | 'cancelled';

export interface Booking {
  id: string;
  subject: Subject;
  topic: Topic;
  lessonType: LessonType;
  duration: LessonDuration;
  studentLevel: StudentLevel;
  /**
   * Legacy: previously the lowercase weekday key ("sunday", "monday", ...).
   * For new bookings this is the ISO calendar date in Israel time
   * ("YYYY-MM-DD"). The admin dashboard handles both shapes.
   */
  date: string;
  /** "HH:mm" in Israel time. */
  time: string;
  // Timezone-aware fields (optional for backwards compatibility with old
  // bookings already stored in localStorage from the previous data model).
  isoStart?: string; // UTC ISO 8601 instant — pass to Google Calendar later
  israelDateTime?: string; // "YYYY-MM-DD HH:mm" in Asia/Jerusalem
  californiaDateTime?: string; // "YYYY-MM-DD HH:mm" in America/Los_Angeles
  sourceTimeZone?: string; // "Asia/Jerusalem"
  tutorTimeZone?: string; // "America/Los_Angeles"
  durationMinutes?: number; // 60
  fullName: string;
  phone: string;
  email: string;
  notes: string;
  status: BookingStatus;
  createdAt: string;
}

export interface TopicInfo {
  id: Topic;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  recommendedDuration: LessonDuration;
}

export interface PackageOption {
  id: 'single' | 'fivePack' | 'bagrutFocus';
  duration: LessonDuration;
}

export interface TimeSlot {
  day: string;
  times: string[];
}

export interface Testimonial {
  id: string;
  name: { he: string; en: string };
  role?: { he: string; en: string };
  quote: { he: string; en: string };
}

import type {
  HebrewTopic,
  MathTopic,
  PackageOption,
  Testimonial,
  TimeSlot,
  TopicInfo,
} from '../types';

export const hebrewTopics: HebrewTopic[] = [
  'general',
  'morphology',
  'numbers',
  'reading',
  'integratedWriting',
  'bagrut',
];

export const mathTopics: MathTopic[] = [
  'general',
  'algebra',
  'functions',
  'geometry',
  'trigonometry',
  'probability',
  'examPrep',
];

export const topicInfo: Record<HebrewTopic | MathTopic, TopicInfo> = {
  // Hebrew
  morphology: {
    id: 'morphology',
    difficulty: 'intermediate',
    recommendedDuration: 60,
  },
  numbers: { id: 'numbers', difficulty: 'beginner', recommendedDuration: 60 },
  reading: {
    id: 'reading',
    difficulty: 'intermediate',
    recommendedDuration: 60,
  },
  integratedWriting: {
    id: 'integratedWriting',
    difficulty: 'advanced',
    recommendedDuration: 60,
  },
  bagrut: { id: 'bagrut', difficulty: 'advanced', recommendedDuration: 60 },
  // Math
  algebra: { id: 'algebra', difficulty: 'beginner', recommendedDuration: 60 },
  functions: {
    id: 'functions',
    difficulty: 'intermediate',
    recommendedDuration: 60,
  },
  geometry: {
    id: 'geometry',
    difficulty: 'intermediate',
    recommendedDuration: 60,
  },
  trigonometry: {
    id: 'trigonometry',
    difficulty: 'advanced',
    recommendedDuration: 60,
  },
  probability: {
    id: 'probability',
    difficulty: 'intermediate',
    recommendedDuration: 60,
  },
  examPrep: { id: 'examPrep', difficulty: 'advanced', recommendedDuration: 60 },
  // Shared "not sure / general" option
  general: { id: 'general', difficulty: 'beginner', recommendedDuration: 60 },
};

export const timeSlots: TimeSlot[] = [
  { day: 'sunday', times: ['16:00', '17:30'] },
  { day: 'monday', times: ['18:00'] },
  { day: 'wednesday', times: ['15:30', '19:00'] },
  { day: 'thursday', times: ['17:00'] },
];

export const packageOptions: PackageOption[] = [
  {
    id: 'single',
    duration: 60,
    pricePerLesson: 120,
  },
  {
    id: 'fivePack',
    duration: 60,
    pricePerLesson: 100,
    totalPrice: 500,
    bagrutSeason: true,
  },
  {
    id: 'marathon',
    duration: 60,
    pricePerLesson: 80,
    totalPrice: 800,
    bagrutSeason: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: { he: 'אמא של תלמיד', en: 'Parent of a student' },
    quote: {
      he: 'יקירה, זיו עבר את הבגרות בלשון בהצלחה. בשבילו זה הישג מטורף כי הוא התקשה מאוד, ובזכותך הוא עבר בהצלחה. תודה רבה ❤️ הוא צועק משמחה, לא האמין שיעבור.',
      en: 'Dear, Ziv passed his Hebrew Bagrut successfully. For him, this is a huge achievement because he struggled a lot, and thanks to you, he passed. Thank you so much ❤️ He is shouting with joy and couldn’t believe he passed.',
    },
  },
  {
    id: 't2',
    name: { he: 'אליאור, כיתה י״א', en: 'Elior, 11th grade' },
    quote: {
      he: 'תודה רבההה, באמת חייב לך תודה ענקית. עזרת לי כל כך וצמצמת איתי פערים ענקיים בזמן כל כך קצר. בזכותך הבנתי את החומר והגעתי הרבה יותר מוכן למתכונת ולבגרות. ציון ההגשה שלי היה 95, וזה מטורף ברמות. באמת יש לך חלק גדול ומשמעותי בזה. תודה לך על הכול ❤️🙏🙏',
      en: 'Thank you so muchhh, I really owe you a huge thank you. You helped me so much and helped me close huge gaps in such a short time. Thanks to you, I understood the material and felt much more prepared for the exam and Bagrut. My submitted grade was 95, which was amazing. You really had a big and meaningful part in that. Thank you for everything ❤️🙏🙏',
    },
  },
  {
    id: 't3',
    name: { he: 'תלמידת י״ב', en: '12th grade student' },
    quote: {
      he: 'הגעתי לשיעורים עם הרבה לחץ לקראת הבגרות, ולאט לאט הדברים התחילו להתחבר לי. ההסברים על מערכת הצורות היו ברורים ומסודרים, ויצאתי הרבה יותר רגועה ובטוחה בעצמי. תודה רבה לך על הסבלנות והעזרה.',
      en: 'I came to the lessons feeling very stressed before the Bagrut exam, and little by little everything started to make sense. The explanations about Hebrew morphology were clear and organized, and I left feeling much calmer and more confident. Thank you so much for your patience and help.',
    },
  },
];

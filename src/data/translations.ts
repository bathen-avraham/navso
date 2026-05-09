import type { Language } from '../types';

type Dict = Record<string, string>;

export const translations: Record<Language, Dict> = {
  he: {
    // Brand & nav
    'brand.name': 'נבס״ו',
    'brand.tagline': 'מורה פרטית בשבילך',
    'page.title': 'נבס״ו מורה פרטית בשבילך',
    'profile.name': 'בתחן אברהם',
    'profile.role': 'מורה פרטית ללשון ומתמטיקה',
    'profile.tagline': 'הכנה לבגרויות · שיעורים אונליין',
    'profile.alt': 'בתחן אברהם, מורה פרטית ללשון ומתמטיקה',
    'nav.home': 'בית',
    'nav.subjects': 'מקצועות',
    'nav.booking': 'קביעת שיעור',
    'nav.about': 'אודות',
    'nav.faq': 'שאלות נפוצות',
    'nav.admin': 'ניהול',
    'lang.toggleHe': 'עברית',
    'lang.toggleEn': 'English',
    'lang.label': 'שפה',

    // Hero
    'home.hero.eyebrow': 'דגש על לשון · ליווי גם במתמטיקה',
    'home.hero.titleLead': 'שיעורים פרטיים',
    'home.hero.titleAccent': 'בלשון',
    'home.hero.titleTail': 'ומתמטיקה',
    'home.hero.title': 'קביעת שיעורים פרטיים בלשון ומתמטיקה',
    'home.hero.proof':
      'ליווי תלמידים מהיסודי ועד הכנה לבגרות · אונליין בלבד',
    'home.hero.badge.zoom': 'אונליין בלבד',
    'home.hero.badge.bagrut': 'הכנה ממוקדת לבגרויות',
    'home.hero.badge.pace': 'התקדמות בקצב התלמיד',
    'home.hero.subtitle':
      'הדגש המרכזי הוא לימוד לשון: מערכת הצורות, שם המספר, הבנת הנקרא, כתיבה ממזגת והכנה לבגרות. בנוסף, ניתן לקבוע שיעורי מתמטיקה לכל הרמות, הכוללים חיזוק יסודות, הכנה למבחנים וליווי לפי קצב התלמיד.',
    'home.cta.book': 'בחירת מועד לשיעור',
    'home.cta.viewPackages': 'צפייה במסלולים',
    'home.cta.calendarHelper':
      'הקביעה מתבצעת דרך יומן Google לפי המועדים הפנויים.',
    'cta.calendar': 'בחירת מועד לשיעור',
    'cta.calendar.long': 'פתיחת יומן לקביעת שיעור',

    // Why study with me section (home)
    'home.why.eyebrow': 'מה מקבלים בשיעור',
    'home.why.title': 'למה ללמוד איתי?',
    'home.why.subtitle':
      'גישה רגועה, מסודרת ואישית, שמתאימה לכל תלמיד ותלמידה.',
    'home.why.c1.title': 'הסברים ברורים ופשוטים',
    'home.why.c1.desc':
      'מפרקים כל מושג לשלבים קטנים, עם דוגמאות מהחיים, עד שהחומר באמת מתחבר בראש.',
    'home.why.c2.title': 'הכנה ממוקדת לבגרויות',
    'home.why.c2.desc':
      'עובדים על מבנה הבחינה, ניהול זמן ופתרון שאלונים — בדיוק על מה שייבחנו.',
    'home.why.c3.title': 'חיזוק ביטחון בלמידה',
    'home.why.c3.desc':
      'אווירה תומכת בלי לחץ, שמאפשרת לתלמידים לשאול בלי חשש ולהתקדם.',
    'home.why.c4.title': 'ליווי אישי לפי קצב התלמיד',
    'home.why.c4.desc':
      'כל שיעור מתוכנן סביב מה שהתלמיד צריך עכשיו, לא לפי תכנית קבועה מראש.',

    // How booking works preview (home)
    'home.how.eyebrow': 'איך קובעים שיעור',
    'home.how.title': 'קביעה פשוטה דרך יומן Google',
    'home.how.subtitle':
      'שלוש פעולות קצרות, ושיעור נקבע ביומן עם הודעת אישור למייל.',
    'home.how.s1': 'בוחרים מועד פנוי',
    'home.how.s2': 'ממלאים פרטים',
    'home.how.s3': 'מקבלים אישור למייל',

    // Improve section
    'home.improve.eyebrow': 'נושאי הליבה',
    'home.improve.title': 'במה אפשר להשתפר?',
    'home.improve.subtitle': 'נושאים שאפשר לקבוע עליהם שיעור פרטי',
    'home.improve.hebrewLead':
      'הדגש המרכזי הוא לשון. בנוסף ניתן לקבל ליווי במתמטיקה.',
    'home.improve.mathLabel': 'גם במתמטיקה',

    // Quick info card
    'home.info.focus': 'התמקדות עיקרית',
    'home.info.focusValue':
      'שיעורים פרטיים בלשון ומתמטיקה — בדגש על לשון.',
    'home.info.suitableFor': 'מתאים ל',
    'home.info.suitableForValue': 'יסודי · חטיבה · תיכון · הכנה לבגרויות',
    'home.info.lessonType': 'סוג השיעור',
    'home.info.lessonTypeValue': 'אונליין בלבד',
    'home.info.duration': 'משך השיעור',
    'home.info.durationValue': '60 דקות',
    // Hero trust bullets (rendered in the side card)
    'home.trust.title': 'למה זה עובד',
    'home.trust.b1': 'שיעורים אונליין בלבד',
    'home.trust.b2': '60 דקות לכל שיעור',
    'home.trust.b3': 'בדגש על לשון',
    'home.trust.b4': 'הכנה לבגרויות',
    'home.trust.b5': 'ליווי גם במתמטיקה',

    // Subjects (top-level)
    'subject.hebrew': 'לשון',
    'subject.math': 'מתמטיקה',
    'subject.hebrew.short': 'לשון',
    'subject.math.short': 'מתמטיקה',

    // Hebrew topics
    'topic.morphology.title': 'מערכת הצורות',
    'topic.morphology.desc':
      'בניינים, גזרות, שורשים ושמות — בנייה שיטתית של ההבנה במערכת הצורות.',
    'topic.numbers.title': 'שם המספר',
    'topic.numbers.desc': 'התאמת מין ומספר, כללי ההגייה והכתיבה של המספרים בעברית.',
    'topic.reading.title': 'הבנת הנקרא',
    'topic.reading.desc': 'אסטרטגיות לקריאה ממוקדת ולמענה על שאלות סביב טקסטים.',
    'topic.integratedWriting.title': 'כתיבה ממזגת',
    'topic.integratedWriting.desc':
      'מיזוג טקסטים שונים לכתיבה אחת, ארגון רעיונות ובניית טיעון.',
    'topic.bagrut.title': 'הכנה לבגרות בלשון',
    'topic.bagrut.desc': 'מבנה הבחינה, ניהול זמן, חזרה ממוקדת ופתרון שאלונים.',

    // Math topics
    'topic.algebra.title': 'אלגברה בסיסית',
    'topic.algebra.desc':
      'משוואות, אי-שוויונות, ביטויים אלגבריים והתבססות על הבסיסי.',
    'topic.functions.title': 'פונקציות',
    'topic.functions.desc':
      'פונקציות לינאריות וריבועיות, גרפים, נקודות חיתוך ותחומי הגדרה.',
    'topic.geometry.title': 'גיאומטריה',
    'topic.geometry.desc': 'משפטים מרכזיים, משולשים, מרובעים ושטחים.',
    'topic.probability.title': 'הסתברות',
    'topic.probability.desc': 'מרחב מדגם, מאורעות, חוקי החיבור והכפל.',
    'topic.examPrep.title': 'הכנה למבחנים',
    'topic.examPrep.desc': 'תרגול שאלונים, חזרה על נושאים מרכזיים והתמודדות עם מבחנים.',
    'topic.general.title': 'שיעור כללי',
    'topic.general.short': 'כללי',
    'topic.general.desc':
      'לא בטוחים מה הכי חשוב לחזק? נתחיל בבדיקה קצרה של הצרכים, נבין יחד איפה נמצאים הקשיים, ונבנה תכנית למידה מסודרת לפי קצב התלמיד.',

    // Difficulty
    'difficulty.beginner': 'מתחיל',
    'difficulty.intermediate': 'בינוני',
    'difficulty.advanced': 'מתקדם',
    'difficulty.label': 'רמת קושי',
    'duration.recommended': 'משך מומלץ',
    'duration.minutes': 'דקות',

    // Lesson type
    'lessonType.online': 'אונליין בלבד',
    'lessonType.inPerson': 'פרונטלי',
    'lessonType.fixed': 'אונליין בלבד',

    // Student level
    'level.elementary': 'יסודי',
    'level.middleSchool': 'חטיבה',
    'level.highSchool': 'תיכון',
    'level.bagrutPrep': 'הכנה לבגרויות',

    // Subjects page
    'subjects.eyebrow': 'מה אפשר ללמוד',
    'subjects.title': 'המקצועות שלנו',
    'subjects.subtitle':
      'הדגש המרכזי הוא לשון. בנוסף ניתן לקבל ליווי במתמטיקה.',
    'subjects.hebrew.title': 'שיעורי לשון',
    'subjects.hebrew.subtitle': 'נושאי הליבה שעליהם נלמד יחד',
    'subjects.math.title': 'שיעורי מתמטיקה',
    'subjects.math.subtitle': 'תרגול לכל הרמות — מהיסודי ועד הכנה לבגרויות',

    // Booking page
    'booking.eyebrow': 'יומן Google',
    'booking.title': 'בחירת מועד לשיעור',
    'booking.subtitle':
      'בחרו מועד פנוי דרך יומן Google. לאחר הבחירה, השיעור יתווסף ליומן ותתקבל הודעת אישור למייל.',
    'booking.steps.title': 'איך זה עובד',
    'booking.steps.s1': 'בוחרים מועד פנוי',
    'booking.steps.s2': 'ממלאים פרטים',
    'booking.steps.s3': 'מקבלים אישור למייל',
    'booking.calendar.aside.title': 'משך וזמינות',
    'booking.calendar.aside.duration': 'כל שיעור 60 דקות',
    'booking.calendar.aside.online': 'אונליין בלבד',
    'booking.calendar.aside.tz': 'השעות מוצגות לפי שעון ישראל ביומן Google.',
    'booking.step.subject': 'נושא ראשי',
    'booking.step.topic': 'נושא לשיעור',
    'booking.step.lessonType': 'סוג השיעור',
    'booking.step.duration': 'משך השיעור',
    'booking.step.level': 'רמת התלמיד',
    'booking.step.dateTime': 'תאריך ושעה',
    'booking.step.lessonInfo': 'פרטי השיעור',
    'booking.step.details': 'פרטי התלמיד',
    'booking.dateTime.hint': 'השעות מוצגות לפי שעון ישראל.',
    'booking.dateTime.label': 'בחירת מועד',
    'booking.dateTime.empty':
      'אין כרגע מועדים פנויים בטווח הקרוב. אפשר ליצור קשר ב-WhatsApp לתיאום ידני.',
    'tz.israel': 'שעון ישראל',
    'tz.california': 'שעון קליפורניה',
    'booking.day.saturday': 'יום שבת',
    'booking.field.fullName': 'שם מלא',
    'booking.field.phone': 'טלפון',
    'booking.field.email': 'אימייל',
    'booking.field.notes': 'הערות / במה התלמיד מתקשה?',
    'booking.field.notes.placeholder':
      'למשל: רוצה להתחזק במערכת הצורות, חוששת מבחינת בגרות בעוד חודש...',
    'booking.field.notes.placeholder.general':
      'כתבו כאן במה תרצו להתמקד או מה קשה לתלמיד/ה',
    'booking.field.notes.hint.general':
      'בחרת/ה שיעור כללי — מומלץ לכתוב כאן במה תרצו להתמקד או מה קשה לתלמיד/ה.',
    'booking.submit': 'אישור והזמנה',
    'booking.submitNote': 'לאחר השליחה אצור איתך קשר לאישור הפרטים ולשליחת קישור לשיעור.',
    'booking.required': 'שדה חובה',
    'booking.invalid.email': 'נא להזין כתובת אימייל תקינה',
    'booking.invalid.phone': 'נא להזין מספר טלפון תקין',
    'booking.choose': 'בחירה',
    'booking.choose.subject': 'בחירת נושא ראשי',
    'booking.choose.subjectFirst': 'בחרו קודם נושא ראשי',
    'booking.choose.topic': 'בחירת נושא לשיעור',
    'booking.choose.level': 'בחירת רמת התלמיד',
    'booking.choose.timeFirst': 'בחירת תאריך ושעה',
    'booking.day.sunday': 'יום ראשון',
    'booking.day.monday': 'יום שני',
    'booking.day.tuesday': 'יום שלישי',
    'booking.day.wednesday': 'יום רביעי',
    'booking.day.thursday': 'יום חמישי',
    'booking.day.friday': 'יום שישי',

    // Confirmation
    'confirm.title': 'תודה, השיעור נקבע בהצלחה',
    'confirm.subtitle':
      'לאחר קביעת השיעור אצור קשר טלפוני או באימייל לאישור סופי ולשליחת קישור לשיעור.',
    'confirm.lessonTime': 'מועד השיעור',
    'confirm.bookingId': 'מספר הזמנה',
    'confirm.subject': 'נושא ראשי',
    'confirm.topic': 'נושא',
    'confirm.lessonType': 'סוג השיעור',
    'confirm.duration': 'משך',
    'confirm.level': 'רמה',
    'confirm.date': 'תאריך',
    'confirm.time': 'שעה',
    'confirm.fullName': 'שם',
    'confirm.phone': 'טלפון',
    'confirm.email': 'אימייל',
    'confirm.notes': 'הערות',
    'confirm.backHome': 'חזרה לדף הבית',
    'confirm.bookAnother': 'קביעת שיעור נוסף',
    'confirm.notFound.title': 'לא נמצאה הזמנה',
    'confirm.notFound.subtitle': 'אפשר לחזור לדף הבית או לקבוע שיעור חדש.',

    // Admin
    'admin.eyebrow': 'דשבורד דמו',
    'admin.title': 'דשבורד מורה',
    'admin.subtitle': 'הזמנות דמו פנימיות. קביעות אמיתיות מנוהלות ביומן Google.',
    'admin.demoNote':
      'עמוד זה מציג רק הזמנות דמו שנשמרו בדפדפן הזה. קביעות אמיתיות מנוהלות ביומן Google.',
    'demoBooking.note':
      'טופס פנימי לבדיקה בלבד — קביעות אמיתיות מתבצעות דרך יומן Google.',
    'admin.stats.total': 'סך השיעורים שנקבעו',
    'admin.stats.hebrew': 'שיעורי לשון',
    'admin.stats.math': 'שיעורי מתמטיקה',
    'admin.stats.thisWeek': 'שיעורים השבוע',
    'admin.filter.subject': 'סינון לפי נושא',
    'admin.filter.status': 'סינון לפי סטטוס',
    'admin.filter.all': 'הכל',
    'admin.empty.title': 'אין הזמנות עדיין',
    'admin.empty.subtitle':
      'כשיתקבלו הזמנות חדשות מהאתר, הן יופיעו כאן באופן אוטומטי.',
    'admin.noResults.title': 'לא נמצאו הזמנות תואמות',
    'admin.noResults.subtitle': 'אפשר לנקות את הסינון כדי לראות את כל ההזמנות.',
    'admin.noResults.clear': 'ניקוי הסינון',
    'admin.action.delete': 'מחיקה',
    'admin.action.confirmDelete': 'למחוק את ההזמנה?',
    'admin.table.student': 'תלמיד/ה',
    'admin.table.subject': 'נושא',
    'admin.table.topic': 'תת-נושא',
    'admin.table.dateTime': 'תאריך ושעה',
    'admin.table.contact': 'יצירת קשר',
    'admin.table.status': 'סטטוס',
    'admin.table.actions': 'פעולות',
    'status.new': 'חדש',
    'status.confirmed': 'אושר',
    'status.cancelled': 'בוטל',

    // About
    'about.title': 'אודות',
    'about.lead':
      'אני מורה פרטית ללשון ולמתמטיקה, בעלת תואר אקדמי בהנדסת תוכנה, עם ניסיון בהוראה ובהכנה לבגרויות. בשנים האחרונות אני מלווה תלמידים בתהליך למידה אישי ומסודר, בעיקר בלשון ובנוסף גם במתמטיקה.',
    'about.p1':
      'הדגש שלי הוא ללוות תלמידים בצורה ברורה, רגועה ומסודרת, לפרק את החומר לשלבים פשוטים, ולבנות ביטחון דרך תרגול והבנה אמיתית.',
    'about.p2':
      'בשיעורים אנחנו עובדים על מערכת הצורות, שם המספר, הבנת הנקרא, כתיבה ממזגת ועל הכנה ממוקדת לבגרות בלשון.',
    'about.p3':
      'בנוסף, ניתן ליווי גם במתמטיקה — אלגברה בסיסית, פונקציות, גיאומטריה, הסתברות והכנה למבחנים.',
    'about.p4':
      'המטרה שלי היא לבנות אצל התלמידים ביטחון, להפוך את החומר לבהיר, ולהביא אותם מוכנים למבחנים ולבגרות. לאורך השנים ליוויתי תלמידים שהגיעו לשיפור משמעותי בציונים, בהבנה ובתחושת המסוגלות שלהם.',
    'about.values.title': 'מה חשוב לי בשיעור',
    'about.value.clarity.title': 'בהירות',
    'about.value.clarity.desc': 'מסבירה כל מושג בכמה דרכים, עד שמתחבר.',
    'about.value.pace.title': 'קצב אישי',
    'about.value.pace.desc': 'מתאימה את הקצב לתלמיד ולא הפוך.',
    'about.value.confidence.title': 'ביטחון',
    'about.value.confidence.desc': 'מתרגלים יחד עד שמרגישים בנוח.',
    'about.eyebrow': 'הכירו אותי',
    'about.section.credentials': 'רקע וניסיון',
    'about.section.approach': 'הגישה שלי בשיעור',
    'about.section.subjects': 'נושאי לימוד',
    'about.section.cta': 'מוכנים להתחיל?',
    'about.section.cta.subtitle':
      'בחירת מועד פנוי דרך יומן Google, ובהמשך אצור קשר לאישור.',
    'about.approach.lead':
      'הגישה שלי משלבת הסברים ברורים, סדר, סבלנות ותרגול ממוקד, כדי לעזור לכל תלמיד להבין את החומר באמת, לצמצם פערים, להתחזק לקראת מבחנים ולבנות ביטחון.',
    'about.highlights.title': 'במה אני מביאה ניסיון',
    'about.highlight.degree.title': 'תואר אקדמי בהנדסת תוכנה',
    'about.highlight.degree.desc': 'רקע אקדמי מדויק שמתורגם להוראה ברורה ושיטתית.',
    'about.highlight.experience.title': 'ניסיון בהוראה ובהכנה לבגרויות',
    'about.highlight.experience.desc': 'שנים של ליווי תלמידים אל הבגרות בלשון ובמתמטיקה.',
    'about.highlight.hebrew.title': 'התמחות בלשון',
    'about.highlight.hebrew.desc': 'מערכת הצורות, שם המספר, הבנת הנקרא וכתיבה ממזגת.',
    'about.highlight.math.title': 'ליווי גם במתמטיקה',
    'about.highlight.math.desc': 'אלגברה, פונקציות, גיאומטריה והכנה למבחנים.',

    // FAQ
    'faq.eyebrow': 'מה כדאי לדעת',
    'faq.title': 'שאלות נפוצות',
    'faq.subtitle': 'התשובות הנפוצות ביותר על השיעורים',
    'faq.cta.text': 'יש לכם עוד שאלה? אפשר פשוט לקבוע שיעור היכרות.',
    'faq.q1.q': 'האם השיעורים אונליין או פרונטליים?',
    'faq.q1.a':
      'השיעורים מתקיימים אונליין בלבד. ניתן לקבוע שיחת תיאום ציפיות קצרה כדי להבין יחד על מה כדאי לעבוד, במה להתמקד בשיעורים ומה חשוב לחזק.',
    'faq.q2.q': 'כמה זמן נמשך שיעור?',
    'faq.q2.a': 'שיעור נמשך 60 דקות.',
    'faq.q3.q': 'האם אפשר להתכונן לבגרות בלשון?',
    'faq.q3.a':
      'בהחלט. יש מסלול ייעודי להכנה לבגרות בלשון: מערכת הצורות, שם המספר, הבנת הנקרא וכתיבה ממזגת.',
    'faq.q4.q': 'האם יש שיעורים במתמטיקה?',
    'faq.q4.a':
      'כן. ניתן לקבל ליווי במתמטיקה לפי רמת התלמיד והצורך שלו, בעיקר בחיזוק יסודות, אלגברה, פונקציות, גיאומטריה, הסתברות והכנה למבחנים.',
    'faq.q5.q': 'מה קורה אחרי שקובעים שיעור?',
    'faq.q5.a':
      'לאחר בחירת מועד ביומן Google תתקבל הודעת אישור למייל, ואני אצור קשר במידת הצורך לתיאום פרטים נוספים ולשליחת קישור לשיעור.',
    'faq.q7.q': 'איך קובעים שיעור?',
    'faq.q7.a':
      'לוחצים על "בחירת מועד לשיעור", בוחרים זמן פנוי ביומן Google וממלאים פרטים. לאחר הקביעה תתקבל הודעת אישור למייל.',
    'faq.q6.q': 'האם אפשר לקבוע מפגש ניסיון?',
    'faq.q6.a':
      'כן. אפשר לקבוע מפגש היכרות שבו בודקים יחד מה התלמיד צריך ובאיזה קצב נתקדם.',

    // Contact
    'whatsapp.aria': 'פתיחת שיחה בוואטסאפ',
    'contact.title': 'יצירת קשר',
    'contact.subtitle':
      'אשמח לשמוע ממכם, להבין במה התלמיד צריך עזרה, ולעזור לכם לבחור את הדרך הנכונה להתחיל.',
    'contact.phone': 'טלפון',
    'contact.phone.value': '050-886-6512',
    'contact.email': 'אימייל',
    'contact.email.value': 'bathen035@gmail.com',
    'contact.whatsapp': 'WhatsApp',
    'contact.whatsapp.value': '050-886-6512',
    'contact.whatsapp.cta': 'שליחת הודעה ב-WhatsApp',

    // Packages
    'packages.eyebrow': 'מסלולים גמישים',
    'packages.title': 'מסלולי לימוד',
    'packages.subtitle': 'בחירת המסלול שמתאים לתלמיד',
    'package.single.title': 'שיעור היכרות',
    'package.single.desc':
      'שיעור ראשון להכיר את התלמיד, לאתר את הצרכים ולבנות יחד תכנית למידה.',
    'package.single.recommended': 'מתאים לתחילת ליווי',
    'package.fivePack.title': 'שיעור ממוקד לפני מבחן',
    'package.fivePack.desc':
      'שיעור ממוקד שעוזר להגיע מוכנים למבחן: חזרה על נושאים מרכזיים ופתרון שאלונים.',
    'package.fivePack.recommended': 'מתאים לחיזוק לפני מבחן',
    'package.bagrutFocus.title': 'ליווי קבוע לבגרות',
    'package.bagrutFocus.desc':
      'מסלול ליווי קבוע שמכין לבגרות לאורך זמן, עם חזרה ממוקדת והתקדמות הדרגתית.',
    'package.bagrutFocus.recommended': 'מתאים לשנה י׳-י״ב',
    'package.cta': 'קביעת שיעור',
    'package.duration': 'משך השיעור',
    'package.recommendedFor': 'מתאים ל',
    'package.popular': 'הכי פופולרי',

    // Testimonials
    'testimonials.eyebrow': 'משוב אמיתי',
    'testimonials.title': 'משוב מתלמידים והורים',

    // Footer
    'footer.tagline':
      'שיעורים פרטיים בלשון ומתמטיקה — בדגש על לשון.',
    'footer.contact': 'יצירת קשר',
    'footer.quickLinks': 'קישורים מהירים',
    'footer.copyright': 'כל הזכויות שמורות',

    // Common
    'common.optional': 'לא חובה',
    'common.skip': 'דילוג',
    'common.next': 'הבא',
    'common.back': 'חזרה',
    'common.minutes': 'דקות',
    'common.bagrutNote': 'בגרות = בחינת הסיום הישראלית.',
  },
  en: {
    // Brand & nav
    'brand.name': 'Navso',
    'brand.tagline': 'Private tutoring for you',
    'page.title': 'Navso Private Tutoring',
    'profile.name': 'Bathen Abraham',
    'profile.role': 'Private Hebrew and Math Tutor',
    'profile.tagline': 'Exam preparation · Online lessons',
    'profile.alt': 'Bathen Abraham, private Hebrew and Math tutor',
    'nav.home': 'Home',
    'nav.subjects': 'Subjects',
    'nav.booking': 'Book a Lesson',
    'nav.about': 'About',
    'nav.faq': 'FAQ',
    'nav.admin': 'Admin',
    'lang.toggleHe': 'עברית',
    'lang.toggleEn': 'English',
    'lang.label': 'Language',

    // Hero
    'home.hero.eyebrow': 'Hebrew language focused · math also available',
    'home.hero.titleLead': 'Private tutoring in',
    'home.hero.titleAccent': 'Hebrew language',
    'home.hero.titleTail': 'and math',
    'home.hero.title': 'Private Hebrew and Math Tutoring',
    'home.hero.proof':
      'Tutoring students from elementary school through Bagrut preparation · Online only',
    'home.hero.badge.zoom': 'Online only',
    'home.hero.badge.bagrut': 'Focused Bagrut prep',
    'home.hero.badge.pace': 'At the student’s pace',
    'home.hero.subtitle':
      'The main focus is Hebrew language tutoring: Hebrew morphology, number agreement, reading comprehension, integrated writing, and Bagrut (Israeli matriculation exam) preparation. In addition, math lessons are available for every level, including strengthening foundations, preparing for exams, and learning at the student’s pace.',
    'home.cta.book': 'Choose a lesson time',
    'home.cta.viewPackages': 'View Lesson Options',
    'home.cta.calendarHelper':
      'Booking is done through Google Calendar based on available times.',
    'cta.calendar': 'Choose a lesson time',
    'cta.calendar.long': 'Open calendar booking',

    // Why study with me (home)
    'home.why.eyebrow': 'What you get',
    'home.why.title': 'Why study with me?',
    'home.why.subtitle':
      'A calm, structured, personal approach that works for every student.',
    'home.why.c1.title': 'Clear and simple explanations',
    'home.why.c1.desc':
      'Every concept is broken into small steps with real-life examples until it really clicks.',
    'home.why.c2.title': 'Focused exam preparation',
    'home.why.c2.desc':
      'We work on the exam format, time management, and practice papers — exactly what is tested.',
    'home.why.c3.title': 'Building learning confidence',
    'home.why.c3.desc':
      'A supportive, no-pressure environment where students can ask anything and grow.',
    'home.why.c4.title': 'Personal guidance at the student’s pace',
    'home.why.c4.desc':
      'Every lesson is planned around what the student needs now, not a fixed curriculum.',

    // How booking works preview (home)
    'home.how.eyebrow': 'How booking works',
    'home.how.title': 'Simple booking through Google Calendar',
    'home.how.subtitle':
      'Three short steps and the lesson is booked, with a confirmation email on its way.',
    'home.how.s1': 'Choose an available time',
    'home.how.s2': 'Fill in your details',
    'home.how.s3': 'Receive an email confirmation',

    // Improve section
    'home.improve.eyebrow': 'Core topics',
    'home.improve.title': 'What can you improve?',
    'home.improve.subtitle': 'Topics you can book a private lesson for',
    'home.improve.hebrewLead':
      'The main focus is Hebrew. In addition, math tutoring is also available.',
    'home.improve.mathLabel': 'Math also',

    // Quick info card
    'home.info.focus': 'Main focus',
    'home.info.focusValue':
      'Private Hebrew and Math tutoring — with an emphasis on Hebrew.',
    'home.info.suitableFor': 'Suitable for',
    'home.info.suitableForValue':
      'Elementary · Middle school · High school · Bagrut preparation',
    'home.info.lessonType': 'Lesson type',
    'home.info.lessonTypeValue': 'Online only',
    'home.info.duration': 'Lesson duration',
    'home.info.durationValue': '60 minutes',
    // Hero trust bullets
    'home.trust.title': 'Why it works',
    'home.trust.b1': 'Online only',
    'home.trust.b2': '60 minutes per lesson',
    'home.trust.b3': 'Hebrew-focused tutoring',
    'home.trust.b4': 'Exam preparation',
    'home.trust.b5': 'Math support available',

    // Subjects (top-level)
    'subject.hebrew': 'Hebrew language',
    'subject.math': 'Math',
    'subject.hebrew.short': 'Hebrew',
    'subject.math.short': 'Math',

    // Hebrew topics
    'topic.morphology.title': 'Hebrew morphology / word formation',
    'topic.morphology.desc':
      'Verb patterns (binyanim), root systems, and noun forms — building a clear understanding of Hebrew word formation.',
    'topic.numbers.title': 'Hebrew numbers and number agreement',
    'topic.numbers.desc':
      'Gender and number agreement, and the rules for spelling and pronouncing Hebrew numbers.',
    'topic.reading.title': 'Reading comprehension',
    'topic.reading.desc':
      'Strategies for focused reading and answering questions on Hebrew texts.',
    'topic.integratedWriting.title': 'Integrated writing',
    'topic.integratedWriting.desc':
      'Combining several texts into one piece of writing, organising ideas, and building an argument.',
    'topic.bagrut.title': 'Hebrew Bagrut preparation',
    'topic.bagrut.desc':
      'Bagrut (Israeli matriculation exam) structure, time management, focused review, and practice papers.',

    // Math topics
    'topic.algebra.title': 'Basic algebra',
    'topic.algebra.desc':
      'Equations, inequalities, algebraic expressions and a strong foundation in the basics.',
    'topic.functions.title': 'Functions',
    'topic.functions.desc':
      'Linear and quadratic functions, graphs, intersections and domains.',
    'topic.geometry.title': 'Geometry',
    'topic.geometry.desc': 'Key theorems, triangles, quadrilaterals and area.',
    'topic.probability.title': 'Probability',
    'topic.probability.desc':
      'Sample spaces, events, and the addition and multiplication rules.',
    'topic.examPrep.title': 'Exam preparation',
    'topic.examPrep.desc':
      'Practice papers, focused review of core topics, and exam strategy.',
    'topic.general.title': 'General lesson',
    'topic.general.short': 'General',
    'topic.general.desc':
      'Not sure what should be strengthened first? We will start with a short needs check, understand where the student is struggling, and build a structured learning plan based on the student’s pace.',

    // Difficulty
    'difficulty.beginner': 'Beginner',
    'difficulty.intermediate': 'Intermediate',
    'difficulty.advanced': 'Advanced',
    'difficulty.label': 'Difficulty',
    'duration.recommended': 'Recommended length',
    'duration.minutes': 'minutes',

    // Lesson type
    'lessonType.online': 'Online only',
    'lessonType.inPerson': 'In person',
    'lessonType.fixed': 'Online only',

    // Student level
    'level.elementary': 'Elementary school',
    'level.middleSchool': 'Middle school',
    'level.highSchool': 'High school',
    'level.bagrutPrep': 'Exam / Bagrut preparation',

    // Subjects page
    'subjects.eyebrow': 'What you can learn',
    'subjects.title': 'Our subjects',
    'subjects.subtitle':
      'The main focus is Hebrew. In addition, math tutoring is also available.',
    'subjects.hebrew.title': 'Hebrew language tutoring',
    'subjects.hebrew.subtitle': 'The core topics we will study together',
    'subjects.math.title': 'Math tutoring',
    'subjects.math.subtitle':
      'Practice for every level — from elementary school through Bagrut preparation',

    // Booking page
    'booking.eyebrow': 'Google Calendar',
    'booking.title': 'Choose a lesson time',
    'booking.subtitle':
      'Choose an available time through Google Calendar. After booking, the lesson will be added to the calendar and a confirmation email will be sent.',
    'booking.steps.title': 'How it works',
    'booking.steps.s1': 'Choose an available time',
    'booking.steps.s2': 'Fill in your details',
    'booking.steps.s3': 'Receive an email confirmation',
    'booking.calendar.aside.title': 'Length and availability',
    'booking.calendar.aside.duration': 'Each lesson is 60 minutes',
    'booking.calendar.aside.online': 'Online only',
    'booking.calendar.aside.tz':
      'Times in Google Calendar are shown in Israel time.',
    'booking.step.subject': 'Main subject',
    'booking.step.topic': 'Topic',
    'booking.step.lessonType': 'Lesson type',
    'booking.step.duration': 'Duration',
    'booking.step.level': 'Student level',
    'booking.step.dateTime': 'Date and time',
    'booking.step.lessonInfo': 'Lesson info',
    'booking.step.details': 'Student details',
    'booking.dateTime.hint': 'Times are shown in Israel time.',
    'booking.dateTime.label': 'Choose a time',
    'booking.dateTime.empty':
      'No open slots in the near future. You can reach out on WhatsApp to arrange a custom time.',
    'tz.israel': 'Israel time',
    'tz.california': 'California time',
    'booking.day.saturday': 'Saturday',
    'booking.field.fullName': 'Full name',
    'booking.field.phone': 'Phone',
    'booking.field.email': 'Email',
    'booking.field.notes': 'Notes / What does the student need help with?',
    'booking.field.notes.placeholder':
      'For example: wants to strengthen Hebrew morphology, has a Bagrut in a month...',
    'booking.field.notes.placeholder.general':
      'Write what you would like to focus on or what the student is struggling with',
    'booking.field.notes.hint.general':
      'You picked a general lesson — it really helps to write here what you would like to focus on or what the student is struggling with.',
    'booking.submit': 'Confirm booking',
    'booking.submitNote': 'After you submit, I will reach out to confirm the details and send the lesson link.',
    'booking.required': 'Required field',
    'booking.invalid.email': 'Please enter a valid email address',
    'booking.invalid.phone': 'Please enter a valid phone number',
    'booking.choose': 'Choose',
    'booking.choose.subject': 'Choose a main subject',
    'booking.choose.subjectFirst': 'Choose a main subject first',
    'booking.choose.topic': 'Choose a topic',
    'booking.choose.level': 'Choose the student level',
    'booking.choose.timeFirst': 'Choose a date and time',
    'booking.day.sunday': 'Sunday',
    'booking.day.monday': 'Monday',
    'booking.day.tuesday': 'Tuesday',
    'booking.day.wednesday': 'Wednesday',
    'booking.day.thursday': 'Thursday',
    'booking.day.friday': 'Friday',

    // Confirmation
    'confirm.title': 'Thank you, your lesson was booked successfully',
    'confirm.subtitle':
      'After booking, I will contact you by phone or email for final confirmation and to send the lesson link.',
    'confirm.lessonTime': 'Lesson time',
    'confirm.bookingId': 'Booking ID',
    'confirm.subject': 'Main subject',
    'confirm.topic': 'Topic',
    'confirm.lessonType': 'Lesson type',
    'confirm.duration': 'Duration',
    'confirm.level': 'Level',
    'confirm.date': 'Date',
    'confirm.time': 'Time',
    'confirm.fullName': 'Name',
    'confirm.phone': 'Phone',
    'confirm.email': 'Email',
    'confirm.notes': 'Notes',
    'confirm.backHome': 'Back to home',
    'confirm.bookAnother': 'Book another lesson',
    'confirm.notFound.title': 'No booking found',
    'confirm.notFound.subtitle': 'You can go back home or book a new lesson.',

    // Admin
    'admin.eyebrow': 'Demo dashboard',
    'admin.title': 'Tutor dashboard',
    'admin.subtitle': 'Internal demo bookings. Real bookings are managed in Google Calendar.',
    'admin.demoNote':
      'This page only shows demo bookings saved in this browser. Real bookings are managed in Google Calendar.',
    'demoBooking.note':
      'Internal test form — real bookings are made through Google Calendar.',
    'admin.stats.total': 'Total bookings',
    'admin.stats.hebrew': 'Hebrew lessons',
    'admin.stats.math': 'Math lessons',
    'admin.stats.thisWeek': 'Lessons this week',
    'admin.filter.subject': 'Filter by subject',
    'admin.filter.status': 'Filter by status',
    'admin.filter.all': 'All',
    'admin.empty.title': 'No bookings yet',
    'admin.empty.subtitle':
      'Once new bookings are made on the site, they will appear here automatically.',
    'admin.noResults.title': 'No matching bookings',
    'admin.noResults.subtitle': 'Try clearing the filters to see every booking.',
    'admin.noResults.clear': 'Clear filters',
    'admin.action.delete': 'Delete',
    'admin.action.confirmDelete': 'Delete this booking?',
    'admin.table.student': 'Student',
    'admin.table.subject': 'Subject',
    'admin.table.topic': 'Topic',
    'admin.table.dateTime': 'Date & time',
    'admin.table.contact': 'Contact',
    'admin.table.status': 'Status',
    'admin.table.actions': 'Actions',
    'status.new': 'New',
    'status.confirmed': 'Confirmed',
    'status.cancelled': 'Cancelled',

    // About
    'about.title': 'About',
    'about.lead':
      'I am a private Hebrew and Math tutor with an academic degree in Software Engineering and experience in teaching and exam preparation. In recent years, I have guided students through a personal and structured learning process, mainly in Hebrew language and also in Math.',
    'about.p1':
      'My focus is to guide students in a clear, calm, and organized way, break the material into simple steps, and build confidence through practice and real understanding.',
    'about.p2':
      'In the Hebrew lessons, we work on Hebrew morphology, number agreement, reading comprehension, integrated writing, and focused preparation for the Hebrew Bagrut / Israeli matriculation exam.',
    'about.p3':
      'In addition, I offer math support for every level, including basic algebra, functions, geometry, probability, and exam preparation.',
    'about.p4':
      'My goal is to help students build confidence, make the material clear, and arrive prepared for exams and Bagrut. Over the years, I have guided students who achieved meaningful improvement in their grades, understanding, and confidence.',
    'about.values.title': 'What I care about in a lesson',
    'about.value.clarity.title': 'Clarity',
    'about.value.clarity.desc':
      'I explain every concept in several ways, until it clicks.',
    'about.value.pace.title': 'Personal pace',
    'about.value.pace.desc':
      'I match the pace to the student, not the other way around.',
    'about.value.confidence.title': 'Confidence',
    'about.value.confidence.desc':
      'We practice together until the student feels at home with the material.',
    'about.eyebrow': 'Get to know me',
    'about.section.credentials': 'Background and experience',
    'about.section.approach': 'My teaching approach',
    'about.section.subjects': 'What we work on',
    'about.section.cta': 'Ready to start?',
    'about.section.cta.subtitle':
      'Pick an available time on Google Calendar, and I will follow up to confirm.',
    'about.approach.lead':
      'My approach combines clear explanations, structure, patience, and focused practice, helping each student truly understand the material, close learning gaps, prepare for exams, and build confidence.',
    'about.highlights.title': 'What I bring to the lessons',
    'about.highlight.degree.title': 'Software Engineering degree',
    'about.highlight.degree.desc':
      'A precise academic background that translates into clear, methodical teaching.',
    'about.highlight.experience.title': 'Teaching and Bagrut prep experience',
    'about.highlight.experience.desc':
      'Years of guiding students through the Bagrut in Hebrew and math.',
    'about.highlight.hebrew.title': 'Hebrew language specialty',
    'about.highlight.hebrew.desc':
      'Hebrew morphology, number agreement, reading comprehension and integrated writing.',
    'about.highlight.math.title': 'Also math support',
    'about.highlight.math.desc':
      'Algebra, functions, geometry and exam preparation.',

    // FAQ
    'faq.eyebrow': 'Good to know',
    'faq.title': 'Frequently asked questions',
    'faq.subtitle': 'The most common questions about lessons',
    'faq.cta.text': 'Still have a question? You can simply book an introductory lesson.',
    'faq.q1.q': 'Are the lessons online or in person?',
    'faq.q1.a':
      'The lessons are online only. A short expectation-setting call can be scheduled to understand what the student needs, what to focus on during the lessons, and which areas should be strengthened.',
    'faq.q2.q': 'How long is each lesson?',
    'faq.q2.a': 'Each lesson lasts 60 minutes.',
    'faq.q3.q': 'Can I prepare for the Bagrut in Hebrew language?',
    'faq.q3.a':
      'Absolutely. There is a dedicated track for the Hebrew Bagrut: morphology, numbers and number agreement, reading comprehension and integrated writing. Bagrut means the Israeli matriculation exam.',
    'faq.q4.q': 'Are math lessons available?',
    'faq.q4.a':
      'Yes. Math tutoring is available according to the student’s level and needs, mainly for strengthening foundations, algebra, functions, geometry, probability, and exam preparation.',
    'faq.q5.q': 'What happens after booking a lesson?',
    'faq.q5.a':
      'After choosing a time in Google Calendar, you will receive a confirmation email. I will contact you if needed to coordinate any additional details and send the lesson link.',
    'faq.q7.q': 'How do I book a lesson?',
    'faq.q7.a':
      'Click "Choose a lesson time", select an available time in Google Calendar, and fill in your details. After booking, you will receive a confirmation email.',
    'faq.q6.q': 'Can I schedule an introductory meeting?',
    'faq.q6.a':
      'Yes. You can schedule an introductory meeting where we check together what the student needs and what pace would be right for the lessons.',

    // Contact
    'whatsapp.aria': 'Open WhatsApp chat',
    'contact.title': 'Get in touch',
    'contact.subtitle':
      'I’d be happy to hear from you, understand what the student needs help with, and help you choose the right way to begin.',
    'contact.phone': 'Phone',
    'contact.phone.value': '408-513-7096',
    'contact.email': 'Email',
    'contact.email.value': 'bathen035@gmail.com',
    'contact.whatsapp': 'WhatsApp',
    'contact.whatsapp.value': '050-886-6512',
    'contact.whatsapp.cta': 'Send a WhatsApp message',

    // Packages
    'packages.eyebrow': 'Flexible options',
    'packages.title': 'Lesson packages',
    'packages.subtitle': 'Pick the option that fits the student',
    'package.single.title': 'Introductory lesson',
    'package.single.desc':
      'A first lesson to get to know the student, identify their needs and build a learning plan together.',
    'package.single.recommended': 'Great for starting tutoring',
    'package.fivePack.title': 'Focused lesson before an exam',
    'package.fivePack.desc':
      'A focused lesson that helps the student arrive prepared: review of key topics and practice papers.',
    'package.fivePack.recommended': 'Great for pre-exam strengthening',
    'package.bagrutFocus.title': 'Ongoing Bagrut preparation',
    'package.bagrutFocus.desc':
      'An ongoing tutoring track that prepares the student for the Bagrut (Israeli matriculation exam) over time, with focused review and steady progress.',
    'package.bagrutFocus.recommended': 'Great for grades 10–12',
    'package.cta': 'Book a lesson',
    'package.duration': 'Lesson duration',
    'package.recommendedFor': 'Best for',
    'package.popular': 'Most popular',

    // Testimonials
    'testimonials.eyebrow': 'Real feedback',
    'testimonials.title': 'Feedback from students and parents',

    // Footer
    'footer.tagline':
      'Private tutoring in Hebrew and Math — with an emphasis on Hebrew.',
    'footer.contact': 'Contact',
    'footer.quickLinks': 'Quick links',
    'footer.copyright': 'All rights reserved',

    // Common
    'common.optional': 'Optional',
    'common.skip': 'Skip',
    'common.next': 'Next',
    'common.back': 'Back',
    'common.minutes': 'minutes',
    'common.bagrutNote': 'Bagrut means the Israeli matriculation exam.',
  },
};

export type TranslationKey = string;

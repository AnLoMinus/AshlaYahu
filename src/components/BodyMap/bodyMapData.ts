export type RegionId = 'head' | 'chest' | 'stomach' | 'nervous' | 'root';
export type ViewMode = 'physical' | 'energetic';

export interface Impact {
  substance: string;
  effect: string;
  severity: 'high' | 'medium' | 'low';
}

export interface Healer {
  substitute: string;
  effect: string;
  type: 'plants' | 'breathing' | 'meditation' | 'music' | 'movement' | 'other';
}

export interface BodyRegion {
  id: RegionId;
  name: string;
  energeticName: string;
  description: string;
  energeticDescription: string;
  chemicalImpacts: Impact[];
  naturalHealers: Healer[];
  color: string;
  cy: number; // For SVG positioning
}

export const bodyRegions: BodyRegion[] = [
  {
    id: 'head',
    name: 'מוח ומערכת העצבים המרכזית',
    energeticName: 'עין שלישית וכתר (תודעה וחיבור)',
    description: 'המרכז הקוגניטיבי, אחראי על עיבוד חושים, מחשבות, זיכרון וויסות מצב רוח.',
    energeticDescription: 'מרכז האינטואיציה, הראייה הרוחנית והחיבור לאני העליון וליקום.',
    color: 'text-purple-400',
    cy: 40,
    chemicalImpacts: [
      { substance: 'MDMA', effect: 'ריקון מאגרי סרוטונין, "שריפת" קולטנים, דיכאון ביום שאחרי (דאון).', severity: 'high' },
      { substance: 'קוקאין', effect: 'הצפת דופמין מלאכותית, פגיעה במערכת התגמול הטבעית, חרדה ופראנויה.', severity: 'high' },
      { substance: 'LSD / פטריות', effect: 'עומס יתר על רשת ברירת המחדל (DMN), סכנה ל-HPPD (הפרעת תפיסה מתמשכת).', severity: 'medium' }
    ],
    naturalHealers: [
      { substitute: 'מדיטציית ויפאסנה', effect: 'איזון רשת ה-DMN באופן טבעי, הגברת מודעות ונוכחות.', type: 'meditation' },
      { substitute: 'פטריית רעמת האריה (Lion\'s Mane)', effect: 'עידוד צמיחת תאי עצב (NGF), שיפור פוקוס וזיכרון.', type: 'plants' },
      { substitute: 'תדרי סולפג\'יו (852Hz)', effect: 'פתיחת העין השלישית, איזון גלי מוח (אלפא ותטא).', type: 'music' }
    ]
  },
  {
    id: 'chest',
    name: 'לב, ריאות ומערכת הדם',
    energeticName: 'צ\'אקרת הלב (אהבה וחמלה)',
    description: 'אחראי על הזרמת חמצן ודם לכל הגוף, ויסות לחץ דם ודופק.',
    energeticDescription: 'מרכז האהבה ללא תנאי, קבלה עצמית, חמלה וחיבור רגשי לאחרים.',
    color: 'text-emerald-400',
    cy: 120,
    chemicalImpacts: [
      { substance: 'קוקאין / 3-MMC', effect: 'כיווץ כלי דם, דופק מואץ באופן מסוכן, עומס חריג על שריר הלב.', severity: 'high' },
      { substance: 'קטמין', effect: 'עלייה בלחץ הדם וקצב הלב, ניתוק מתחושות אזהרה פיזיות.', severity: 'medium' },
      { substance: 'קנאביס (עישון)', effect: 'גירוי דרכי הנשימה, פגיעה בקיבולת הריאות (בעישון ממושך).', severity: 'low' }
    ],
    naturalHealers: [
      { substitute: 'קקאו טקסי (Ceremonial Cacao)', effect: 'מרחיב כלי דם (Vasodilator), פותח את הלב הפיזי והאנרגטי.', type: 'plants' },
      { substitute: 'נשימה מעגלית (Rebirthing)', effect: 'שחרור חסימות רגשיות מבית החזה, הגדלת נפח נשימה.', type: 'breathing' },
      { substitute: 'עוזרר (Hawthorn)', effect: 'צמח מרפא המחזק את שריר הלב ומאזן לחץ דם.', type: 'plants' }
    ]
  },
  {
    id: 'stomach',
    name: 'מערכת העיכול והכבד',
    energeticName: 'מקלעת השמש (כוח רצון וביטחון)',
    description: 'אחראי על פירוק רעלים, ספיגת חומרים מזינים וייצור רוב הסרוטונין בגוף.',
    energeticDescription: 'מרכז העוצמה האישית, האגו, הביטחון העצמי ויכולת הפעולה בעולם.',
    color: 'text-yellow-400',
    cy: 200,
    chemicalImpacts: [
      { substance: 'אלכוהול', effect: 'הרעלת כבד, פגיעה במיקרוביום של המעיים, דלקתיות.', severity: 'high' },
      { substance: 'MDMA / אמפטמינים', effect: 'דיכוי תיאבון קיצוני, פגיעה ברירית הקיבה, בחילות.', severity: 'medium' },
      { substance: 'איוואסקה', effect: 'הקאות ושלשולים (Purge) כחלק מתהליך הניקוי, עומס זמני על הכבד.', severity: 'medium' }
    ],
    naturalHealers: [
      { substitute: 'תזונה נקייה וצום לסירוגין', effect: 'ניקוי הכבד, שיקום המיקרוביום וייצור סרוטונין טבעי במעיים.', type: 'other' },
      { substitute: 'גדילן מצוי (Milk Thistle)', effect: 'שיקום תאי כבד וניקוי רעלים מהמערכת.', type: 'plants' },
      { substitute: 'נשימת אש (Breath of Fire)', effect: 'חימום מערכת העיכול, המרצת חילוף חומרים וחיזוק הביטחון.', type: 'breathing' }
    ]
  },
  {
    id: 'root',
    name: 'כליות, שלפוחית ובסיס הגוף',
    energeticName: 'צ\'אקרת השורש והמין (קרקוע ויצירה)',
    description: 'סינון רעלים מהדם, הפרשת פסולת, ומערכת הרבייה.',
    energeticDescription: 'מרכז ההישרדות, תחושת הביטחון בעולם, קרקוע, ויצריות/יצירתיות.',
    color: 'text-red-400',
    cy: 280,
    chemicalImpacts: [
      { substance: 'קטמין', effect: 'נזק בלתי הפיך לשלפוחית השתן (Ketamine Bladder Syndrome), כאבים עזים.', severity: 'high' },
      { substance: 'MDMA', effect: 'אצירת שתן (קושי לתת שתן), סכנת הרעלת מים (היפונתרמיה).', severity: 'high' },
      { substance: 'ספידים / 3-MMC', effect: 'כיווץ כלי דם בפריפריה, פגיעה בתפקוד המיני (Stim Dick).', severity: 'medium' }
    ],
    naturalHealers: [
      { substitute: 'הליכה יחפה על אדמה (Grounding)', effect: 'פריקת חשמל סטטי, חיבור לתדר האדמה וקרקוע מערכת העצבים.', type: 'movement' },
      { substitute: 'מאקה (Maca Root)', effect: 'איזון הורמונלי, שיפור זרימת דם לאגן וחיזוק האנרגיה המינית באופן טבעי.', type: 'plants' },
      { substitute: 'יוגה קונדליני', effect: 'הנעת אנרגיית החיים מבסיס עמוד השדרה כלפי מעלה.', type: 'movement' }
    ]
  }
];

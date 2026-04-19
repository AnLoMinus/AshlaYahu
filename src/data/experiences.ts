export type ExperienceCategory = 'psychedelic' | 'stimulant' | 'relaxant' | 'euphoric' | 'dissociative';

export interface HolySubstitute {
  type: 'plants' | 'breathing' | 'meditation' | 'music' | 'movement' | 'other';
  name: string;
  description: string;
  icon?: string;
}

export interface ExperienceRating {
  intensity: number; // 1-10
  awareness: number; // 1-10
  cognitive: number; // 1-10
  emotional: number; // 1-10
  naturalness: number; // 1-10
}

export type BodyPart = 'brain' | 'heart' | 'lungs' | 'stomach' | 'muscles' | 'nervous_system' | 'eyes' | 'mouth' | 'skin';

export interface Experience {
  id: string;
  name: string;
  category: ExperienceCategory;
  shortDescription: string;
  duration: string;
  intensityScale: string;
  activeIngredients: string[];
  brainEffect: string;
  mechanism: string;
  positiveEffects: string[];
  risks: string[];
  sideEffects: string[];
  rating: ExperienceRating;
  substitutes: HolySubstitute[];
  affectedBodyParts: BodyPart[];
}

export const categories = [
  { id: 'psychedelic', name: '🧠 פסיכדליות', icon: 'Brain', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'stimulant', name: '⚡ ממריצים', icon: 'Zap', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { id: 'relaxant', name: '😴 מרגיעים', icon: 'Moon', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'euphoric', name: '🎭 אופוריים', icon: 'Smile', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'dissociative', name: '🌌 דיסוציאטיביים', icon: 'Cloud', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
];

export const experiences: Experience[] = [
  {
    id: 'exp_cannabis_relax',
    name: 'קנאביס (אינדיקה / מרגיע)',
    category: 'relaxant',
    shortDescription: 'תחושת כבדות נעימה, האטה של המחשבות וחיבור פיזי עמוק.',
    duration: '2-4 שעות',
    intensityScale: 'בינונית',
    activeIngredients: ['THC', 'CBD', 'טרפנים (מירסן, לינלול)'],
    brainEffect: 'הפעלת המערכת האנדוקנבינואידית, שחרור דופמין מתון והאטת פעילות עצבית.',
    mechanism: 'נקשר לקולטני CB1 במוח, מה שגורם לירידה בשחרור נוירוטרנסמיטורים מסוימים ומשרה רוגע.',
    positiveEffects: ['הרפיית שרירים', 'שיכוך כאבים', 'הפחתת חרדה (במינונים מסוימים)', 'שיפור תיאבון'],
    risks: ['תלות פסיכולוגית', 'פגיעה בזיכרון לטווח קצר', 'עייפות כרונית'],
    sideEffects: ['יובש בפה', 'עיניים אדומות', 'דופק מואץ (לפעמים)', 'חרדה (במינון יתר)'],
    rating: {
      intensity: 5,
      awareness: 4,
      cognitive: 3,
      emotional: 6,
      naturalness: 8
    },
    substitutes: [
      { type: 'plants', name: 'קמומיל כפול ופסיפלורה', description: 'חליטה חזקה של צמחים מרגיעים הפועלים על קולטני GABA.' },
      { type: 'breathing', name: 'נשימות 4-7-8', description: 'טכניקת נשימה שמפעילה את המערכת הפאראסימפתטית ומורידה דופק.' },
      { type: 'meditation', name: 'יוגה נידרה (Yoga Nidra)', description: 'מדיטציית שינה עמוקה שמביאה את הגוף להרפיה טוטאלית.' },
      { type: 'music', name: 'תדרי סולפג\'יו (432Hz)', description: 'האזנה לתדרים נמוכים שמעודדים גלי אלפא ותטא במוח.' }
    ],
    affectedBodyParts: ['brain', 'muscles', 'eyes', 'mouth']
  },
  {
    id: 'exp_mdma_euphoria',
    name: 'אמפתוגנים (סגנון MDMA)',
    category: 'euphoric',
    shortDescription: 'פרץ אדיר של אהבה, אמפתיה, חיבור חברתי ואופוריה.',
    duration: '3-6 שעות',
    intensityScale: 'גבוהה',
    activeIngredients: ['MDMA (במקור)', 'סרוטונין (אנדוגני)'],
    brainEffect: 'הצפה מסיבית של סרוטונין, דופמין ונוראדרנלין, יחד עם שחרור אוקסיטוצין.',
    mechanism: 'היפוך פעולת נשאי הסרוטונין, מה שגורם לשחרור מאגרי הסרוטונין לתוך הסינפסה.',
    positiveEffects: ['אופוריה עזה', 'פתיחות רגשית', 'חיבור עמוק לאחרים', 'הפחתת פחד'],
    risks: ['רעילות עצבית (בשימוש תדיר)', 'התייבשות או הרעלת מים', 'דיכאון של "היום שאחרי"'],
    sideEffects: ['נעילת לסתות', 'הזעה', 'קושי במתן שתן', 'חוסר תיאבון'],
    rating: {
      intensity: 9,
      awareness: 6,
      cognitive: 5,
      emotional: 10,
      naturalness: 2
    },
    substitutes: [
      { type: 'movement', name: 'Ecstatic Dance', description: 'ריקוד חופשי בקהילה שמעורר שחרור אנדורפינים ואוקסיטוצין טבעי.' },
      { type: 'plants', name: 'קקאו טקסי (Ceremonial Cacao)', description: 'מכיל תיאוברומין ואננדמיד ("מולקולת האושר") שפותחים את הלב.' },
      { type: 'breathing', name: 'נשימה מעגלית (Rebirthing)', description: 'נשימה מודעת ורציפה שמשחררת חסימות רגשיות ומייצרת אופוריה טבעית.' },
      { type: 'other', name: 'מעגלי שירה (Kirtan)', description: 'שירה משותפת שמעלה את התדר הקבוצתי ומשחררת אוקסיטוצין.' }
    ],
    affectedBodyParts: ['brain', 'heart', 'muscles', 'skin']
  },
  {
    id: 'exp_psilocybin_psych',
    name: 'פסיכדליה (סגנון פטריות/LSD)',
    category: 'psychedelic',
    shortDescription: 'מסע עמוק אל תוך התודעה, שינוי תפיסת המציאות וחיבור ליקום.',
    duration: '4-12 שעות',
    intensityScale: 'גבוהה מאוד',
    activeIngredients: ['פסילוציבין', 'פסילוצין', 'LSD'],
    brainEffect: 'הפחתת פעילות ב-DMN (רשת ברירת המחדל) ויצירת חיבורים חדשים בין אזורי מוח.',
    mechanism: 'הפעלה של קולטני סרוטונין 5-HT2A בקליפת המוח הקדם-מצחית.',
    positiveEffects: ['תובנות רוחניות', 'המספר האגו', 'חיבור לטבע', 'יצירתיות מוגברת'],
    risks: ['"טריפ רע" (חרדה/פראנויה)', 'HPPD (הפרעת תפיסה מתמשכת)', 'התפרצות פסיכוטית (לבעלי נטייה)'],
    sideEffects: ['בלבול', 'בחילות (בעיקר בפטריות)', 'שינויים בטמפרטורת הגוף'],
    rating: {
      intensity: 9,
      awareness: 10,
      cognitive: 8,
      emotional: 9,
      naturalness: 9
    },
    substitutes: [
      { type: 'breathing', name: 'נשימת הולוטרופית', description: 'טכניקת נשימה מהירה ועמוקה שנועדה להביא למצבי תודעה חלופיים דמויי פסיכדליה.' },
      { type: 'meditation', name: 'מדיטציית ויפאסנה (שתיקה)', description: 'התבוננות עמוקה פנימה שמובילה לפירוק האגו והבנת טבע המציאות.' },
      { type: 'plants', name: 'לוטוס כחול (Blue Lotus)', description: 'פרח עתיק שמעודד חלומות צלולים ומצב תודעה מעט חלומי ומרחיב.' },
      { type: 'other', name: 'בידוד חושי (Float Tank)', description: 'ציפה במי מלח בחושך מוחלט, המאפשרת למוח לייצר חוויות פנימיות עמוקות.' }
    ],
    affectedBodyParts: ['brain', 'stomach', 'eyes', 'nervous_system']
  },
  {
    id: 'exp_cocaine',
    name: 'קוקאין (ממריץ)',
    category: 'stimulant',
    shortDescription: 'פרץ אנרגיה חד, תחושת ביטחון עצמי מופרזת וערנות מוגברת.',
    duration: '30-60 דקות',
    intensityScale: 'גבוהה',
    activeIngredients: ['קוקאין הידרוכלוריד'],
    brainEffect: 'חסימת ספיגה חוזרת של דופמין, סרוטונין ונוראדרנלין, מה שגורם להצטברותם בסינפסות.',
    mechanism: 'נקשר לנשאי דופמין (DAT) ומונע את פינוי הדופמין מהמרווח הסינפטי.',
    positiveEffects: ['ביטחון עצמי גבוה', 'ערנות ופוקוס', 'אופוריה קצרה', 'אנרגיה חברתית'],
    risks: ['התמכרות קשה', 'פגיעה בלב ובלחץ הדם', 'פראנויה', 'נזק למחיצת האף'],
    sideEffects: ['דופק מואץ', 'הזעה', 'חרדה בירידה (דודא)', 'חריקת שיניים'],
    rating: { intensity: 8, awareness: 3, cognitive: 6, emotional: 4, naturalness: 2 },
    substitutes: [
      { type: 'breathing', name: 'נשימות וים הוף (Wim Hof)', description: 'נשימות אקטיביות שמעלות את רמות האדרנלין והדופמין בדם באופן טבעי.' },
      { type: 'movement', name: 'אימון HIIT עצים', description: 'אימון אינטרוולים שמשחרר פרץ של אנדורפינים וקטכולאמינים.' },
      { type: 'other', name: 'טבילה בקרח (Cold Plunge)', description: 'מעלה את רמות הדופמין בעד 250% למשך שעות ארוכות, יחד עם פוקוס חד.' }
    ],
    affectedBodyParts: ['brain', 'heart', 'lungs', 'nervous_system']
  },
  {
    id: 'exp_ketamine',
    name: 'קטמין (סוסים / ניתוק)',
    category: 'dissociative',
    shortDescription: 'תחושת ניתוק מהגוף ומהסביבה, ריחוף, ובמינונים גבוהים - מסע תודעתי פנימי (K-Hole).',
    duration: '45-90 דקות',
    intensityScale: 'גבוהה',
    activeIngredients: ['קטמין'],
    brainEffect: 'חסימת קולטני NMDA (גלוטמט), מה שגורם לניתוק התקשורת בין המוח המודע לגוף.',
    mechanism: 'אנטגוניסט לקולטני NMDA, משבש את העברת האותות החושיים לקליפת המוח.',
    positiveEffects: ['ניתוק מכאב פיזי ונפשי', 'חוויות חוץ-גופיות', 'הפחתת דיכאון (קליני)', 'שקט מחשבתי'],
    risks: ['פגיעה בשלפוחית השתן', 'התמכרות פסיכולוגית', 'פציעות עקב חוסר תחושה', 'בלבול ופראנויה'],
    sideEffects: ['חוסר קואורדינציה', 'בחילות', 'ראייה כפולה', 'אובדן זיכרון קצר טווח'],
    rating: { intensity: 9, awareness: 2, cognitive: 2, emotional: 5, naturalness: 1 },
    substitutes: [
      { type: 'other', name: 'מיכל ציפה (Float Tank)', description: 'ניתוק חושי מוחלט המאפשר למוח להיכנס למצב גלי תטא עמוקים, בדומה לניתוק של קטמין.' },
      { type: 'breathing', name: 'נשימה הולוטרופית', description: 'מאפשרת הגעה למצבי תודעה משתנים וניתוק מהמציאות הפיזית.' },
      { type: 'meditation', name: 'מדיטציית טראנס עמוקה', description: 'כניסה למצב היפנוטי שבו הגוף ישן אך התודעה ערה (Mind Awake, Body Asleep).' }
    ],
    affectedBodyParts: ['brain', 'muscles', 'nervous_system', 'stomach']
  },
  {
    id: 'exp_3mmc',
    name: '3-MMC (דוקטור)',
    category: 'stimulant',
    shortDescription: 'שילוב של המרצה חזקה ואופוריה חברתית, דומה לשילוב של קוקאין ו-MDMA.',
    duration: '2-4 שעות',
    intensityScale: 'גבוהה',
    activeIngredients: ['3-Methylmethcathinone'],
    brainEffect: 'שחרור מסיבי של דופמין וסרוטונין, יחד עם עיכוב הספיגה החוזרת שלהם.',
    mechanism: 'פועל גם כמשחרר וגם כמעכב ספיגה חוזרת של מונואמינים (בעיקר דופמין).',
    positiveEffects: ['אופוריה', 'אנרגיה מתפרצת', 'חשק מיני מוגבר', 'פתיחות חברתית'],
    risks: ['התמכרות פסיכולוגית חזקה (דודא קשה)', 'רעילות ללב', 'פסיכוזה בשימוש ממושך', 'התייבשות'],
    sideEffects: ['דופק מהיר מאוד', 'כיווץ לסתות', 'הזעה מוגברת', 'דיכאון עמוק בירידה'],
    rating: { intensity: 8, awareness: 4, cognitive: 5, emotional: 7, naturalness: 1 },
    substitutes: [
      { type: 'movement', name: 'קונדליני יוגה', description: 'הנעת אנרגיית החיים (פראנה) דרך צ\'אקרות, יוצרת תחושת אופוריה ואנרגיה מתפרצת.' },
      { type: 'breathing', name: 'נשימת אש (Breath of Fire)', description: 'נשימה מהירה ועוצמתית שמעירה את מערכת העצבים ומייצרת חום ואנרגיה.' },
      { type: 'music', name: 'מסיבות טבע ללא חומרים', description: 'היסחפות לתוך הטראנס דרך המוזיקה והתנועה בלבד, תוך שימוש באנרגיה הקבוצתית.' }
    ],
    affectedBodyParts: ['brain', 'heart', 'muscles', 'nervous_system']
  },
  {
    id: 'exp_tuci',
    name: 'דוסה / טוסי (Pink Cocaine)',
    category: 'euphoric',
    shortDescription: 'תערובת משתנה של חומרים (לרוב קטמין ו-MDMA) היוצרת חוויה פסיכדלית-ממריצה.',
    duration: '2-5 שעות (תלוי בהרכב)',
    intensityScale: 'גבוהה',
    activeIngredients: ['קטמין', 'MDMA', 'קפאין', 'לעיתים סמים נוספים'],
    brainEffect: 'אפקט משולב של ניתוק (קטמין) יחד עם הצפת סרוטונין (MDMA) והמרצה.',
    mechanism: 'פעולה סימולטנית על קולטני NMDA, סרוטונין ודופמין. סכנה של אינטראקציות בין חומרים.',
    positiveEffects: ['אופוריה', 'עיוותי ראייה קלים', 'אנרגיה לריקוד', 'תחושת ריחוף'],
    risks: ['חוסר ודאות לגבי ההרכב', 'סכנת מנת יתר', 'אינטראקציות מסוכנות בין סמים', 'פגיעה נוירולוגית'],
    sideEffects: ['בלבול', 'בחילות', 'חרדה', 'חוסר קואורדינציה'],
    rating: { intensity: 8, awareness: 3, cognitive: 3, emotional: 6, naturalness: 0 },
    substitutes: [
      { type: 'music', name: 'ריפוי בצלילים (Sound Bath)', description: 'שכיבה והאזנה לתדרים של קערות טיבטיות וגונגים, יוצרת תחושת ריחוף וניתוק נעים.' },
      { type: 'plants', name: 'טקס קקאו ופטריות פונקציונליות', description: 'שילוב של קקאו טקסי עם פטריות כמו רעמת האריה (Lion\'s Mane) לפוקוס ואופוריה עדינה.' },
      { type: 'movement', name: 'ריקוד אקסטטי (Ecstatic Dance)', description: 'שחרור שליטה דרך תנועה חופשית במרחב בטוח.' }
    ],
    affectedBodyParts: ['brain', 'heart', 'muscles', 'nervous_system']
  },
  {
    id: 'exp_ayahuasca',
    name: 'איוואסקה (רפואת הג\'ונגל)',
    category: 'psychedelic',
    shortDescription: 'מסע רוחני עמוק, ניקוי רגשי ופיזי, וחיבור לתודעה קולקטיבית.',
    duration: '6-10 שעות',
    intensityScale: 'גבוהה מאוד',
    activeIngredients: ['DMT', 'מעכבי MAO (הרמלין)'],
    brainEffect: 'הצפה של DMT במוח (המתאפשרת בזכות מעכבי ה-MAO), הפעלת אזורי זיכרון ורגש.',
    mechanism: 'DMT נקשר לקולטני סרוטונין, בעוד ה-MAOI מונע את פירוקו בקיבה ובמוח.',
    positiveEffects: ['ריפוי טראומות', 'התגלויות רוחניות', 'ניקוי רעלים (פיזי ורגשי)', 'תחושת אחדות'],
    risks: ['חוויה מטלטלת וקשה נפשית', 'אינטראקציה מסוכנת עם תרופות (SSRI)', 'התקף פסיכוטי'],
    sideEffects: ['הקאות (Purge)', 'שלשולים', 'פחד מוות (אובדן אגו)', 'בלבול'],
    rating: { intensity: 10, awareness: 10, cognitive: 9, emotional: 10, naturalness: 10 },
    substitutes: [
      { type: 'meditation', name: 'מדיטציית שחזור גלגולים/טראומות', description: 'עבודה מודרכת עם מטפל לכניסה לתת-מודע וניקוי טראומות ללא חומרים.' },
      { type: 'breathing', name: 'נשימת ריברסינג (Rebirthing)', description: 'טכניקת נשימה שנועדה להציף ולשחרר טראומות מודחקות, לעיתים מלווה בבכי או צחוק.' },
      { type: 'plants', name: 'דיאטת צמחים (Master Plant Diet)', description: 'התבודדות וצום עם צמחי מרפא עדינים מהג\'ונגל (ללא השפעה פסיכואקטיבית חזקה) לניקוי הגוף והנפש.' }
    ],
    affectedBodyParts: ['brain', 'stomach', 'heart', 'nervous_system']
  },
  {
    id: 'exp_salvia',
    name: 'סלוויה (Salvia Divinorum)',
    category: 'dissociative',
    shortDescription: 'חוויה קצרה אך אינטנסיבית מאוד של ניתוק מהמציאות, עיוותי זמן ומרחב, ותחושת התמזגות עם חפצים.',
    duration: '5-15 דקות',
    intensityScale: 'גבוהה מאוד',
    activeIngredients: ['Salvinorin A'],
    brainEffect: 'הפעלה חזקה של קולטני אופיאטים מסוג קאפה (Kappa Opioid Receptors).',
    mechanism: 'אגוניסט לקולטני קאפה, שונה לחלוטין מפסיכדלים קלאסיים שפועלים על סרוטונין.',
    positiveEffects: ['חוויות חוץ-גופיות', 'תובנות מהירות', 'חזרה מהירה לשגרה'],
    risks: ['בלבול קיצוני', 'אובדן שליטה מוטורית', 'פחד וחרדה בזמן החוויה'],
    sideEffects: ['הזעה', 'סחרחורת', 'חוסר התמצאות'],
    rating: { intensity: 10, awareness: 1, cognitive: 2, emotional: 4, naturalness: 8 },
    substitutes: [
      { type: 'breathing', name: 'נשימות קצב מהיר (Hyperventilation)', description: 'שינוי מהיר ברמות החמצן במוח שיכול לגרום לתחושות ניתוק קצרות.' },
      { type: 'meditation', name: 'מדיטציית התבוננות בחפץ', description: 'מיקוד קיצוני בחפץ בודד עד לאובדן תחושת הנפרדות ממנו.' }
    ],
    affectedBodyParts: ['brain', 'nervous_system', 'muscles']
  },
  {
    id: 'exp_2cb',
    name: '2C-B (נקסוס)',
    category: 'psychedelic',
    shortDescription: 'שילוב עדין בין פסיכדליה לאמפתוגן, עם ויזואלים צבעוניים ותחושת גוף נעימה ללא בלבול מחשבתי כבד.',
    duration: '4-8 שעות',
    intensityScale: 'בינונית-גבוהה',
    activeIngredients: ['2C-B'],
    brainEffect: 'הפעלה חלקית של קולטני סרוטונין 5-HT2A ו-5-HT2C.',
    mechanism: 'פועל כאגוניסט חלקי לקולטני סרוטונין, ומשפיע על עיבוד חושי ורגשי.',
    positiveEffects: ['ויזואלים מרהיבים', 'אופוריה', 'הגברת חוש המישוש והחשק המיני', 'צלילות מחשבתית יחסית'],
    risks: ['HPPD בשימוש תדיר', 'עומס חושי', 'כאבי ראש'],
    sideEffects: ['בחילות בעלייה', 'רעד קל', 'רגישות לאור'],
    rating: { intensity: 7, awareness: 8, cognitive: 7, emotional: 8, naturalness: 3 },
    substitutes: [
      { type: 'music', name: 'סינסתזיה מוזיקלית', description: 'האזנה למוזיקה אלקטרונית מורכבת בעיניים עצומות לגירוי ויזואלי-שמיעתי.' },
      { type: 'movement', name: 'טנטרה / יוגה בזוג', description: 'תרגול תנועה ומגע המגביר את הרגישות החושית והחיבור הבין-אישי.' }
    ],
    affectedBodyParts: ['brain', 'skin', 'eyes', 'nervous_system']
  },
  {
    id: 'exp_ghb',
    name: 'GHB / GBL (ג\'י)',
    category: 'relaxant',
    shortDescription: 'תחושת שכרות חמימה, אופוריה, שחרור עכבות חברתיות ומיניות, והרפיית שרירים.',
    duration: '1.5-3 שעות',
    intensityScale: 'בינונית',
    activeIngredients: ['GHB', 'GBL'],
    brainEffect: 'הפעלת קולטני GABA-B וקולטני GHB ייעודיים, הגורמים לדיכוי מערכת העצבים המרכזית.',
    mechanism: 'מגביר את הפעילות המעכבת במוח, בדומה לאלכוהול אך בצורה ממוקדת יותר.',
    positiveEffects: ['אופוריה', 'שחרור חברתי', 'הגברת חשק מיני', 'שינה עמוקה (במינון גבוה)'],
    risks: ['סכנת חיים בשילוב עם אלכוהול', 'מנת יתר (הרדמה/תרדמת)', 'התמכרות פיזית קשה'],
    sideEffects: ['סחרחורת', 'בחילות', 'אובדן זיכרון', 'חוסר קואורדינציה'],
    rating: { intensity: 6, awareness: 4, cognitive: 4, emotional: 7, naturalness: 2 },
    substitutes: [
      { type: 'plants', name: 'קאווה (Kava)', description: 'שורש פולינזי המשרה רוגע עמוק, שחרור חברתי ואופוריה קלה ללא פגיעה בשיפוט.' },
      { type: 'movement', name: 'ריקוד מגע (Contact Improvisation)', description: 'תנועה משותפת המייצרת שחרור עכבות וחיבור גופני טבעי.' }
    ],
    affectedBodyParts: ['brain', 'muscles', 'nervous_system']
  },
  {
    id: 'exp_nitrous',
    name: 'גז צחוק (Nitrous Oxide)',
    category: 'dissociative',
    shortDescription: 'אופוריה קצרה ואינטנסיבית, ניתוק מהגוף, עיוותי צליל ותחושת "הבנה מוחלטת" שמתפוגגת מהר.',
    duration: '1-3 דקות',
    intensityScale: 'גבוהה',
    activeIngredients: ['Nitrous Oxide'],
    brainEffect: 'חסימת קולטני NMDA והפעלת מסלולים אופיואידיים במוח.',
    mechanism: 'משבש את העברת האותות במוח וגורם לניתוק חושי מהיר.',
    positiveEffects: ['אופוריה מתפרצת', 'שיכוך כאבים', 'ניתוק נעים', 'צחוק בלתי נשלט'],
    risks: ['חוסר חמצן למוח (היפוקסיה)', 'מחסור בוויטמין B12 (בשימוש כרוני)', 'פציעות מנפילה'],
    sideEffects: ['סחרחורת', 'בלבול', 'עיוותי שמיעה (Womp Womp)'],
    rating: { intensity: 8, awareness: 2, cognitive: 1, emotional: 6, naturalness: 1 },
    substitutes: [
      { type: 'breathing', name: 'נשימות הולוטרופיות קצרות', description: 'שאיפות ונשיפות מהירות שגורמות לסחרחורת קלה ושינוי תודעתי קצר.' },
      { type: 'other', name: 'צחוק יזום (יוגת צחוק)', description: 'הפעלת רפלקס הצחוק באופן יזום לשחרור אנדורפינים מהיר.' }
    ],
    affectedBodyParts: ['brain', 'lungs', 'nervous_system']
  },
  {
    id: 'exp_5meodmt',
    name: '5-MeO-DMT (קרפדה)',
    category: 'psychedelic',
    shortDescription: 'החוויה הפסיכדלית העוצמתית ביותר הידועה לאדם. פירוק מוחלט של האגו והתמזגות עם "הכל" או "האין".',
    duration: '15-30 דקות',
    intensityScale: 'גבוהה מאוד',
    activeIngredients: ['5-MeO-DMT'],
    brainEffect: 'הפעלה מסיבית של קולטני סרוטונין (בעיקר 5-HT1A ו-5-HT2A).',
    mechanism: 'הצפה סרוטונרגית שגורמת לכיבוי מוחלט של רשת ברירת המחדל (DMN).',
    positiveEffects: ['חוויה מיסטית עמוקה', 'לידה מחדש', 'שחרור מטראומות', 'תחושת אחדות מוחלטת'],
    risks: ['טראומה פסיכולוגית', 'חנק מקיא', 'התקפי חרדה מתמשכים'],
    sideEffects: ['אובדן שליטה גופנית', 'צעקות או בכי', 'אמנזיה של החוויה'],
    rating: { intensity: 10, awareness: 10, cognitive: 1, emotional: 10, naturalness: 10 },
    substitutes: [
      { type: 'meditation', name: 'מדיטציית ריק (Void Meditation)', description: 'תרגול מתקדם של שהייה ב"אין", מעבר למחשבות ולתחושות הגוף.' },
      { type: 'breathing', name: 'עצירת נשימה מתקדמת (Kumbhaka)', description: 'עצירת נשימה מבוקרת המביאה את המוח למצב הישרדותי ולשחרור חומרים אנדוגניים.' }
    ],
    affectedBodyParts: ['brain', 'lungs', 'heart', 'nervous_system']
  },
  {
    id: 'exp_mescaline',
    name: 'מסקלין (פיוטה / סן פדרו)',
    category: 'psychedelic',
    shortDescription: 'פסיכדליה טבעית עתיקה, מאופיינת בחיבור עמוק לטבע, ויזואלים גיאומטריים ותחושת זמן איטית.',
    duration: '10-14 שעות',
    intensityScale: 'גבוהה',
    activeIngredients: ['Mescaline'],
    brainEffect: 'אגוניסט חלקי לקולטני סרוטונין 5-HT2A ו-5-HT2C.',
    mechanism: 'נקשר לקולטני סרוטונין ומשנה את עיבוד המידע החושי והקוגניטיבי.',
    positiveEffects: ['חיבור לטבע', 'תובנות פילוסופיות', 'אמפתיה', 'ויזואלים עשירים'],
    risks: ['בחילות והקאות קשות בתחילת החוויה', 'תשישות פיזית', 'חרדה'],
    sideEffects: ['כיווצי שרירים', 'שינויים בטמפרטורת הגוף', 'חוסר תיאבון'],
    rating: { intensity: 8, awareness: 9, cognitive: 8, emotional: 8, naturalness: 10 },
    substitutes: [
      { type: 'meditation', name: 'Vision Quest (מסע חזון)', description: 'שהייה ממושכת בטבע לבד, לרוב עם צום, כדי לעורר מצבי תודעה עמוקים וחיבור לאדמה.' },
      { type: 'plants', name: 'קקאו טקסי בטבע', description: 'שתיית קקאו בחיק הטבע תוך התבוננות שקטה, פותח את הלב ומחבר לסביבה.' }
    ],
    affectedBodyParts: ['brain', 'stomach', 'heart', 'nervous_system']
  },
  {
    id: 'exp_amanita',
    name: 'אמניטה מוסקריה (פטריית הזיות אדומה)',
    category: 'dissociative',
    shortDescription: 'חוויה חלומית, דיסוציאטיבית ולעיתים דליריאנטית. שונה מאוד מפטריות פסילוציבין.',
    duration: '6-10 שעות',
    intensityScale: 'גבוהה',
    activeIngredients: ['Muscimol', 'Ibotenic acid'],
    brainEffect: 'הפעלת קולטני GABA (מוסקימול) והפעלת קולטני גלוטמט (חומצה איבוטנית).',
    mechanism: 'מוסקימול פועל כאגוניסט חזק ל-GABA, מה שגורם להרגעה, ניתוק ושינויי תפיסה.',
    positiveEffects: ['חלומות צלולים', 'תחושת ריחוף', 'שקט פנימי', 'עיוותי גודל (תסמונת אליס בארץ הפלאות)'],
    risks: ['רעילות (אם לא הוכנה כראוי)', 'בלבול עמוק', 'אובדן זיכרון של החוויה'],
    sideEffects: ['הזעה מרובה', 'ריור', 'בחילות', 'עוויתות שרירים'],
    rating: { intensity: 8, awareness: 3, cognitive: 4, emotional: 5, naturalness: 10 },
    substitutes: [
      { type: 'meditation', name: 'חלימה מודעת (Lucid Dreaming)', description: 'תרגול טכניקות לשליטה ומודעות בתוך חלומות, המדמה את המצב החלומי של האמניטה.' },
      { type: 'plants', name: 'שורש ולריאן', description: 'צמח מרגיע חזק שיכול לעודד שינה עמוקה וחלומות חיים ומוחשיים.' }
    ],
    affectedBodyParts: ['brain', 'stomach', 'muscles', 'nervous_system']
  },
  {
    id: 'exp_kratom',
    name: 'קראטום (Kratom)',
    category: 'relaxant',
    shortDescription: 'עלה טרופי המציע המרצה קלה במינונים נמוכים, והרגעה ושיכוך כאבים דמוי-אופיאטי במינונים גבוהים.',
    duration: '2-5 שעות',
    intensityScale: 'בינונית',
    activeIngredients: ['Mitragynine', '7-Hydroxymitragynine'],
    brainEffect: 'הפעלה חלקית של קולטני אופיאטים מסוג מיו (Mu-opioid) וקולטנים אדרנרגיים.',
    mechanism: 'פועל על מערכת משככי הכאבים של המוח, אך במנגנון מעט שונה מאופיאטים קלאסיים.',
    positiveEffects: ['שיכוך כאבים', 'שיפור מצב רוח', 'אנרגיה (במינון נמוך)', 'הרגעה (במינון גבוה)'],
    risks: ['התמכרות פיזית ופסיכולוגית', 'תסמיני גמילה', 'פגיעה בכבד (נדיר)'],
    sideEffects: ['בחילות', 'עצירות', 'יובש בפה', 'סחרחורות'],
    rating: { intensity: 5, awareness: 6, cognitive: 6, emotional: 6, naturalness: 9 },
    substitutes: [
      { type: 'plants', name: 'תה מאצ\'ה ו-L-Theanine', description: 'שילוב המספק אנרגיה נקייה יחד עם רוגע ופוקוס, ללא תופעות הלוואי של קפאין לבדו.' },
      { type: 'movement', name: 'יוגה משקמת (Yin Yoga)', description: 'שהייה ממושכת בתנוחות המרפה את רקמות החיבור ומשחררת כאבים פיזיים ומתח.' }
    ],
    affectedBodyParts: ['brain', 'stomach', 'muscles', 'nervous_system']
  },
  {
    id: 'exp_speed',
    name: 'אמפטמין / ספיד',
    category: 'stimulant',
    shortDescription: 'המרצה חזקה של מערכת העצבים, פוקוס חד כתער, חוסר עייפות ודיכוי תיאבון.',
    duration: '4-8 שעות',
    intensityScale: 'גבוהה',
    activeIngredients: ['Amphetamine'],
    brainEffect: 'שחרור מוגבר של דופמין ונוראדרנלין, ועיכוב הספיגה החוזרת שלהם.',
    mechanism: 'חודר לתאי העצב וגורם להם לשחרר את מאגרי המוליכים העצביים המעוררים שלהם.',
    positiveEffects: ['פוקוס קיצוני', 'אנרגיה בלתי נדלית', 'ביטחון עצמי', 'מוטיבציה גבוהה'],
    risks: ['התמכרות', 'פסיכוזה אמפטמינית (ממחסור בשינה)', 'שחיקה של מערכת העצבים', 'עומס על הלב'],
    sideEffects: ['חריקת שיניים', 'נדודי שינה קשים', 'חרדה', 'אובדן תיאבון מוחלט'],
    rating: { intensity: 7, awareness: 5, cognitive: 8, emotional: 4, naturalness: 1 },
    substitutes: [
      { type: 'breathing', name: 'נשימות קפאלאבהטי (Kapalabhati)', description: 'נשימות אש יוגיות המנקות את דרכי הנשימה ומזרימות חמצן ואנרגיה למוח באופן מיידי.' },
      { type: 'other', name: 'צום לסירוגין (Intermittent Fasting)', description: 'מצב של צום מעלה את רמות הנוראדרנלין והאורקסין, מה שמוביל לערנות ופוקוס טבעיים.' }
    ],
    affectedBodyParts: ['brain', 'heart', 'nervous_system', 'muscles']
  },
  {
    id: 'exp_benzos',
    name: 'בנזודיאזפינים (כדורי הרגעה)',
    category: 'relaxant',
    shortDescription: 'כיבוי של מערכת החרדה במוח, הרפיית שרירים חזקה ותחושת אדישות נעימה.',
    duration: '4-12 שעות (תלוי בסוג)',
    intensityScale: 'בינונית-גבוהה',
    activeIngredients: ['Alprazolam', 'Diazepam', 'Clonazepam'],
    brainEffect: 'הגברת הפעילות של המוליך העצבי המעכב GABA.',
    mechanism: 'נקשרים לקולטני GABA-A ומגבירים את תדירות פתיחת תעלות הכלור, מה שמרגיע את פעילות המוח.',
    positiveEffects: ['העלמת חרדה מיידית', 'הרפיית שרירים', 'השריית שינה', 'ניתוק ממתח נפשי'],
    risks: ['התמכרות פיזית קשה מאוד', 'סכנת מוות בגמילה פתאומית', 'סכנת חיים בשילוב עם אלכוהול'],
    sideEffects: ['אמנזיה (שכחון)', 'עייפות כבדה', 'חוסר קואורדינציה', 'קהות רגשית'],
    rating: { intensity: 6, awareness: 2, cognitive: 2, emotional: 3, naturalness: 1 },
    substitutes: [
      { type: 'plants', name: 'תמצית שורש אשווגנדה', description: 'אדפטוגן המוריד את רמות הקורטיזול (הורמון הלחץ) ומרגיע את מערכת העצבים לאורך זמן.' },
      { type: 'meditation', name: 'הרפיית שרירים מתקדמת (PMR)', description: 'טכניקה של כיווץ והרפיית קבוצות שרירים בגוף, המאותתת למוח לעבור למצב רגיעה עמוק.' },
      { type: 'other', name: 'שמיכה כבדה (Weighted Blanket)', description: 'שימוש בשמיכה כבדה המפעילה לחץ עמוק על הגוף (DTP), מעודדת שחרור סרוטונין ומפחיתה חרדה.' }
    ],
    affectedBodyParts: ['brain', 'muscles', 'nervous_system']
  }
];

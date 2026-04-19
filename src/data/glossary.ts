export interface GlossaryTerm {
  term: string;
  meaning: string;
  category: 'abbreviation' | 'slang' | 'technical' | 'general';
  fullForm?: string; // For abbreviations
}

export const glossaryData: GlossaryTerm[] = [
  // --- Technical & Chemical ---
  {
    term: 'MDMA',
    fullForm: '3,4-Methylenedioxymethamphetamine',
    meaning: 'חומר פסיכואקטיבי סינתטי הפועל כמעורר וכאמפתוגן.',
    category: 'technical'
  },
  {
    term: 'LSD',
    fullForm: 'Lysergic acid diethylamide',
    meaning: 'חומר פסיכדלי חזק הגורם לשינויים בתפיסה, במחשבה וברגש.',
    category: 'technical'
  },
  {
    term: 'THC',
    fullForm: 'Tetrahydrocannabinol',
    meaning: 'המרכיב הפסיכואקטיבי העיקרי בצמח הקנאביס.',
    category: 'technical'
  },
  {
    term: 'CBD',
    fullForm: 'Cannabidiol',
    meaning: 'מרכיב לא פסיכואקטיבי בקנאביס הידוע בסגולותיו המרגיעות והרפואיות.',
    category: 'technical'
  },
  {
    term: 'DMT',
    fullForm: 'N,N-Dimethyltryptamine',
    meaning: 'מולקולה פסיכדלית עוצמתית המצויה בטבע וגם מיוצרת בגוף האדם.',
    category: 'technical'
  },
  {
    term: 'Psilocybin',
    meaning: 'החומר הפעיל העיקרי בפטריות "קסם", ההופך לפסילוצין בגוף.',
    category: 'technical'
  },
  {
    term: 'Mescaline',
    meaning: 'אלקלואיד פסיכדלי המצוי בקקטוסים כמו פיוטה וסן פדרו.',
    category: 'technical'
  },
  {
    term: 'Ketamine',
    meaning: 'חומר דיסוציאטיבי המשמש ברפואה כחומר הרדמה וגם לטיפול בדיכאון.',
    category: 'technical'
  },
  {
    term: '2C-B',
    meaning: 'חומר פסיכדלי סינתטי ממשפחת הפנתילאמינים, המשלב אפקטים ויזואליים ותחושתיים.',
    category: 'technical'
  },
  {
    term: '5-MeO-DMT',
    meaning: 'מולקולה פסיכדלית עוצמתית במיוחד המופקת לעיתים מארס של קרפדה.',
    category: 'technical'
  },
  {
    term: 'Ibogaine',
    meaning: 'אלקלואיד פסיכדלי המופק מצמח האיבוגה, משמש לעיתים לגמילה מהתמכרויות.',
    category: 'technical'
  },
  {
    term: 'Salvinorin A',
    meaning: 'החומר הפעיל בצמח הסלוויה דיווינורום, פועל על קולטני אופיאטים קאפה.',
    category: 'technical'
  },
  {
    term: 'Ayahuasca',
    meaning: 'משקה טקסי מהאמזונס המשלב צמח המכיל DMT וצמח המכיל מעכבי MAO.',
    category: 'technical'
  },
  {
    term: 'Peyote',
    meaning: 'קקטוס קטן המכיל מסקלין, משמש בטקסים של עמים ילידים באמריקה.',
    category: 'technical'
  },
  {
    term: 'San Pedro',
    meaning: 'קקטוס עמוד המכיל מסקלין, נפוץ בהרי האנדים.',
    category: 'technical'
  },
  {
    term: 'Amanita Muscaria',
    meaning: 'פטריית "אמניטה" (האדומה עם הנקודות הלבנות), מכילה חומרים דיסוציאטיביים כמו מוסקימול.',
    category: 'technical'
  },
  {
    term: 'Muscimol',
    meaning: 'החומר הפסיכואקטיבי העיקרי בפטריית האמניטה מוסקריה.',
    category: 'technical'
  },
  {
    term: 'Kratom',
    meaning: 'צמח מדרום-מזרח אסיה בעל השפעות ממריצות במינון נמוך ומרגיעות במינון גבוה.',
    category: 'technical'
  },
  {
    term: 'Kava',
    meaning: 'צמח מאיי האוקיינוס השקט המשמש להכנת משקה מרגיע ומפחית חרדה.',
    category: 'technical'
  },
  {
    term: 'Nitrous Oxide',
    fullForm: 'N2O',
    meaning: 'גז צחוק, חומר דיסוציאטיבי קצר מועד.',
    category: 'technical'
  },
  {
    term: 'GHB',
    fullForm: 'Gamma-Hydroxybutyrate',
    meaning: 'חומר מדכא מערכת עצבים, משמש לעיתים כסם מסיבות או לטיפול בנרקולפסיה.',
    category: 'technical'
  },
  {
    term: 'GBL',
    meaning: 'קדם-חומר (Precursor) ההופך ל-GHB בגוף.',
    category: 'technical'
  },
  {
    term: 'Amphetamine',
    meaning: 'חומר ממריץ הפועל על מערכת העצבים המרכזית.',
    category: 'technical'
  },
  {
    term: 'Methamphetamine',
    meaning: 'ממריץ חזק וממכר במיוחד ממשפחת האמפטמינים.',
    category: 'technical'
  },
  {
    term: 'Cocaine',
    meaning: 'אלקלואיד ממריץ המופק מעלי צמח הקוקה.',
    category: 'technical'
  },
  {
    term: 'Benzodiazepines',
    meaning: 'משפחת תרופות הרגעה (כמו קסנקס, ואליום) הפועלות על קולטני GABA.',
    category: 'technical'
  },
  {
    term: 'Opioids',
    meaning: 'משפחת חומרים משככי כאבים (כמו מורפין, הרואין, פנטניל) הפועלים על קולטני אופיאטים.',
    category: 'technical'
  },
  {
    term: 'Serotonin',
    meaning: 'מוליך עצבי הממלא תפקיד מפתח בוויסות מצב הרוח, השינה והתיאבון.',
    category: 'technical'
  },
  {
    term: 'Dopamine',
    meaning: 'מוליך עצבי הקשור למערכת התגמול, ההנאה והמוטיבציה במוח.',
    category: 'technical'
  },
  {
    term: 'GABA',
    meaning: 'המוליך העצבי המעכב העיקרי במוח, אחראי על הרגעה והפחתת עוררות.',
    category: 'technical'
  },
  {
    term: 'Glutamate',
    meaning: 'המוליך העצבי המעורר העיקרי במוח.',
    category: 'technical'
  },
  {
    term: 'Endorphins',
    meaning: 'חומרים כימיים המיוצרים בגוף ומשמשים כמשככי כאבים טבעיים ומשפרי מצב רוח.',
    category: 'technical'
  },
  {
    term: 'Oxytocin',
    meaning: 'הורמון ומוליך עצבי המכונה "הורמון האהבה", קשור לחיבור חברתי ואמון.',
    category: 'technical'
  },
  {
    term: 'Anandamide',
    meaning: 'קנבינואיד אנדוגני (המיוצר בגוף) המכונה "מולקולת האושר".',
    category: 'technical'
  },
  {
    term: 'Neuroplasticity',
    meaning: 'יכולת המוח להשתנות וליצור קשרים עצביים חדשים לאורך החיים.',
    category: 'technical'
  },
  {
    term: 'Synapse',
    meaning: 'המרווח בין שני תאי עצב שדרכו עוברים אותות כימיים.',
    category: 'technical'
  },
  {
    term: 'Receptor',
    meaning: 'חלבון על פני תא העצב הקולט מולקולות של מוליכים עצביים.',
    category: 'technical'
  },
  {
    term: 'Agonist',
    meaning: 'חומר הנקשר לקולטן ומפעיל אותו.',
    category: 'technical'
  },
  {
    term: 'Antagonist',
    meaning: 'חומר הנקשר לקולטן וחוסם את הפעלתו.',
    category: 'technical'
  },
  {
    term: 'Half-life',
    meaning: 'זמן מחצית החיים - הזמן שלוקח לריכוז החומר בגוף לרדת בחצי.',
    category: 'technical'
  },
  {
    term: 'Bioavailability',
    meaning: 'זמינות ביולוגית - אחוז החומר המגיע למחזור הדם מתוך המינון שנלקח.',
    category: 'technical'
  },
  {
    term: 'Metabolism',
    meaning: 'חילוף חומרים - התהליך שבו הגוף מפרק ומשנה חומרים כימיים.',
    category: 'technical'
  },
  {
    term: 'Blood-Brain Barrier',
    fullForm: 'BBB',
    meaning: 'מחסום דם-מוח - מנגנון המגן על המוח מפני חומרים מזיקים בדם.',
    category: 'technical'
  },
  {
    term: 'Prefrontal Cortex',
    fullForm: 'PFC',
    meaning: 'קליפת המוח הקדם-מצחית - אחראית על תפקודים ניהוליים וקבלת החלטות.',
    category: 'technical'
  },
  {
    term: 'Amygdala',
    meaning: 'אמיגדלה - אזור במוח המעורב בעיבוד רגשות, במיוחד פחד.',
    category: 'technical'
  },
  {
    term: 'Hippocampus',
    meaning: 'היפוקמפוס - אזור במוח החיוני ליצירת זיכרונות חדשים וניווט מרחבי.',
    category: 'technical'
  },
  {
    term: 'Thalamus',
    meaning: 'תלמוס - תחנת ממסר מרכזית במוח המעבירה מידע חושי לקליפת המוח.',
    category: 'technical'
  },

  // --- General Concepts & Harm Reduction ---
  {
    term: 'סט',
    meaning: 'המצב המנטלי והרגשי של האדם לפני ובמהלך החוויה.',
    category: 'general'
  },
  {
    term: 'סטינג',
    meaning: 'הסביבה הפיזית והחברתית שבה מתרחשת החוויה.',
    category: 'general'
  },
  {
    term: 'אינטגרציה',
    meaning: 'תהליך עיבוד והטמעת התובנות מהחוויה הפסיכדלית לתוך חיי היומיום.',
    category: 'general'
  },
  {
    term: 'מזעור נזקים',
    fullForm: 'Harm Reduction',
    meaning: 'גישה המיועדת להפחית את ההשלכות השליליות של שימוש בחומרים.',
    category: 'general'
  },
  {
    term: 'מיקרו-דוזינג',
    fullForm: 'Microdosing',
    meaning: 'נטילת מינונים מזעריים של חומר פסיכדלי לשיפור תפקוד יומיומי ללא השפעה משכרת.',
    category: 'general'
  },
  {
    term: 'אובדן אגו',
    fullForm: 'Ego Death',
    meaning: 'חוויה של התפרקות תחושת ה"אני" הנפרד ותחושת אחדות עם הכל.',
    category: 'general'
  },
  {
    term: 'טריפ סיטר',
    fullForm: 'Trip Sitter',
    meaning: 'אדם פיכח המלווה ושומר על מי שנמצא תחת השפעת חומרים.',
    category: 'general'
  },
  {
    term: 'פלאשבק',
    meaning: 'חוויה חוזרת של השפעות הסם זמן רב לאחר שהשפעתו פגה.',
    category: 'general'
  },
  {
    term: 'סבילות',
    fullForm: 'Tolerance',
    meaning: 'ירידה בתגובת הגוף לחומר לאחר שימוש חוזר, המצריכה מינון גבוה יותר להשגת אותה השפעה.',
    category: 'general'
  },
  {
    term: 'תסמיני גמילה',
    fullForm: 'Withdrawal',
    meaning: 'תופעות פיזיות או נפשיות המופיעות עם הפסקת השימוש בחומר ממכר.',
    category: 'general'
  },
  {
    term: 'מנת יתר',
    fullForm: 'Overdose',
    meaning: 'נטילת כמות חומר הגדולה ממה שהגוף יכול לשאת, העלולה להיות מסוכנת.',
    category: 'general'
  },
  {
    term: 'פסיכותרפיה פסיכדלית',
    meaning: 'שימוש בחומרים פסיכדליים כחלק מתהליך טיפולי מבוקר.',
    category: 'general'
  },
  {
    term: 'מצב תודעה חלופי',
    fullForm: 'Altered State of Consciousness',
    meaning: 'מצב שבו התפיסה, המחשבה או הרגש שונים מהמצב הרגיל.',
    category: 'general'
  },
  {
    term: 'סינסתזיה',
    meaning: 'עירוב חושים - למשל "לראות צלילים" או "לשמוע צבעים".',
    category: 'general'
  },
  {
    term: 'אנתאוגן',
    fullForm: 'Entheogen',
    meaning: 'מונח המשמש לתיאור חומרים פסיכדליים בהקשר רוחני או דתי.',
    category: 'general'
  },
  {
    term: 'אמפתוגן',
    fullForm: 'Empathogen',
    meaning: 'חומר המעורר תחושות של אמפתיה, חיבור ופתיחות רגשית.',
    category: 'general'
  },
  {
    term: 'דיסוציאטיבי',
    fullForm: 'Dissociative',
    meaning: 'חומר הגורם לתחושת ניתוק מהגוף, מהסביבה או מהמציאות.',
    category: 'general'
  },
  {
    term: 'דליריאנט',
    fullForm: 'Deliriant',
    meaning: 'חומר הגורם למצב של בלבול עמוק והזיות שקשה להבדיל בינן לבין המציאות.',
    category: 'general'
  },
  {
    term: 'טריפ רע',
    fullForm: 'Bad Trip',
    meaning: 'חוויה פסיכדלית המלווה בחרדה עזה, פחד או בלבול.',
    category: 'general'
  },
  {
    term: 'קנדי-פליפ',
    fullForm: 'Candy Flip',
    meaning: 'שילוב של LSD ו-MDMA.',
    category: 'general'
  },
  {
    term: 'היפי-פליפ',
    fullForm: 'Hippy Flip',
    meaning: 'שילוב של פטריות פסילוציבין ו-MDMA.',
    category: 'general'
  },
  {
    term: 'נקסוס-פליפ',
    fullForm: 'Nexus Flip',
    meaning: 'שילוב של 2C-B ו-MDMA.',
    category: 'general'
  },
  {
    term: 'קיטי-פליפ',
    fullForm: 'Kitty Flip',
    meaning: 'שילוב של קטמין ו-MDMA.',
    category: 'general'
  },

  // --- Slang & Street Terms ---
  {
    term: 'דודא',
    meaning: 'תחושת השתוקקות עזה לחומר או לחוויה, לרוב בשלב הירידה.',
    category: 'slang'
  },
  {
    term: 'סטלה',
    meaning: 'מצב של השפעה תחת חומר פסיכואקטיבי.',
    category: 'slang'
  },
  {
    term: 'טריפ',
    meaning: 'מסע תודעתי תחת השפעת חומרים פסיכדליים.',
    category: 'general'
  },
  {
    term: 'דוקטור',
    meaning: 'כינוי נפוץ ל-3-MMC או חומרים דומים ממשפחת הקתינונים.',
    category: 'slang'
  },
  {
    term: 'דוסה',
    meaning: 'כינוי ל"טוסי" (Pink Cocaine), לרוב תערובת של קטמין ו-MDMA.',
    category: 'slang'
  },
  {
    term: 'קרטון',
    meaning: 'כינוי לפיסת נייר ספוגה ב-LSD.',
    category: 'slang'
  },
  {
    term: 'טיפה',
    meaning: 'LSD בצורה נוזלית.',
    category: 'slang'
  },
  {
    term: 'אסיד',
    meaning: 'כינוי נפוץ ל-LSD.',
    category: 'slang'
  },
  {
    term: 'מולי',
    meaning: 'כינוי ל-MDMA בצורת גבישים או אבקה.',
    category: 'slang'
  },
  {
    term: 'אקסטזי',
    meaning: 'כינוי ל-MDMA בצורת כדורים.',
    category: 'slang'
  },
  {
    term: 'קיי',
    meaning: 'כינוי לקטמין.',
    category: 'slang'
  },
  {
    term: 'קוק',
    meaning: 'כינוי לקוקאין.',
    category: 'slang'
  },
  {
    term: 'ירוק',
    meaning: 'כינוי לקנאביס.',
    category: 'slang'
  },
  {
    term: 'חום',
    meaning: 'כינוי לחשיש.',
    category: 'slang'
  },
  {
    term: 'פייסל',
    meaning: 'כינוי לסיגריה מגולגלת המכילה קנאביס.',
    category: 'slang'
  },
  {
    term: 'באנג',
    meaning: 'מקטרת מים לעישון קנאביס.',
    category: 'slang'
  },
  {
    term: 'קססה',
    meaning: 'תערובת של קנאביס וטבק (או תחליף טבק) לעישון.',
    category: 'slang'
  },
  {
    term: 'מנצ\'יז',
    meaning: 'רעב מוגבר המופיע לאחר צריכת קנאביס.',
    category: 'slang'
  },
  {
    term: 'דאון',
    meaning: 'תחושת דכדוך או עייפות המופיעה כשהשפעת החומר פגה.',
    category: 'slang'
  },
  {
    term: 'קאמבאק',
    meaning: 'חזרה של השפעת החומר לאחר שחשבנו שהיא נגמרה.',
    category: 'slang'
  },
  {
    term: 'אפטר',
    meaning: 'הזמן שאחרי המסיבה או החוויה המרכזית.',
    category: 'slang'
  },
  {
    term: 'פליפ',
    meaning: 'שילוב של שני חומרים או יותר.',
    category: 'slang'
  },
  {
    term: 'שורה',
    meaning: 'כמות קטנה של אבקה המסודרת בקו להרחה.',
    category: 'slang'
  },
  {
    term: 'בולה',
    meaning: 'כדור אקסטזי.',
    category: 'slang'
  },
  {
    term: 'ג\'י',
    meaning: 'כינוי ל-GHB או GBL.',
    category: 'slang'
  },
  {
    term: 'ספיד',
    meaning: 'כינוי לאמפטמינים.',
    category: 'slang'
  },
  {
    term: 'קריסטל',
    meaning: 'כינוי למתאמפטמין או לעיתים ל-MDMA גבישי.',
    category: 'slang'
  },
  {
    term: 'שלוק',
    meaning: 'מנה של GHB נוזלי.',
    category: 'slang'
  },
  {
    term: 'פיצוציה',
    meaning: 'כינוי לחומרים שנמכרו בעבר בפיצוציות (סמי פיצוציות).',
    category: 'slang'
  },
  {
    term: 'נייס גאי',
    meaning: 'כינוי לתערובות עישון המכילות קנבינואידים סינתטיים מסוכנים.',
    category: 'slang'
  },

  // --- Abbreviations ---
  {
    term: 'HPPD',
    fullForm: 'Hallucinogen Persisting Perception Disorder',
    meaning: 'הפרעת תפיסה מתמשכת לאחר שימוש בהלוצינוגנים.',
    category: 'abbreviation'
  },
  {
    term: 'MAOI',
    fullForm: 'Monoamine Oxidase Inhibitor',
    meaning: 'מעכב אנזים המפרק מוליכים עצביים, משמש להארכת השפעת חומרים מסוימים.',
    category: 'abbreviation'
  },
  {
    term: 'DMN',
    fullForm: 'Default Mode Network',
    meaning: 'רשת במוח הפעילה כשאנחנו לא ממוקדים במשימה חיצונית.',
    category: 'abbreviation'
  },
  {
    term: 'SSRI',
    fullForm: 'Selective Serotonin Reuptake Inhibitor',
    meaning: 'משפחת תרופות נוגדות דיכאון (כמו ציפרלקס) המעכבות ספיגה חוזרת של סרוטונין.',
    category: 'abbreviation'
  },
  {
    term: 'MAPS',
    fullForm: 'Multidisciplinary Association for Psychedelic Studies',
    meaning: 'ארגון ללא מטרות רווח המקדם מחקר וחינוך בתחום הפסיכדליה.',
    category: 'abbreviation'
  },
  {
    term: 'DMT',
    fullForm: 'N,N-Dimethyltryptamine',
    meaning: 'מולקולה פסיכדלית עוצמתית.',
    category: 'abbreviation'
  },
  {
    term: 'THC',
    fullForm: 'Tetrahydrocannabinol',
    meaning: 'המרכיב הפסיכואקטיבי העיקרי בקנאביס.',
    category: 'abbreviation'
  },
  {
    term: 'CBD',
    fullForm: 'Cannabidiol',
    meaning: 'מרכיב לא פסיכואקטיבי בקנאביס.',
    category: 'abbreviation'
  },
  {
    term: 'LSD',
    fullForm: 'Lysergic acid diethylamide',
    meaning: 'חומר פסיכדלי חזק.',
    category: 'abbreviation'
  },
  {
    term: 'MDMA',
    fullForm: '3,4-Methylenedioxymethamphetamine',
    meaning: 'אמפתוגן וממריץ.',
    category: 'abbreviation'
  },
  {
    term: 'PFC',
    fullForm: 'Prefrontal Cortex',
    meaning: 'קליפת המוח הקדם-מצחית.',
    category: 'abbreviation'
  },
  {
    term: 'BBB',
    fullForm: 'Blood-Brain Barrier',
    meaning: 'מחסום דם-מוח.',
    category: 'abbreviation'
  },
  {
    term: 'CNS',
    fullForm: 'Central Nervous System',
    meaning: 'מערכת העצבים המרכזית.',
    category: 'abbreviation'
  },
  {
    term: 'PNS',
    fullForm: 'Peripheral Nervous System',
    meaning: 'מערכת העצבים ההיקפית.',
    category: 'abbreviation'
  },
  {
    term: 'GABA',
    fullForm: 'Gamma-Aminobutyric Acid',
    meaning: 'המוליך העצבי המעכב העיקרי.',
    category: 'abbreviation'
  }
];

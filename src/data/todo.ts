export interface TodoItem {
  id: string;
  version: string;
  title: string;
  description: string;
  completed: boolean;
}

export const todoList: TodoItem[] = [
  { 
    id: '1', 
    version: '0.0.1', 
    title: 'השקת MVP', 
    description: 'מערכת בסיסית, צ\'אט AI, התחברות גוגל.', 
    completed: true 
  },
  { 
    id: '2', 
    version: '0.0.2', 
    title: 'ספריית חוויות', 
    description: 'קטלוג חוויות, מודל דירוג, ותחליפים קדושים.', 
    completed: true 
  },
  { 
    id: '3', 
    version: '0.0.3', 
    title: 'הרחבת מאגר ועיצוב', 
    description: 'הוספת קוקאין, קטמין, 3-MMC ועוד. עיצוב Cyber Spiritual.', 
    completed: true 
  },
  { 
    id: '4', 
    version: '0.0.4', 
    title: 'מערכת מפת דרכים (TODO)', 
    description: 'מסמך ותצוגת מפת דרכים בתוך האפליקציה למעקב אחר שדרוגים.', 
    completed: true 
  },
  { 
    id: '5', 
    version: '0.0.5', 
    title: 'מחולל תחליפים קהילתי (AI)', 
    description: 'אפשרות לכל משתמש ליצור תחליף חדש לסטלה בעזרת AI, ושיתופו עם הקהילה.', 
    completed: true 
  },
  { 
    id: '6', 
    version: '0.0.6', 
    title: 'פרופיל משתמש אישי', 
    description: 'אזור אישי לשמירת חוויות מועדפות, תחליפים שנוסו, ומעקב התפתחות אישית.', 
    completed: true 
  },
  { 
    id: '7', 
    version: '0.0.7', 
    title: 'מצב Trip Sitter (שומר סף)', 
    description: 'מצב AI ייעודי להרגעה, קרקוע (Grounding) ותמיכה בזמן אמת במצבי חרדה.', 
    completed: true 
  },
  { 
    id: '8', 
    version: '0.0.8', 
    title: 'מפת גוף אינטראקטיבית', 
    description: 'תצוגה ויזואלית של גוף האדם המראה היכן כל חומר ותחליף משפיעים פיזית ואנרגטית.', 
    completed: true 
  },
  { 
    id: '9', 
    version: '0.0.9', 
    title: 'נגן תדרים מובנה', 
    description: 'ספריית אודיו פנימית לתדרי סולפג\'יו, ביטים בינוראליים ומדיטציות מודרכות.', 
    completed: true 
  },
  { 
    id: '10', 
    version: '0.1.0', 
    title: 'דירוג קהילתי לתחליפים', 
    description: 'מערכת הצבעות (Upvote/Downvote) לתחליפים קדושים כדי למצוא את היעילים ביותר.', 
    completed: false 
  },
  { 
    id: '11', 
    version: '0.1.5', 
    title: 'תמיכת PWA (אפליקציה לנייד)', 
    description: 'הפיכת האתר לאפליקציה הניתנת להתקנה על הטלפון עם תמיכה באופליין.', 
    completed: false 
  },
  { 
    id: '12', 
    version: '0.1.7', 
    title: 'שדרוג ממשק ספריית חוויות', 
    description: 'הוספת אמוג׳ים לקטגוריות, הצגת מדדי רגש ומודעות, ותגיות השפעה בכרטיסיות.', 
    completed: true 
  },
  { 
    id: '13', 
    version: '0.1.8', 
    title: 'שדרוג ספריית חוויות - שלב ב\'', 
    description: 'סינון לפי איברי גוף, מיון מתקדם, מונה תחליפים, ואנימציות דופק דינמיות.', 
    completed: true 
  }
];

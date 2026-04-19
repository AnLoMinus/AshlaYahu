# ⚙️ ארכיטקטורה טכנית - Holly Hype

## 🏗️ מבנה המערכת
המערכת בנויה כ-Single Page Application (SPA) מודרנית עם יכולות Full-Stack ו-PWA.

### 💻 Frontend
- **Framework**: React 18+ עם Vite.
- **Styling**: Tailwind CSS (Mobile-First approach).
- **Animations**: Motion (framer-motion) לחוויה חלקה.
- **Icons**: Lucide React.
- **State Management**: React Hooks (useState, useEffect, useMemo).

### 🛡️ Backend & Security
- **Firebase**:
  - **Authentication**: Google Auth (וחיבורים נוספים בעתיד).
  - **Firestore**: מסד נתונים NoSQL בזמן אמת.
  - **Security Rules**: הגנה על מידע אישי (PII) והרשאות מבוססות בעלות.
- **Express (Optional)**: לשימוש ב-APIs צד שרת וניהול סודות (Secrets).

### 📱 PWA (Progressive Web App)
- **Manifest**: הגדרת אייקונים, צבעים ומצב תצוגה (Standalone).
- **Service Workers**: ניהול מטמון (Cache) לטעינה מהירה ועבודה באופליין.
- **Offline Storage**: שימוש ב-LocalStorage ו-Firestore Offline Persistence.

### 🤖 AI Integration
- **Google GenAI SDK**: שימוש במודלי Gemini (Flash/Pro) לחילול תוכן ותמונות.
- **Prompt Engineering**: מערכת פרומפטים מובנית המבטיחה פלט מקצועי, בטוח ומעוצב (Markdown).

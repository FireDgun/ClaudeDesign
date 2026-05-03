// Pro Algorithm — content and 5-scene narrative shared across all variants.
// Each variant interprets these scenes in its own visual language.

export const brand = {
  name: "Pro Algorithm",
  nameHe: "פרו אלגוריתם",
  tagline: "תשתית ה-AI של תעשיית הבנייה",
  taglineEn: "AI infrastructure for construction",
  est: "2024",
  city: "Tel Aviv",
  cityHe: "תל אביב",
  email: "hello@proalgorithm.io",
  phone: "+972-3-1234567",
  address: "הלבבות 14, תל אביב",
};

/** The five scenes are the same story across all variants — each variant tells it differently. */
export const scenes = [
  {
    n: "01",
    key: "city",
    title: "אנחנו בונים את התשתית של הבנייה.",
    titleEn: "We build the infrastructure of construction.",
    eyebrow: "I — CITY VIEW",
    body: "Pro Algorithm נכנסת ב-2024 לפער הגדול ביותר בתעשייה: בעוד שכל ענף מודרני עבר דיגיטליזציה, אדריכלים ויזמים עדיין משרטטים, מתכננים, ומאשרים בקצב של פעם. אנחנו בונים את הבסיס — תשתית AI שמדברת בשפה של אדריכלים, של קבלנים, ושל יזמים.",
    audience: "מיועד ל: יזמי נדל\"ן, חברות בנייה גדולות, משרדי אדריכלות.",
  },
  {
    n: "02",
    key: "project",
    title: "כל פרויקט הוא שכבות.",
    titleEn: "Every project is layers.",
    eyebrow: "II — INTO THE PROJECT",
    body: "מבנה אינו אובייקט — הוא מערכת. שלד, מעטפת, מערכות, חדרים, אנשים. הפלטפורמה שלנו מפרקת כל פרויקט לשכבות שניתן לחקור, לחשב, ולשנות בנפרד. שינוי בקומה אחת משדר אדוות לכל המערכת בזמן אמת.",
    audience: "תאומים דיגיטליים מלאים מהיום הראשון.",
  },
  {
    n: "03",
    key: "plans",
    title: "מסקיצה לתוכנית — בשעות.",
    titleEn: "From sketch to plan — in hours.",
    eyebrow: "III — ARCHITECTURAL PLANS",
    body: "מנוע ה-Plans שלנו מקבל תיאור טקסטואלי או סקיצה, ומחזיר תוכניות אדריכליות מלאות: קומות, חתכים, מידות, פירוטים. הכל נכתב ב-DWG/IFC/RVT — קבצים שהאדריכל שלכם פותח בלי שינוי תהליך.",
    audience: "תפוקה: 240,000+ תוכניות נוצרו עד היום.",
  },
  {
    n: "04",
    key: "cad",
    title: "תוסף שיושב ב-Revit, ב-AutoCAD, וב-ArchiCAD.",
    titleEn: "A plugin native to Revit, AutoCAD, and ArchiCAD.",
    eyebrow: "IV — INSIDE YOUR CAD",
    body: "המוצר שלנו לא מחליף את הסביבה שאתם מכירים — הוא מתלבש עליה. תוסף קל בתוך הכלים הקיימים שלכם, גישה לכל היכולות מבלי לעזוב את ה-viewport. 14 חברות בנייה גדולות בישראל כבר עובדות איתנו.",
    audience: "אינטגרציה: Revit · AutoCAD · ArchiCAD · BIM 360.",
  },
  {
    n: "05",
    key: "ai",
    title: "ה-AI לומד את הסטייל של המשרד שלך.",
    titleEn: "Our AI learns your firm's house style.",
    eyebrow: "V — AUTONOMOUS AI",
    body: "הצעד הבא: AI שלא רק מצייר — הוא מצייר כמוכם. מתאמן על תיק העבודות של המשרד שלכם, על ההעדפות, על השפה האדריכלית. המודלים שלנו ממוססים את הפער בין רעיון לקובץ DWG. זהו השלב שבו הקווים מצטיירים מעצמם.",
    audience: "Beta closed · open Q4 2026.",
    cta: { primary: "קבע הדגמה", secondary: "דבר עם המייסדים", href: "mailto:hello@proalgorithm.io" },
  },
];

export const stats = [
  { value: 14, suffix: "+", label: "חברות שותפות", desc: "מגדולי הבנייה בישראל" },
  { value: 240, suffix: "K+", label: "תוכניות נוצרו", desc: "מצטבר מאז 2024" },
  { value: 87, suffix: "%", label: "חיסכון בזמן שרטוט", desc: "ממוצע אצל לקוחות" },
  { value: 4.9, suffix: "/5", label: "שביעות רצון", desc: "מדגם N=120" },
];

export const products = [
  {
    n: "01",
    title: "AI Drafting Assistant",
    tag: "REVIT · AUTOCAD",
    body: "תוסף שיושב בתוך כלי השרטוט שלכם. הקלד הוראה — קבל קווים. הקלד שינוי — קבל גרסה.",
    tools: ["Revit 2024+", "AutoCAD 2025", "ArchiCAD 27"],
  },
  {
    n: "02",
    title: "Plan Auto-Generator",
    tag: "TEXT → DWG",
    body: "הזן תיאור פרוגרמטי, קבל תוכניות מפורטות. תומך בעברית ואנגלית, פלט ב-DWG/IFC/RVT.",
    tools: ["GPT-4 / Claude", "Custom diffusion", "Autodesk APIs"],
  },
  {
    n: "03",
    title: "3D Reconstructor",
    tag: "LIDAR → BIM",
    body: "סריקות LiDAR או צילום מצלמה, פלט BIM מלא. חישוב אוטומטי של כל המידות, החתכים, המסות.",
    tools: ["Faro · Leica", "Polycam", "Photogrammetry"],
  },
  {
    n: "04",
    title: "Smart Operations",
    tag: "IoT · ML",
    body: "אחרי המסירה — ניטור חי. תפוסה, אנרגיה, איכות אוויר. הבניין מדבר אחרי שהוא נמסר.",
    tools: ["AWS IoT Core", "Azure ML", "Tuya"],
  },
];

export const partners = [
  "ASHTROM",
  "AFRICA ISRAEL",
  "SHIKUN & BINUI",
  "ELECTRA",
  "CANADA-ISRAEL",
  "AZRIELI",
];

export const testimonials = [
  {
    quote: "הקבצים שאנחנו מקבלים מ-Pro Algorithm נכנסים ישר לפלטפורמת ה-BIM שלנו. אין שלב המרה. זה משהו שלא ראינו עד היום.",
    name: "יעל ברנשטיין",
    role: "VP Innovation, Ashtrom",
    project: "מגדל הליקס · תל אביב",
  },
  {
    quote: "קיצרנו 12 שבועות מתהליך התכנון של פרויקט שלם. במקום לחזור על איטרציות — האלגוריתם מחזיר 40 אפשרויות בלילה.",
    name: "אלון פרידמן",
    role: "Senior Architect, Africa Israel",
    project: "Sky Gardens · הרצליה",
  },
  {
    quote: "הניסיון של תוסף שלא צריך להיכנס לפורטל אחר — שינה לנו את היום-יום. הצוות שלנו מאמץ AI בלי שהם בכלל מרגישים.",
    name: "דוד אסולין",
    role: "CTO, Electra Construction",
    project: "Coral Block · אילת",
  },
];

export const team = [
  { name: "יואב לוי", role: "Co-founder · CEO", bg: "ex-Autodesk" },
  { name: "מיה כהן", role: "Co-founder · CTO", bg: "PhD CS · Technion" },
  { name: "תומר אברהם", role: "Head of Architecture", bg: "ex-SOM, NYC" },
  { name: "נועה גלעד", role: "Head of ML", bg: "ex-Anthropic" },
];

/** External imagery used by some variants. */
export const imagery = {
  city: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2400&q=85",
  building: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85",
  plans: "https://images.unsplash.com/photo-1503387762-cf2253c8f3ca?auto=format&fit=crop&w=2000&q=85",
  cad: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=85",
};

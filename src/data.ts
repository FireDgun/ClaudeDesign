export const services = [
  {
    n: "01",
    tag: "ARCHITECTURE",
    title: "תכנון אדריכלי",
    body: "תכנון פרמטרי בעזרת AI, מודלים תלת-ממדיים אינטראקטיביים, וניתוח אקלימי בזמן אמת.",
    tools: ["Rhino", "Grasshopper", "Revit", "Twinmotion"],
  },
  {
    n: "02",
    tag: "MANAGEMENT",
    title: "ניהול פרויקטים",
    body: "מערכת BIM משולבת עם IoT לניטור התקדמות, חומרים ואיכות בכל שניה.",
    tools: ["BIM 360", "Procore", "Power BI", "Slack"],
  },
  {
    n: "03",
    tag: "IOT",
    title: "Smart Buildings",
    body: "תשתיות חכמות, חיישנים אוטונומיים, אופטימיזציית אנרגיה — בניינים שחושבים.",
    tools: ["Siemens", "Honeywell", "AWS IoT", "Tuya"],
  },
  {
    n: "04",
    tag: "SCAN",
    title: "סריקות 3D",
    body: "LiDAR ופוטוגרמטריה ברזולוציית מילימטר. תאומים דיגיטליים לכל מבנה קיים.",
    tools: ["Faro", "Leica", "Polycam", "Reality Capture"],
  },
];

export const projects = [
  {
    title: "Helix Tower",
    location: "תל אביב",
    year: "2026",
    type: "מגדל מגורים",
    floors: 47,
    accent: "#7cf9ff",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Sky Gardens",
    location: "הרצליה",
    year: "2025",
    type: "מתחם משרדים",
    floors: 22,
    accent: "#ff6b6b",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Nexus Hub",
    location: "ירושלים",
    year: "2026",
    type: "מרכז טכנולוגי",
    floors: 14,
    accent: "#a78bfa",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Coral Block",
    location: "אילת",
    year: "2027",
    type: "מלון בוטיק",
    floors: 9,
    accent: "#fbbf24",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Echo Plaza",
    location: "חיפה",
    year: "2027",
    type: "מרכז תרבות",
    floors: 6,
    accent: "#34d399",
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1600&q=80",
  },
];

export const stats = [
  { value: 187, suffix: "+", label: "פרויקטים שהושלמו", desc: "מנתב\"ג ועד אילת" },
  { value: 42, suffix: "M³", label: "סריקות 3D מבוצעות", desc: "ברזולוציית מילימטר" },
  { value: 98, suffix: "%", label: "שביעות רצון לקוחות", desc: "על פי סקרים פנימיים" },
  { value: 12, suffix: "Yr", label: "שנות ניסיון בתעשייה", desc: "צוות של 24 מומחים" },
];

export const testimonials = [
  {
    quote:
      "התהליך היה שונה מכל מה שהכרנו. ראינו את הבניין שלנו ב-VR לפני שנגעו באבן. כל שינוי שביקשנו קיבל מענה תוך שעות.",
    name: "יעל ברנשטיין",
    role: "מנכ\"לית, פרסונה גרופ",
    project: "Helix Tower",
  },
  {
    quote:
      "השילוב של AI ו-IoT הוריד לנו 23% מעלויות התחזוקה השוטפות. הבניין באמת חושב לבד.",
    name: "ארז דהן",
    role: "Director of Operations, NextWave",
    project: "Sky Gardens",
  },
  {
    quote:
      "סריקת הלייזר חשפה בעיות במבנה הקיים שאף סוקר לא ראה. חסכו לנו 2.4 מיליון ש\"ח לפני שהתחלנו.",
    name: "דוד אסולין",
    role: "יו\"ר, אסולין נדל\"ן",
    project: "Coral Block",
  },
];

export const process = [
  { n: "01", title: "אבחון וברייף", body: "פגישה ראשונה, סריקה של השטח, מיפוי צרכים — מה אתם רוצים שהבניין שלכם יהיה.", duration: "שבוע 1" },
  { n: "02", title: "תכנון פרמטרי", body: "מודלים תלת-ממדיים, אלגוריתמים שמייצרים מאות אפשרויות, אופטימיזציה לאור, אקלים ועלות.", duration: "שבועות 2-6" },
  { n: "03", title: "הדמיה אינטראקטיבית", body: "סיור VR בבניין שלכם — לפני שהוא קיים. כל קיר, כל חלון, כל גרגיר אור.", duration: "שבועות 7-8" },
  { n: "04", title: "הפקה וביצוע", body: "BIM משולב עם IoT — ניטור התקדמות, איכות וחומרים בזמן אמת. אתם רואים הכל.", duration: "חודשים 3-24" },
  { n: "05", title: "מסירה חכמה", body: "המבנה נמסר עם תאום דיגיטלי מלא, חיישנים פעילים ומערכת ניהול חכמה.", duration: "מסירה" },
];

export const heroImage =
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2400&q=85";

export const aboutImage =
  "https://images.unsplash.com/photo-1503387762-cf2253c8f3ca?auto=format&fit=crop&w=1600&q=80";

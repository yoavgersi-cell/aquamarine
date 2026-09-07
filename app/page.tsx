import Image from "next/image";
import { Carousel, type Artwork } from "./carousel";

/* =========================================================================
 *  תוכן לעריכה — כל הטקסטים, השמות והלינקים במקום אחד.
 *  להחליף את התמונות: להעלות קבצים לתיקיית /public ולעדכן את הנתיבים כאן.
 *  (כרגע מוצגות תמונות placeholder זמניות)
 * ========================================================================= */

const ARTIST = {
  name: "Marine Attia Zohar",
  subtitle: "אמנית רב-תחומית", // תת-כותרת קטנה מתחת לשם
  phone: "050-000-0000", // ← להחליף במספר האמיתי
};

// הסיפור שלי — above the fold (פסקה בכתב מוטה, כמו ציטוט)
const HERO_WELCOME = "ברוכים הבאים לעולם שלי";
const HERO_STORY =
  "האהבה שלי לאומנות וליצירה מלווה אותי מאז שאני זוכרת את עצמי. אחרי כמה שנים של הפסקה, החלטתי לחזור הביתה – אל הצבעים, המכחולים והחומר. הפעם, בחרתי לשים את האומנות במרכז הבמה של חיי, להשקיע בזה את כל כולי, להתפתח ולחדש בלי הפסקה.";

// יצירות בקרוסלה. אפשר להוסיף caption לכל יצירה (שם/טכניקה) והוא יופיע מתחתיה.
const GALLERY: Artwork[] = [
  { src: "/art-panda.png", alt: "פנדה אדומה עם משקפיים", w: 1165, h: 1350 },
  { src: "/art-plumeria.png", alt: "פרחים לבנים מול הים", w: 1254, h: 1254 },
  { src: "/art-sculpture.png", alt: "פסל מופשט בכחול וירוק", w: 1086, h: 1449 },
  { src: "/art-zebra.png", alt: "זברה עם זר עלים", w: 1117, h: 1408 },
];

// סקשן 1 — ציטוט מימין, יצירה משמאל  (עדיין תוכן זמני — ממתין לחומרים)
const FEATURE_1 = {
  quote:
    "אני לא מציירת מה שאני רואה, אלא מה שאני מרגישה כשאני עוצמת עיניים. הצבע הוא השפה, והבד הוא המקום היחיד שבו אני באמת שקטה.",
  signature: "— על התהליך",
  art: "/feature-1.svg",
  w: 1000,
  h: 1100,
};

// סקשן 2 — ציטוט משמאל, יצירה מימין
const FEATURE_2 = {
  quote:
    "העולם שלי מתפרש על פני מגוון מדיומים שמתפתחים ומשתנים כל הזמן: החל מציורי קנבס עזים וכדים צבועים בעבודת יד שמקבלים חיים חדשים, ועד ליצירות פופ-ארט מודרניות ומפתיעות, המשלבות קוביות לגו יחד עם חומרים מהטבע – כמו עציצי לגו ייחודיים שיוצרים משהו חדש ומרתק בעין.",
  signature: "",
  art: "/feature-2.png",
  w: 1254,
  h: 1254,
};

export default function Page() {
  const telHref = `tel:${ARTIST.phone.replace(/[^0-9+]/g, "")}`;

  return (
    <main>
      {/* ---------- Above the fold ---------- */}
      <header className="hero">
        <div className="container hero__grid">
          <div className="hero__portrait">
            <Image
              src="/portrait.png"
              alt={`תמונת פורטרט של ${ARTIST.name}`}
              width={1254}
              height={1254}
              priority
            />
          </div>
          <div className="hero__story">
            <h1 className="hero__name">
              {ARTIST.name}
              <span>{ARTIST.subtitle}</span>
            </h1>
            <p className="hero__welcome">{HERO_WELCOME}</p>
            <blockquote className="quote">{HERO_STORY}</blockquote>
          </div>
        </div>
      </header>

      {/* ---------- קרוסלת יצירות ---------- */}
      <section className="section" aria-labelledby="gallery-title">
        <div className="section__head">
          <p className="eyebrow">הגלריה</p>
          <h2 className="section__title" id="gallery-title">
            כמה מהיצירות
          </h2>
        </div>
        <Carousel items={GALLERY} />
      </section>

      {/* ---------- סקשן 1: ציטוט מימין, יצירה משמאל ---------- */}
      <section className="section section--tint">
        <div className="container feature__grid feature--quote-start">
          <div className="feature__text">
            <blockquote className="quote">{FEATURE_1.quote}</blockquote>
            {FEATURE_1.signature ? (
              <p className="signature">{FEATURE_1.signature}</p>
            ) : null}
          </div>
          <div className="feature__art">
            <Image
              src={FEATURE_1.art}
              alt="יצירה נבחרת"
              width={FEATURE_1.w}
              height={FEATURE_1.h}
            />
          </div>
        </div>
      </section>

      {/* ---------- סקשן 2: ציטוט משמאל, יצירה מימין ---------- */}
      <section className="section">
        <div className="container feature__grid feature--quote-end">
          <div className="feature__art">
            <Image
              src={FEATURE_2.art}
              alt="פרנג'יפני מול הים — יצירה ממוסגרת בסלון"
              width={FEATURE_2.w}
              height={FEATURE_2.h}
            />
          </div>
          <div className="feature__text">
            <blockquote className="quote">{FEATURE_2.quote}</blockquote>
            {FEATURE_2.signature ? (
              <p className="signature">{FEATURE_2.signature}</p>
            ) : null}
          </div>
        </div>
      </section>

      {/* ---------- צור קשר ---------- */}
      <section className="contact" id="contact">
        <div className="container">
          <h2 className="contact__title">מעוניינים ביצירה?</h2>
          <p className="contact__text">
            היצירות נמכרות ביחידות וניתן להזמין גם עבודות מותאמות אישית. אשמח
            לשמוע מה מדבר אליכם — צרו קשר להזמנות מראש ולפרטים נוספים.
          </p>
          <a className="contact__phone" href={telHref}>
            {ARTIST.phone}
          </a>
          <p className="contact__note">הזמנות מראש · עבודות בהתאמה אישית · משלוחים</p>
        </div>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} {ARTIST.name} · {ARTIST.subtitle}
      </footer>
    </main>
  );
}

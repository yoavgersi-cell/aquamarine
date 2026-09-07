import Image from "next/image";

/* =========================================================================
 *  תוכן לעריכה — כל הטקסטים, השמות והלינקים במקום אחד.
 *  להחליף את התמונות: להעלות קבצים לתיקיית /public ולעדכן את הנתיבים כאן.
 *  (כרגע מוצגות תמונות placeholder זמניות)
 * ========================================================================= */

const ARTIST = {
  name: "אקוומרין",
  subtitle: "Aquamarine",
  phone: "050-000-0000", // ← להחליף במספר האמיתי
};

// הסיפור שלי — above the fold (פסקה בכתב מוטה, כמו ציטוט)
const HERO_STORY =
  "התחלתי לצייר כשחיפשתי דרך לתפוס את האור שבין הרגעים. כל יצירה היא פיסה מהעולם הפנימי שלי — צבע, מים, ותנועה שלא נעצרת. אני מזמינה אתכם להיכנס פנימה.";
const HERO_SIGNATURE = "— הסיפור שלי";

// יצירות בקרוסלה
const GALLERY = [
  { src: "/art-1.svg", caption: "ללא כותרת, אקריליק על בד" },
  { src: "/art-2.svg", caption: "גלים, טכניקה מעורבת" },
  { src: "/art-3.svg", caption: "שקט, צבעי מים" },
  { src: "/art-4.svg", caption: "עומק, שמן על בד" },
  { src: "/art-5.svg", caption: "בין הצבעים, אקריליק" },
];

// סקשן 1 — ציטוט מימין, יצירה משמאל
const FEATURE_1 = {
  quote:
    "אני לא מציירת מה שאני רואה, אלא מה שאני מרגישה כשאני עוצמת עיניים. הצבע הוא השפה, והבד הוא המקום היחיד שבו אני באמת שקטה.",
  signature: "— על התהליך",
  art: "/feature-1.svg",
};

// סקשן 2 — ציטוט משמאל (כתב מוטה), יצירה מימין
const FEATURE_2 = {
  quote:
    "כל גוון של תכלת נושא בתוכו סיפור אחר. יש בו את הים של הילדות, ואת השמיים שאליהם אני עדיין מסתכלת בתקווה.",
  signature: "— על ההשראה",
  art: "/feature-2.svg",
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
              src="/portrait.svg"
              alt={`תמונת פורטרט של ${ARTIST.name}`}
              width={900}
              height={1200}
              priority
            />
          </div>
          <div className="hero__story">
            <h1 className="hero__name">
              {ARTIST.name}
              <span>{ARTIST.subtitle}</span>
            </h1>
            <blockquote className="quote">{HERO_STORY}</blockquote>
            <p className="signature">{HERO_SIGNATURE}</p>
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
        <div className="carousel" role="list">
          {GALLERY.map((item, i) => (
            <figure className="carousel__item" role="listitem" key={i}>
              <Image
                src={item.src}
                alt={item.caption}
                width={1000}
                height={1000}
              />
              <figcaption className="carousel__caption">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
        <p className="carousel__hint">← החליקו לצדדים לגלישה →</p>
      </section>

      {/* ---------- סקשן 1: ציטוט מימין, יצירה משמאל ---------- */}
      <section className="section section--tint">
        <div className="container feature__grid feature--quote-start">
          <div className="feature__text">
            <blockquote className="quote">{FEATURE_1.quote}</blockquote>
            <p className="signature">{FEATURE_1.signature}</p>
          </div>
          <div className="feature__art">
            <Image
              src={FEATURE_1.art}
              alt="יצירה נבחרת"
              width={1000}
              height={1100}
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
              alt="יצירה נבחרת"
              width={1000}
              height={1100}
            />
          </div>
          <div className="feature__text">
            <blockquote className="quote">{FEATURE_2.quote}</blockquote>
            <p className="signature">{FEATURE_2.signature}</p>
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

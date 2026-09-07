import Image from "next/image";
import { Carousel, type Artwork } from "./carousel";

/* =========================================================================
 *  תוכן לעריכה — כל הטקסטים, השמות והלינקים במקום אחד.
 *  להחליף את התמונות: להעלות קבצים לתיקיית /public ולעדכן את הנתיבים כאן.
 *  (כרגע מוצגות תמונות placeholder זמניות)
 * ========================================================================= */

const ARTIST = {
  name: "מרין אטיה זוהר",
  subtitle: "אמנית רב-תחומית", // תת-כותרת קטנה מתחת לשם
  phone: "054-7331315",
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

// סקשן 1 — ציטוט מימין, יצירה משמאל
const FEATURE_1 = {
  quote:
    "אני יוצרת מתוך רצון עמוק לגעת באנשים. מבחינתי, כל עבודה היא סיפור חד פעמי שנולד כדי להעניק מתנה מרגשת, מקורית ומלאת מחשבה – עבור האנשים שאני אוהבת, ועבור אלו שמחפשים לתת לאנשים החשובים בחייהם פריט אומנות ייחודי עם נשמה.",
  signature: "",
  art: "/feature-1.png",
  w: 1312,
  h: 1199,
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
  // WhatsApp link (Israel): drop the leading 0 and prepend the 972 country code.
  const waHref = `https://wa.me/972${ARTIST.phone.replace(/\D/g, "").replace(/^0/, "")}`;
  const year = new Date().getFullYear();

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
            <div className="hero__intro">
              <h1 className="hero__name">
                {ARTIST.name}
                <span>{ARTIST.subtitle}</span>
              </h1>
              <p className="hero__welcome">{HERO_WELCOME}</p>
            </div>
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
              alt="יצירת דובדבנים ממוסגרת במטבח"
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
          <a
            className="contact__phone"
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="contact__wa"
              viewBox="0 0 24 24"
              width="22"
              height="22"
              aria-hidden="true"
            >
              <path
                fill="#25D366"
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.447h.006c6.585 0 11.946-5.335 11.949-11.893a11.821 11.821 0 00-3.495-8.407"
              />
            </svg>
            <span dir="ltr">{ARTIST.phone}</span>
          </a>
          <p className="contact__note">הזמנות מראש · עבודות בהתאמה אישית · משלוחים</p>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <span className="footer__name">{ARTIST.name}</span>
            <span className="footer__role">{ARTIST.subtitle}</span>
          </div>
          <div className="footer__meta">
            <a
              className="footer__link"
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ARTIST.phone}
            </a>
            <span className="footer__copy">
              © {year} מרין אטיה זוהר · כל הזכויות שמורות
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

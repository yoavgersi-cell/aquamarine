"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type Artwork = {
  src: string;
  alt: string;
  caption?: string;
  w: number;
  h: number;
};

export function Carousel({ items }: { items: Artwork[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Scroll a given slide to the center. scrollIntoView({inline:"center"})
  // handles RTL automatically, so no manual scroll-direction math.
  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(items.length - 1, i));
      const slide = track.children[clamped] as HTMLElement | undefined;
      slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    },
    [items.length],
  );

  // Derive the active slide from whichever one is nearest the track centre.
  // Using getBoundingClientRect keeps this correct under RTL scrolling.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const update = () => {
      const rect = track.getBoundingClientRect();
      const mid = rect.left + rect.width / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const r = (child as HTMLElement).getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="carousel">
      {/* In RTL, earlier items sit to the right and later items to the left,
          so the "previous" control lives on the right and "next" on the left. */}
      <button
        type="button"
        className="carousel__arrow carousel__arrow--prev"
        aria-label="היצירה הקודמת"
        onClick={() => goTo(active - 1)}
        disabled={active === 0}
      >
        <span dir="ltr" aria-hidden="true">›</span>
      </button>

      <div className="carousel__track" ref={trackRef} role="list">
        {items.map((it, i) => (
          <figure
            key={it.src}
            className={"carousel__item" + (i === active ? " is-active" : "")}
            role="listitem"
          >
            <div className="carousel__frame">
              <Image
                src={it.src}
                alt={it.alt}
                width={it.w}
                height={it.h}
                sizes="(max-width: 720px) 80vw, 360px"
              />
            </div>
            {it.caption ? (
              <figcaption className="carousel__caption">{it.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      <button
        type="button"
        className="carousel__arrow carousel__arrow--next"
        aria-label="היצירה הבאה"
        onClick={() => goTo(active + 1)}
        disabled={active === items.length - 1}
      >
        <span dir="ltr" aria-hidden="true">‹</span>
      </button>

      <div className="carousel__dots" aria-label="ניווט בין היצירות">
        {items.map((it, i) => (
          <button
            key={it.src}
            type="button"
            className={"carousel__dot" + (i === active ? " is-active" : "")}
            aria-label={`יצירה ${i + 1}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

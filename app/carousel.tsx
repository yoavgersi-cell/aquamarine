"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

  // Keep the active dot in sync with whichever slide is centred while the
  // visitor swipes/scrolls. No arrows, no auto-advance — manual only.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const update = () => {
      const rect = track.getBoundingClientRect();
      const mid = rect.left + rect.width / 2;
      let best = 0;
      let bestD = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const r = (child as HTMLElement).getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestD) {
          bestD = d;
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

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    (track.children[i] as HTMLElement | undefined)?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <div className="carousel">
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

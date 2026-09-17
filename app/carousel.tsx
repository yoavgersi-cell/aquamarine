"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Run the centring before the browser paints so the carousel never visibly
// jumps from its edge to the centred slide. Falls back to useEffect on the
// server to avoid the SSR warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
  const n = items.length;
  // Three identical copies give a seamless, endless manual loop: scroll into an
  // edge copy and we jump to the matching card in the middle copy — invisibly,
  // because the copies are pixel-identical exactly one copy-width apart.
  const loop = [...items, ...items, ...items];

  useIsomorphicLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const kids = () => Array.from(track.children) as HTMLElement[];

    const centeredIndex = () => {
      const rect = track.getBoundingClientRect();
      const mid = rect.left + rect.width / 2;
      let best = 0;
      let bestD = Infinity;
      kids().forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      return best;
    };

    // Centre a slide by scrolling ONLY the track horizontally (never the page).
    // scrollIntoView would scroll the window vertically to the carousel, which
    // made the page open scrolled to the middle. getBoundingClientRect + scrollBy
    // are physical-pixel based, so this is also RTL-safe.
    const centerOn = (i: number, smooth: boolean) => {
      const el = kids()[i];
      if (!el) return;
      const tr = track.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      const delta = er.left + er.width / 2 - (tr.left + tr.width / 2);
      track.scrollBy({ left: delta, behavior: smooth ? "smooth" : "auto" });
    };

    // Begin centred on the first artwork of the middle copy.
    centerOn(n, false);
    setActive(0);

    let raf = 0;
    let settle = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setActive(centeredIndex() % n);
        // Once scrolling settles, recentre into the middle copy if we drifted
        // into an edge copy.
        clearTimeout(settle);
        settle = window.setTimeout(() => {
          const c = centeredIndex();
          if (c < n || c >= 2 * n) centerOn((c % n) + n, false);
        }, 130);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(settle);
    };
  }, [n]);

  const goTo = (real: number) => {
    const track = trackRef.current;
    if (!track) return;
    const el = track.children[real + n] as HTMLElement | undefined;
    if (!el) return;
    // Horizontal-only centering (see centerOn above) — never scrolls the page.
    const tr = track.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    const delta = er.left + er.width / 2 - (tr.left + tr.width / 2);
    track.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="carousel">
      <div className="carousel__track" ref={trackRef} role="list">
        {loop.map((it, i) => (
          <figure
            key={i}
            className="carousel__item"
            role="listitem"
            aria-hidden={i < n || i >= 2 * n ? true : undefined}
          >
            <div className="carousel__frame">
              <Image
                src={it.src}
                alt={it.alt}
                width={it.w}
                height={it.h}
                sizes="(max-width: 720px) 80vw, 340px"
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

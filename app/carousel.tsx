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
  const n = items.length;
  // Three identical copies → a seamless endless manual loop. We never scroll on
  // load (that would jump after the first paint); CSS puts the first card at its
  // resting snap position, and we only reposition once the visitor swipes.
  const loop = [...items, ...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const kids = () => Array.from(track.children) as HTMLElement[];

    // Mobile snaps cards to centre; desktop snaps to the start (fills the row).
    // The reference point and each card's alignment edge follow that, all in
    // physical pixels so the math is RTL-safe.
    const isMobile = () => window.matchMedia("(max-width: 720px)").matches;
    const refX = () => {
      const tr = track.getBoundingClientRect();
      return isMobile() ? tr.left + tr.width / 2 : tr.right;
    };
    const edgeX = (r: DOMRect) => (isMobile() ? r.left + r.width / 2 : r.right);

    const currentIndex = () => {
      const ref = refX();
      let best = 0;
      let bestD = Infinity;
      kids().forEach((c, i) => {
        const d = Math.abs(edgeX(c.getBoundingClientRect()) - ref);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      return best;
    };

    // Scroll ONLY the track horizontally (never the page).
    const alignTo = (i: number, smooth: boolean) => {
      const el = kids()[i];
      if (!el) return;
      const delta = edgeX(el.getBoundingClientRect()) - refX();
      track.scrollBy({ left: delta, behavior: smooth ? "smooth" : "auto" });
    };

    // Hop to the identical slide in the middle copy — but only once scrolling
    // has fully STOPPED, and with snap momentarily off so the browser can't
    // re-snap and slide visibly. The copies are pixel-identical exactly one
    // copy-width apart, so the hop is invisible.
    let repositioning = false;
    const reposition = () => {
      const c = currentIndex();
      if (c >= n && c < 2 * n) return; // already in the middle copy
      const el = kids()[(c % n) + n];
      if (!el) return;
      repositioning = true;
      const prevSnap = track.style.scrollSnapType;
      track.style.scrollSnapType = "none";
      const delta = edgeX(el.getBoundingClientRect()) - refX();
      track.scrollBy({ left: delta, behavior: "auto" });
      void track.offsetWidth; // flush before re-enabling snap (no animation)
      track.style.scrollSnapType = prevSnap;
      repositioning = false;
    };

    setActive(0);

    let raf = 0;
    let settle = 0;
    const onScroll = () => {
      if (repositioning) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setActive(currentIndex() % n));
      clearTimeout(settle);
      settle = window.setTimeout(reposition, 160);
    };
    track.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(settle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  const goTo = (real: number) => {
    const track = trackRef.current;
    if (!track) return;
    const el = track.children[real + n] as HTMLElement | undefined;
    if (!el) return;
    const isMobile = window.matchMedia("(max-width: 720px)").matches;
    const tr = track.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    const ref = isMobile ? tr.left + tr.width / 2 : tr.right;
    const edge = isMobile ? er.left + er.width / 2 : er.right;
    track.scrollBy({ left: edge - ref, behavior: "smooth" });
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

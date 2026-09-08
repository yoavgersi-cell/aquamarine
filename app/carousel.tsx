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
  // Three identical copies give a seamless, endless manual loop: scroll into an
  // edge copy and we jump to the matching card in the middle copy — invisibly,
  // because the copies are pixel-identical exactly one copy-width apart.
  const loop = [...items, ...items, ...items];

  useEffect(() => {
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

    const scrollToIndex = (i: number, smooth: boolean) => {
      kids()[i]?.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        inline: "center",
        block: "nearest",
      });
    };

    // Begin centred on the first artwork of the middle copy.
    scrollToIndex(n, false);
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
          if (c < n || c >= 2 * n) scrollToIndex((c % n) + n, false);
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
    (track.children[real + n] as HTMLElement | undefined)?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
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

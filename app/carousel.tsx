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
  // activeRaw = index of the centred slide within the doubled list.
  const [activeRaw, setActiveRaw] = useState(0);
  const n = items.length;
  // Render the set twice so we can scroll one past the end and snap back
  // invisibly — a seamless infinite loop.
  const slides = [...items, ...items];
  const active = activeRaw % n;

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

    // Start centred on the first artwork.
    scrollToIndex(0, false);
    setActiveRaw(0);

    // Keep the active dot in sync while the user scrolls/swipes.
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setActiveRaw(centeredIndex()));
    };
    track.addEventListener("scroll", onScroll, { passive: true });

    // Pause the auto-loop while the visitor is interacting.
    let paused = false;
    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };
    track.addEventListener("pointerdown", pause);
    track.addEventListener("pointerenter", pause);
    track.addEventListener("pointerup", resume);
    track.addEventListener("pointerleave", resume);

    // Auto-advance, unless the visitor prefers reduced motion.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = 0;
    let resetT = 0;
    if (!reduce) {
      timer = window.setInterval(() => {
        if (paused) return;
        const cur = centeredIndex();
        const nextIdx = cur + 1;
        if (nextIdx >= slides.length) {
          scrollToIndex(0, false);
          return;
        }
        scrollToIndex(nextIdx, true);
        // Stepping onto a cloned slide → jump back to its twin invisibly.
        if (nextIdx >= n) {
          clearTimeout(resetT);
          resetT = window.setTimeout(() => scrollToIndex(nextIdx - n, false), 700);
        }
      }, 3200);
    }

    return () => {
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("pointerdown", pause);
      track.removeEventListener("pointerenter", pause);
      track.removeEventListener("pointerup", resume);
      track.removeEventListener("pointerleave", resume);
      cancelAnimationFrame(raf);
      clearInterval(timer);
      clearTimeout(resetT);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

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
        {slides.map((it, i) => (
          <figure
            key={i}
            className={"carousel__item" + (i === activeRaw ? " is-active" : "")}
            role="listitem"
            aria-hidden={i >= n ? true : undefined}
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

"use client";


import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TechMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    gsap.to(trackRef.current, {
      xPercent: -100,
      duration: 12,
      repeat: 10,
      ease: 'circ.inOut',
    });
  }, []);

  
  return (
    <div className="w-full overflow-hidden bg-zinc-900 py-6">
      <div
        ref={trackRef}
        className="flex w-max gap-10 whitespace-nowrap"
      >
        {/* Primeira lista */}
        <MarqueeItem />
        {/* Segunda lista (clone) */}
        <MarqueeItem />
      </div>
    </div>
  );
}

function MarqueeItem() {
  return (
    <>
      <span className="px-6 py-3 bg-zinc-800 rounded-xl text-white">
        React
      </span>
      <span className="px-6 py-3 bg-zinc-800 rounded-xl text-white">
        Next.js
      </span>
      <span className="px-6 py-3 bg-zinc-800 rounded-xl text-white">
        TypeScript
      </span>
      <span className="px-6 py-3 bg-zinc-800 rounded-xl text-white">
        GSAP
      </span>
    </>
  );
}
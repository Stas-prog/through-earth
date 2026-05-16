"use client";

import { useState, useEffect } from "react";

import ThroughEarthButton from "./ThroughEarthButton";

type Phase =
  | "idle"
  | "dive"
  | "space"
  | "reveal"
  | "descent";

type Props = {
  onStart: (
    phase: string
  ) => Promise<void>;
};

export default function ThroughEarthSequence({
  onStart,
}: Props) {
  const [phase, setPhase] =
    useState<Phase>("idle");

  const [isPortrait, setIsPortrait] =
  useState(false);

useEffect(() => {
  setIsPortrait(
    window.innerHeight >
    window.innerWidth
  );
}, []);

useEffect(() => {
 const v =
 document.createElement(
   "video"
 );

 v.src =
 "/videos/travel2.mp4";
 v.src =
 "/videos/travel.mp4";

 v.preload =
   "auto";
}, []);

  const startSequence =
    async () => {
      // 🌍 DIVE
            setPhase("dive");

            await onStart("dive");

       // 🌌 SPACE
            setPhase("space");

            await onStart(
              "space"
            );

            // 🌍 REVEAL
            setPhase("reveal");

            await onStart(
              "reveal"
            );

            // 🌍 DESCENT
            setPhase("descent");

            await onStart(
              "descent"
            );

            // 🌍 RESET
            setPhase("idle");
    };

  return (
    <>
      {/* 🚀 BUTTON */}
      <ThroughEarthButton
        onClick={startSequence}
        disabled={
          phase !== "idle"
        }
      />

      {/* DEBUG */}
      <div
        className="
          fixed
          top-4
          left-4
          z-50
          text-white
          text-sm
          bg-black/40
          px-3
          py-1
          rounded-full
        "
      >
        {phase}
      </div>

      {/* 🎬 VIDEO */}
      {phase === "space" && (
        <video
          autoPlay
          muted
          playsInline
          preload="metadata"
          className="
            fixed
            inset-0
            w-full
            h-full
            object-contain
            md:object-cover
            z-50
            bg-black
          "
        >
          <source
            src={
              isPortrait
                ? "/videos/travel.mp4"
                : "/videos/travel2.mp4"
            }
            type="video/mp4"
          />
        </video>
      )}
    </>
  );
}
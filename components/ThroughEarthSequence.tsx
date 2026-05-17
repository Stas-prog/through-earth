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
    const update = () =>
      setIsPortrait(
        window.innerHeight >
          window.innerWidth
      );

    update();

    window.addEventListener(
      "resize",
      update
    );

    return () =>
      window.removeEventListener(
        "resize",
        update
      );
  }, []);

  const videoSrc =
    isPortrait
      ? "/videos/travel.mp4"
      : "/videos/travel2.mp4";

  useEffect(() => {
    const v =
      document.createElement(
        "video"
      );

    v.src = videoSrc;
    v.preload = "metadata";
    v.load();

    return () => {
      v.src = "";
    };
  }, [videoSrc]);

  const startSequence =
    async () => {
      setPhase("dive");
      await onStart("dive");

      setPhase("space");
      await onStart("space");

      setPhase("reveal");
      await onStart("reveal");

      setPhase("descent");
      await onStart("descent");

      setPhase("idle");
    };

  return (
    <>
      <ThroughEarthButton
        onClick={startSequence}
        disabled={
          phase !== "idle"
        }
      />

      <div className="fixed top-4 left-4 z-50 text-white">
        {phase}
      </div>

      {phase === "space" && (
        <video
         autoPlay
         muted
         playsInline
         preload="metadata"
         disablePictureInPicture
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
            src={videoSrc}
            type="video/mp4"
          />
        </video>
      )}
    </>
  );
}
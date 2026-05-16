"use client";

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

export default function ThroughEarthButton({
  onClick,
  disabled,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        absolute
        bottom-30
        pointer
        left-1/2
        -translate-x-1/2
        z-50
        px-8
        py-4
        rounded-2xl
        text-white
        text-lg
        tracking-[0.2em]
        uppercase
        backdrop-blur-md
        bg-white/10
        border
        border-white/20
        shadow-2xl
        hover:bg-white/20
        transition-all
        duration-500
        disabled:opacity-40
      "
    >
      Through Earth
    </button>
  );
}
import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <svg
        width="32"
        height="32"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" rx="12" className="fill-text-primary" />
        <path
          d="M35 70V30H55C63.2843 30 70 36.7157 70 45C70 53.2843 63.2843 60 55 60H45V70H35ZM45 50H55C57.7614 50 60 47.7614 60 45C60 42.2386 57.7614 40 55 40H45V50Z"
          className="fill-bg-primary"
        />
      </svg>
      <div className="flex flex-col">
        <span className="text-sm font-bold tracking-[0.3em] uppercase leading-none text-text-primary">
          Perspective
        </span>
        <span className="text-[9px] font-serif italic tracking-widest text-accent mt-1">
          Journal
        </span>
      </div>
    </div>
  );
}

export default Logo;

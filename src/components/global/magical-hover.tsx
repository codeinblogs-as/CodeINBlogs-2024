"use client";
import { useRef, useEffect } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...args: any[]) => {
  return twMerge(clsx(args));
};

const MagicalCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardsContainer = document.getElementById("cards-container");
    if (cardsContainer) {
      cardsContainer.onmousemove = (e) => {
        const cards = Array.from(document.getElementsByClassName("card"));
        for (const card of cards) {
          const htmlCard = card as HTMLElement;
          htmlCard.style.setProperty("--x", `${e.clientX}px`);
          htmlCard.style.setProperty("--y", `${e.clientY}px`);
          const rect = htmlCard.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

          htmlCard.style.setProperty("--x", `${x}px`);
          htmlCard.style.setProperty("--y", `${y}px`);
        }
      };
    }
  }, []);

  return (
    <>
      <div
        ref={cardRef}
        className={cn(
          "card rounded-md  bg-opacity-10 cursor-pointer before:absolute before:h-full before:w-full before:top-0 before:left-0  before:[border-radius:inherit] before:z-[3] before:bg-[radial-gradient(800px_circle_at_var(--x)_var(--y),_var(--tw-gradient-stops))] before:from-[#ffffff10] before:opacity-0 before:transition-all hover:before:opacity-90  before:to-[transparent_40%] relative grid place-items-center grow",
          className
        )}
      >
        <div className="border-0 absolute h-full w-full top-0 left-0  [border-radius:inherit] z-[1] bg-[radial-gradient(400px_circle_at_var(--x)_var(--y),_var(--tw-gradient-stops))] from-[#ffffff40] opacity-0 transition-all   to-[transparent_40%] group-hover:opacity-80"></div>
        <div className="content  [border-radius:inherit] z-[2] relative ">
          {children}
        </div>
      </div>
    </>
  );
};

export default MagicalCard;
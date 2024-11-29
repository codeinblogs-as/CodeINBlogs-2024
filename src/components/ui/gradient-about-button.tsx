import React from "react";

const GradientButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <a
      href={href || "#"}
      className="
        relative inline-flex items-center justify-center gap-[7.5px]
        px-[30px] py-[22px] text-white text-lg font-medium
        rounded-[14px] bg-[#010314] shadow-[0px_0px_4px_0px_rgba(119,68,255,0.5)]
        transition-all duration-300
        before:absolute before:inset-0 before:rounded-[14px]
        before:bg-gradient-to-r before:from-[#EB00FF] before:via-[#EB00FFBF] before:to-[#4200FFBF]
        before:-z-10 before:p-[1px] before:mask before:mask-border before:mask-composite-[exclude]
        active:brightness-110
      "
    >
      {text} <span className="ml-2">→</span>
    </a>
  );
};

export default GradientButton;

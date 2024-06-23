"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariantsOuter = cva("", {
  variants: {
    variant: {
      primary:
        "w-full border border-[2px] border-black bg-gradient-to-b from-whiteto-white/80 p-[1px] transition duration-300 ease-in-out ",
      accent:
        "w-full  border-[2px] border-neutral-950 bg-gradient-to-b from-indigo-200/70 to-indigo-500 p-[1px] transition duration-300 ease-in-out ",
      destructive:
        "w-full ] border-[2px] border-neutral-950 bg-gradient-to-b from-red-300/90 to-red-500 p-[1px] transition duration-300 ease-in-out ",
      secondary:
        "w-full border-[2px] border-neutral-950bg-neutral-600/50 p-[1px] transition duration-300 ease-in-out ",
      minimal:
        "group  w-full border-[2px] border-neutral-950 bg-neutral-600/80 p-[1px] active:bg-neutral-800 hover:bg-gradient-to-t hover:from-neutral-600/50 hover:to-neutral-600/70 active:bg-neutral-800",
      icon: "group rounded-full border border-neutral-950 bg-neutral-600/50 p-[1px] active:bg-neutral-800 hover:bg-gradient-to-t hover:from-neutral-700 hover:to-neutral-600 active:bg-neutral-800",
    },
    size: {
      sm: "rounded-[6px]",
      default: "rounded-[12px]",
      lg: "rounded-[12px]",
      icon: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
})

const innerDivVariants = cva(
  "w-full h-full flex items-center justify-center text-muted-foreground",
  {
    variants: {
      variant: {
        primary:
          "gap-2 bg-gradient-to-b from-neutral-200 to-neutral-50 text-sm text-black/80 transition duration-300 ease-in-out  hover:from-stone-200 hover:to-neutral-200 active:from-stone-300 active:to-neutral-300 active:bg-gradient-to-b  ",
        accent:
          "gap-2 bg-gradient-to-b from-indigo-400 to-indigo-600 text-sm text-white/90 transition duration-300 ease-in-out hover:bg-gradient-to-b hover:from-indigo-400/70 hover:to-indigo-600/70 active:bg-gradient-to-b  active:from-indigo-400 active:to-indigo-600",
        destructive:
          "gap-2 bg-gradient-to-b from-red-400/60 to-red-500/60 text-sm text-white/90 transition duration-300 ease-in-out hover:bg-gradient-to-b hover:from-red-400/70 hover:to-red-500/80 active:bg-gradient-to-b   active:from-red-400 active:to-red-500",
        secondary:
          "bg-gradient-to-b from-neutral-800 to-neutral-700/50 text-sm transition duration-300 ease-in-out hover:bg-gradient-to-b hover:from-neutral-700 hover:to-neutral-700/60 active:bg-gradient-to-b active:from-neutral-800 active:to-neutral-700",
        minimal:
          "bg-gradient-to-b from-neutral-800 to-neutral-700/50 text-sm transition duration-300 ease-in-out group-hover:bg-gradient-to-b group-hover:from-neutral-700 group-hover:to-neutral-700/60 group-active:bg-gradient-to-b group-active:from-neutral-800 group-active:to-neutral-700",
        icon: "bg-gradient-to-b from-neutral-800 to-neutral-700/50  group-active:bg-neutral-800 rounded-full",
      },
      size: {
        sm: "text-xs rounded-[4px] px-4 py-1",
        default: "text-sm rounded-[10px] px-4 py-2",
        lg: "text-base rounded-[10px] px-4 py-2",
        icon: " rounded-full p-1",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface UnifiedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
  | "primary"
  | "secondary"
  | "accent"
  | "destructive"
  | "minimal"
  | "icon"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const TextureButton = React.forwardRef<HTMLButtonElement, UnifiedButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "default",
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(buttonVariantsOuter({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        <div className={cn(innerDivVariants({ variant, size }))}>
          {children}
        </div>
      </Comp>
    )
  }
)

TextureButton.displayName = "TextureButton"

export { TextureButton }

// export TextureButton

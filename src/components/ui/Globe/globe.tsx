"use client";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef } from "react";
import { useSpring } from "react-spring";

const cn = (...args: any[]) => {
  return twMerge(clsx(args));
};

const GLOBE_CONFIG: COBEOptions = {
  width: 600,
  height: 600,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 1.5, // Adjusted for initial position
  theta: 0.3, // Adjusted for initial position
  dark: 1,
  diffuse: 0.2,
  mapSamples: 12000,
  mapBrightness: 15,
  baseColor: [18 / 255, 17 / 255, 29 / 255],
  markerColor: [250 / 255, 251 / 255, 252 / 255], // Adjusted marker color
  glowColor: [129 / 255, 140 / 255, 248 / 255],
  markers: [
    {
      location: [25.331558, 74.645722],
      size: 0.050,
    },
  ],
};

export const Globe = ({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) => {
  let phi = 1.5; // Adjusted for initial position
  let theta = 0.3; // Adjusted for initial position
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  const updatePointerInteraction = (value: any) => {
    pointerInteracting.current = value;
    canvasRef.current!.style.cursor = value ? "grabbing" : "grab";
  };

  const updateMovement = (clientX: any) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      api.start({ r: delta / 200 });
    }
  };

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.005;
      state.phi = phi;
      state.theta = theta + r.get();
      state.width = width * 2;
      state.height = width * 2;
    },
    [pointerInteracting, phi, theta, r]
  );

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 500); // Adjusted timeout for opacity
    return () => globe.destroy();
  }, []);

  return (
    <div className={cn("mx-auto aspect-[1/1] w-full max-w-[600px]", className)}>
      <canvas
        className={cn("h-full w-full opacity-0 transition-opacity duration-500")}
        ref={canvasRef}
        onPointerDown={(e) => updatePointerInteraction(e.clientX - pointerInteractionMovement.current)}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  );
};

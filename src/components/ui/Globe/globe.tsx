"use client"
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import createGlobe, { COBEOptions } from "cobe";
import { useEffect, useRef, useState } from "react";
import { useSpring } from "react-spring";
import Cookies from "js-cookie";

const cn = (...args: any[]) => {
  return twMerge(clsx(args));
};

const GLOBE_CONFIG: COBEOptions = {
  width: 600,
  height: 600,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 1.5,
  theta: 0.3,
  dark: 1,
  diffuse: 0.2,
  mapSamples: 12000,
  mapBrightness: 15,
  baseColor: [18 / 255, 17 / 255, 29 / 255],
  markerColor: [250 / 255, 251 / 255, 252 / 255],
  glowColor: [129 / 255, 140 / 255, 248 / 255],
  markers: [
    {
      location: [51.477928, -0.001545], // Default Latitude and Longitude [lat, long]
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
  let phi = 1.5;
  let theta = 0.3;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    const storedLocation = Cookies.get("userLocation");
    if (storedLocation) {
      setUserLocation(JSON.parse(storedLocation));
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const newUserLocation: [number, number] = [latitude, longitude];
          setUserLocation(newUserLocation);
          Cookies.set("userLocation", JSON.stringify(newUserLocation), { expires: 7 });
        },
        function (error) {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const onRender = (state: Record<string, any>) => {
    phi += 0.005;
    state.phi = phi;
    state.theta = theta + r.get();
    state.width = width * 2;
    state.height = width * 2;
  };

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const markers = userLocation
      ? [{ location: userLocation, size: 0.050 }]
      : config.markers;

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      markers,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 500);
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [userLocation, config]);

  return (
    <div className={cn("mx-auto aspect-[1/1] w-full max-w-[600px]", className)}>
      <canvas
        className={cn("h-full w-full opacity-0 transition-opacity duration-500")}
        ref={canvasRef}
      />
    </div>
  );
};



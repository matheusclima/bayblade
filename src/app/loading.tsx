"use client";

import Player from "lottie-react";
import animationData from "@/components/ui/movie-loader.json";

export default function Loading() {
  console.log("Dados da Animação:", animationData);
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <Player
        autoplay
        loop
        animationData={animationData}
        style={{ height: 200, width: 200 }}
      />
    </div>
  );
}

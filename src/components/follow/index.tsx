"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function FollowUser({ isFollowing }: { isFollowing: boolean }) {
  const [optimisticIsFollowing, setOptimisticIsFollowing] =
    useState(isFollowing);

  const toggleFollow = async () => {
    setOptimisticIsFollowing(!optimisticIsFollowing);
  };

  return (
    <Button
      className={cn(
        "w-full",
        optimisticIsFollowing
          ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          : "bg-blue-600 text-white hover:bg-blue-700"
      )}
      onClick={toggleFollow}
    >
      {optimisticIsFollowing ? "Seguir" : "Seguindo"}
    </Button>
  );
}

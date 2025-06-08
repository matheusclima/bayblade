"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import api from "@/api/api";
import { toast } from "sonner";

export default function FollowUser({
  isFollowing,
  profileId,
}: {
  isFollowing: boolean;
  profileId: string;
}) {
  const [optimisticIsFollowing, setOptimisticIsFollowing] =
    useState(isFollowing);

  const { mutate: followUser, isPending: isPendingFollow } = useMutation({
    mutationFn: async () => {
      await api.post(`/users/${profileId}/follow`);
    },
    onMutate: () => {
      setOptimisticIsFollowing(true);
    },
    onSuccess: () => {
      toast.success("Usuário seguido com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao seguir usuário. Tente novamente mais tarde.");
      console.error("Erro ao seguir usuário:", error);
      setOptimisticIsFollowing(false);
    },
  });

  const { mutate: unfollowUser, isPending: isPendingUnfollow } = useMutation({
    mutationFn: async () => {
      await api.delete(`/users/${profileId}/unfollow`);
    },
    onMutate: () => {
      setOptimisticIsFollowing(false);
    },
    onError: (error) => {
      console.error("Erro ao seguir usuário:", error);
      setOptimisticIsFollowing(true);
    },
  });

  if (optimisticIsFollowing)
    return (
      <Button
        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
        onClick={() => unfollowUser()}
        disabled={isPendingUnfollow}
      >
        Seguindo
      </Button>
    );

  return (
    <Button
      className="w-full"
      onClick={() => followUser()}
      disabled={isPendingFollow}
    >
      Seguir
    </Button>
  );
}

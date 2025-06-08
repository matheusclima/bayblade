"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Trash } from "lucide-react";
import { toast } from "sonner";

import { PostType } from "@/types/post";
import api from "@/api/api";
import { howManyDaysAgo } from "@/lib/utils";

import { UserAvatar } from "@/components/ui/user-avatar";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Comments from "../comments";
import Link from "next/link";

// Componente animável para o coração
const MotionHeart = motion.create(Heart);

export default function Post({ content }: { content: PostType }) {
  // --- HOOKS E ESTADOS ---
  const router = useRouter();
  const pathname = usePathname();

  // Lógica para DELETAR o post
  const [isDeleting, setIsDeleting] = useState(false);
  const isProfilePage = pathname?.includes("/perfil");

  // Lógica para o LIKE OTIMISTA
  const [optimisticIsLiked, setOptimisticIsLiked] = useState(content.isLiked);
  const [optimisticLikesCount, setOptimisticLikesCount] = useState(
    content.likesCount
  );

  // --- FUNÇÕES E MUTAÇÕES ---
  const { mutate: toggleLike } = useMutation({
    mutationFn: (postId: number) => api.post(`/posts/${postId}/like`),
    onMutate: () => {
      setOptimisticIsLiked((prev) => !prev);
      setOptimisticLikesCount((prev) =>
        optimisticIsLiked ? prev - 1 : prev + 1
      );
    },
    onError: () => {
      // Reverte a UI em caso de erro na API
      setOptimisticIsLiked(content.isLiked);
      setOptimisticLikesCount(content.likesCount);
      toast.error("Não foi possível processar a curtida.");
    },
  });

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await api.delete(`/posts/${content.id}`);
      toast.success("Post deletado com sucesso!");
      router.refresh();
    } catch (error) {
      console.error("Erro ao deletar o post", error);
      toast.error("Falha ao deletar o post.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div key={content.id} className="p-4 bg-card border rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        {/* Informações do usuário */}
        <div className="flex items-center gap-3">
          <UserAvatar
            user={{
              name: `${content.user.nome} ${content.user.sobrenome}`,
              image: content.user.avatar ?? "/image/profile-placeholder.jpeg",
            }}
            className="w-10 h-10"
          />
          <div>
            <Link
              href={`/perfil/${content.user.id}`}
              className="font-medium hover:underline"
            >{`${content.user.nome} ${content.user.sobrenome}`}</Link>
            <p className="text-xs text-muted-foreground">
              Há {howManyDaysAgo(new Date(content.createdAt))} dia(s)
            </p>
          </div>
        </div>

        {/* Botão de deletar condicional */}
        {isProfilePage && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="p-1 text-muted-foreground hover:text-red-600 cursor-pointer transition-colors"
                title="Deletar post"
              >
                <Trash className="w-5 h-5" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja deletar este post? Esta ação não pode
                  ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isDeleting ? "Deletando..." : "Deletar"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <div className="mb-2 whitespace-pre-wrap">{content.content}</div>

      {/* Imagem do post */}
      {content.imageUrl && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <Image
            src={content.imageUrl}
            alt="Cena do filme"
            className="object-cover w-full h-auto"
            width={600}
            height={400}
          />
        </div>
      )}

      {/* Barra de ações */}
      <div className="flex gap-4 mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleLike(content.id)}
          className="flex items-center"
        >
          <MotionHeart
            animate={optimisticIsLiked ? "liked" : "unliked"}
            variants={{
              unliked: {
                fill: "rgba(239, 68, 68, 0)",
                stroke: "rgb(239 68 68)",
                scale: 1,
              },
              liked: {
                fill: "rgb(239 68 68)",
                stroke: "rgb(239 68 68)",
                scale: 1.2,
              },
            }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
            className="w-4 h-4 mr-2"
          />
          {optimisticLikesCount} curtidas
        </Button>
        <Comments postId={content.id} />
      </div>
    </div>
  );
}

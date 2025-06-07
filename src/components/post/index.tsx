"use client";

import { UserAvatar } from "@/components/ui/user-avatar";
import { howManyDaysAgo } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PostType } from "@/types/post";
import { Trash } from "lucide-react";
import api from "@/api/api";
import { toast } from "sonner";
import { useState } from "react";
import { usePathname } from "next/navigation";
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

export default function Post({ content }: { content: PostType }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const pathname = usePathname();

  // Verifica se está na página de perfil
  const isProfilePage = pathname?.includes("/perfil");

  async function handleDelete() {
    setIsDeleting(true);

    try {
      const response = await api.delete(`/posts/${content.id}`);
      if (response.status !== 204) {
        toast.error("Erro ao deletar o post");
        return;
      }
      toast.success("Post deletado com sucesso!");

      // Atualize a UI — substitua por mutate(), router.refresh() ou outro método
      window.location.reload(); // Solução simples
    } catch (error) {
      console.error("Erro ao deletar o post", error);
      toast.error("Erro ao deletar o post");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div key={content.id} className="p-4 bg-card border rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <UserAvatar
            user={{
              name: `${content.user.nome} ${content.user.sobrenome}`,
              image: `/placeholder.svg?height=40&width=40`,
            }}
            className="w-10 h-10"
          />
          <div>
            <p className="font-medium">{`${content.user.nome} ${content.user.sobrenome}`}</p>
            <p className="text-xs text-muted-foreground">
              Há {howManyDaysAgo(new Date(content.createdAt)) - 1} dia(s)
            </p>
          </div>
        </div>

        {/* Alert Dialog para confirmação de delete */}
        {isProfilePage && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="text-red-500 hover:text-red-700 cursor-pointer transition-colors"
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

      <div className="mb-2">{content.content}</div>
      <div className="mb-4 overflow-hidden rounded-lg">
        {content.imageUrl && (
          <Image
            src={content.imageUrl}
            alt="Cena do filme"
            className="object-cover w-full h-64"
            width={600}
            height={300}
          />
        )}
      </div>
      <div className="flex gap-4 mb-4">
        <Button variant="ghost" size="sm">
          ❤️ {content.likesCount} curtidas
        </Button>
        <Button variant="ghost" size="sm">
          💬 {content.commentsCount} comentários
        </Button>
      </div>
      <div className="pt-4 mt-4 border-t">
        <div className="mb-4 space-y-4">
          <div className="flex gap-2">
            <UserAvatar
              user={{
                name: "Comentarista",
                image: "/placeholder.svg?height=32&width=32",
              }}
              className="w-8 h-8"
            />
            <div className="flex-1 p-2 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground font-medium">
                Ana Souza
              </p>
              <p className="text-sm text-muted-foreground">
                Concordo totalmente! A trilha sonora do Hans Zimmer é
                simplesmente perfeita.
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <UserAvatar
            user={{
              name: "Você",
              image: "/placeholder.svg?height=32&width=32",
            }}
            className="w-8 h-8"
          />
          <Input placeholder="Escreva um comentário..." className="flex-1" />
        </div>
      </div>
    </div>
  );
}

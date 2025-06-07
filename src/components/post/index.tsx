"use client";

import { UserAvatar } from "@/components/ui/user-avatar";
import { howManyDaysAgo } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PostType } from "@/types/post";

export default function Post({ content }: { content: PostType }) {
  return (
    <div key={content.id} className="p-4 bg-card border rounded-lg shadow">
      <div className="flex items-center gap-3 mb-4">
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

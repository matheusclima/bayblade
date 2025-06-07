"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { DialogProps } from "@radix-ui/react-dialog";
import TextEditor from "./ui/text-editor";
import { useState, useRef } from "react";
import { Rating } from "./ui/rating";
import api from "@/api/api";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function CreateReview({ ...props }: DialogProps) {
  const [title, setTitle] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const { id: movieId } = useParams<{ id: string }>();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!movieId) return;

    const formData = new FormData(e.currentTarget);
    formData.append("descricao", review);
    formData.append("avaliacao", rating.toString());
    formData.append("curtidas", "0"); // valor inicial, ajuste se necessário
    formData.append("user_id", "08489799-104a-4818-9eec-0fdd262e77c4"); // substitua pelo valor real
    formData.append("filme_id", movieId);

    try {
      const response = await api.post("/reviews", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 201) {
        throw new Error("Erro ao enviar post");
      }

      toast.success("Avaliação publicada com sucesso!");

      // Fechar o diálogo programaticamente clicando no botão de fechar
      if (closeButtonRef.current) {
        closeButtonRef.current.click();
      }

      setTitle("");
      setRating(0);
      setReview("");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao publicar avaliação");
    }
  };

  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button>Escrever avaliação</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova avaliação</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Título da avaliação</Label>
              <Input
                id="title"
                name="titulo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content">Descreva sua opinião</Label>
              <TextEditor
                name="descricao"
                onChange={(value) => setReview(value)}
              />
            </div>
          </div>

          <div className="grid gap-2 place-self-center">
            <Label htmlFor="rating">Qual sua nota para o filme?</Label>
            <Rating
              value={rating}
              onChange={(value) => setRating(value)}
              size="lg"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button ref={closeButtonRef} type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-rose-500 hover:bg-rose-600 cursor-pointer"
            >
              Publicar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import React, { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, Loader2Icon, X } from "lucide-react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import api from "@/api/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const MAX_CHARS = 500;

export function CreatePost() {
  const [content, setContent] = useState("");
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Atualiza o texto e respeita o limite de caracteres
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    if (text.length <= MAX_CHARS) {
      setContent(text);
    }
  };

  // Gera a pré-visualização da imagem selecionada
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Aciona o clique no input de arquivo escondido
  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Remove a imagem da pré-visualização
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (content.trim() === "" && !fileInputRef.current?.files?.[0]) {
        throw new Error("Content or image must be provided");
      }

      const formData = new FormData();
      formData.append("content", content); // isso é string, não há problema
      if (fileInputRef.current?.files?.[0]) {
        console.log("Uploading file:", fileInputRef.current.files[0]);
        formData.append("image", fileInputRef.current.files[0]);
      }

      await api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      setContent("");
      setImagePreview(null);
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao criar o post");
    },
  });

  const remainingChars = MAX_CHARS - content.length;
  const isPostDisabled = content.trim().length === 0 && !imagePreview;

  return (
    <form
      onSubmit={createPost}
      className="bg-backround text-white p-4 font-sans border border-gray-800 rounded-xl"
    >
      <div className="flex space-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          {/* Seção da Pré-visualização da Imagem */}
          {imagePreview && (
            <div className="relative mb-3">
              <Image
                src={imagePreview}
                alt="Image Preview"
                className="rounded-2xl max-h-80 w-full object-cover border border-gray-700"
                width={500}
                height={300}
              />
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2 bg-black bg-opacity-75 hover:bg-opacity-100 rounded-full h-8 w-8"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Área de Texto com Limite */}
          <Textarea
            value={content}
            onChange={handleTextChange}
            name="content"
            placeholder="O que você está pensando?"
            className="bg-transparent text-xl border-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none p-0 placeholder:text-gray-500"
            rows={2}
          />

          <div className="border-t border-gray-800 mt-4 pt-4 flex justify-between items-center">
            {/* Ícone para Upload de Imagem */}
            <div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={triggerFileSelect}
                className="text-blue-500 hover:bg-blue-500/10 hover:text-blue-500"
              >
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Input
                type="file"
                ref={fileInputRef}
                name="image"
                onChange={handleImageUpload}
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
              />
            </div>

            {/* Contador de Caracteres e Botão de Postar */}
            <div className="flex items-center space-x-4">
              <span
                className={`text-sm font-medium ${
                  remainingChars <= 20 ? "text-red-500" : "text-gray-500"
                }`}
              >
                {remainingChars}
              </span>
              <Button type="submit" disabled={isPostDisabled || isPending}>
                {isPending ? (
                  <Loader2Icon className="animate-spin h-4 w-4" />
                ) : (
                  "Postar"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

"use client";

import { Session } from "@/types/user";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Edit, Pencil } from "lucide-react"; // Importar o ícone de lápis
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Image from "next/image"; // Importar o componente Image
import { useMutation } from "@tanstack/react-query";
import api from "@/api/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Loading from "@/app/loading";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const profileFormSchema = z.object({
  nome: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." })
    .max(50, { message: "O nome não pode ter mais de 50 caracteres." }),
  sobrenome: z
    .string()
    .min(2, { message: "O sobrenome deve ter pelo menos 2 caracteres." })
    .max(50, { message: "O sobrenome não pode ter mais de 50 caracteres." }),
  username: z
    .string()
    .min(3, { message: "O nome de usuário deve ter pelo menos 3 caracteres." })
    .regex(/^[a-z0-9_.]+$/, {
      message: "Use apenas letras minúsculas, números, '_' ou '.'.",
    }),
  bio: z
    .string()
    .max(160, { message: "A bio não pode ter mais de 160 caracteres." })
    .optional(),
  location: z
    .string()
    .max(50, { message: "A localização não pode ter mais de 50 caracteres." })
    .optional(),
  avatar: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "A imagem de perfil é obrigatória.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `O tamanho máximo é 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Apenas os formatos .jpg, .jpeg, .png e .webp são aceitos."
    )
    .optional(),
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

interface EditProfileProps {
  userData: Session["user"];
}

export default function EditProfile({ userData }: EditProfileProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  // 3. Adicionar estado para o preview da imagem
  const [preview, setPreview] = useState<string | undefined>(userData.avatar);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      nome: userData.nome,
      sobrenome: userData.sobrenome,
      username: userData.usuario,
      bio: userData.bio || "",
      location: userData.cidade || "",
    },
  });

  // Observar o campo do avatar para atualizar o preview
  const avatarFile = form.watch("avatar");
  useEffect(() => {
    if (avatarFile && avatarFile.length > 0) {
      const file = avatarFile[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [avatarFile]);

  const { mutate: editProfileMutation, isPending } = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      const formData = new FormData();

      // Adicionar todos os campos de texto ao FormData
      formData.append("nome", data.nome);
      formData.append("sobrenome", data.sobrenome);
      formData.append("usuario", data.username);
      formData.append("bio", data.bio || "");
      formData.append("cidade", data.location || "");

      // Adicionar o arquivo da imagem, se um novo foi selecionado
      if (data.avatar && data.avatar.length > 0) {
        console.log(
          "Adicionando arquivo de avatar ao FormData...",
          data.avatar[0]
        );
        formData.append("avatar", data.avatar[0]);
      }

      await api.put(`/users/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      toast.success("Perfil atualizado com sucesso!");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao atualizar seu perfil");
    },
  });

  async function onSubmit(data: ProfileFormData) {
    console.log("Enviando dados como FormData...");
    editProfileMutation(data);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-border hover:border-primary"
        >
          <Edit className="h-4 w-4 mr-2" />
          Editar Perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Atualize suas informações. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* 5. Adicionar o campo de upload de imagem */}
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto de Perfil</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <label
                        htmlFor="avatar-upload"
                        className="relative group cursor-pointer"
                      >
                        <Image
                          src={preview || "/image/profile-placeholder.jpeg"}
                          alt="Preview do avatar"
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-full object-cover transition-opacity duration-300 group-hover:opacity-70"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Pencil className="h-6 w-6 text-white" />
                        </div>
                      </label>
                      <Input
                        id="avatar-upload"
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        className="hidden"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campos de texto existentes */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sobrenome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome de usuário</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loading /> : "Salvar alterações"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

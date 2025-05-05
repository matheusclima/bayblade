"use client";

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// 1. Schema de validação com Zod
const signUpSchema = z
  .object({
    firstName: z.string().min(1, "Nome é obrigatório"),
    lastName: z.string().min(1, "Sobrenome é obrigatório"),
    username: z.string().min(3, "Usuário precisa ter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
    terms: z.literal(true, {
      errorMap: () => ({ message: "Você deve aceitar os termos" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type SignUpData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpData>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpData) => {
    try {
      const response = await fetch("http://localhost:6500/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: data.firstName,
          sobrenome: data.lastName,
          usuario: data.username,
          email: data.email,
          senha: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Erro ao criar conta");
      }

      toast.success(result.message || "Conta criada com sucesso!", {
        duration: 2000,
        onAutoClose: () => {
          router.push("/auth/signin");
        },
      });
    } catch (error: any) {
      toast.error(error.message || "Erro desconhecido ao criar conta.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div className="flex items-center justify-center flex-1 p-6 bg-background border py-10 px-4 md:p-10">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-rose-600">NextFilm</h1>
            <p className="text-gray-500">
              Crie sua conta e comece a compartilhar
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input id="firstName" {...register("firstName")} />
                {errors.firstName && (
                  <p className="text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input id="lastName" {...register("lastName")} />
                {errors.lastName && (
                  <p className="text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Nome de usuário</Label>
              <Input id="username" {...register("username")} />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Controller
              control={control}
              name="terms"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    Eu concordo com os{" "}
                    <Link
                      href="/termos"
                      className="text-rose-600 hover:underline"
                    >
                      Termos de Serviço
                    </Link>{" "}
                    e{" "}
                    <Link
                      href="/privacidade"
                      className="text-rose-600 hover:underline"
                    >
                      Política de Privacidade
                    </Link>
                  </Label>
                </div>
              )}
            />
            {errors.terms && (
              <p className="text-sm text-red-500">{errors.terms.message}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700"
            >
              Criar conta
            </Button>
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Já tem uma conta?{" "}
                <Link
                  href="/auth/signin"
                  className="text-rose-600 hover:underline"
                >
                  Entrar
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="relative hidden flex-1 md:block">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/80 to-rose-700/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-white">
          <h2 className="mb-6 text-3xl font-bold text-center">
            Junte-se à comunidade de cinéfilos
          </h2>
          <ul className="space-y-4 text-center">
            <li className="flex items-center gap-2 text-lg">
              <span className="text-2xl">🎥</span> Crie seu perfil personalizado
            </li>
            <li className="flex items-center gap-2 text-lg">
              <span className="text-2xl">🌟</span> Avalie e resenhe seus filmes
              favoritos
            </li>
            <li className="flex items-center gap-2 text-lg">
              <span className="text-2xl">🔍</span> Descubra recomendações
              personalizadas
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

"use client";

import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { redirect } from "next/navigation";
import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { Session } from "@/types/user";

export default function Menu() {
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const response = await api.get<Session>("/auth/session");
      return response.data;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const handleLogout = async () => {
    await api.post("/auth/signout");
    redirect("/auth/signin");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <User className="w-5 h-5 text-foreground hover:text-foreground/80 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {session ? (
          <>
            <DropdownMenuItem>
              <Link href={`/perfil/${session.user.id}`} className="w-full">
                Meu Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <Link href="/auth/signin" className="w-full">
                Entrar
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

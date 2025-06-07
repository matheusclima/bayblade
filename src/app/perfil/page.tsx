import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAvatar } from "@/components/user-avatar";
import { Film, MessageSquare, Edit } from "lucide-react";
import NavBar from "@/components/navBar";
import Image from "next/image";
import { PaginatedPosts } from "@/types/post";
import api from "@/api/api";
import PostsError from "@/components/post/error";
import EmptyPosts from "@/components/post/empty";
import Post from "@/components/post";

export default async function PerfilPage() {
  const { data } = await api.get<PaginatedPosts>("/posts");
  console.log("data", data);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="container px-4 py-6 mx-auto">
        <div className="relative mb-8">
          <div className="h-48 overflow-hidden rounded-lg md:h-64">
            <Image
              width={1200}
              height={100}
              src="/placeholder.svg?height=400&width=1200"
              alt="Capa do perfil"
              className="object-cover w-full"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center transform translate-y-1/2 md:items-end md:flex-row md:px-8">
            <div className="flex-shrink-0 -mt-16 md:mt-0 md:mr-6">
              <UserAvatar
                user={{
                  name: "João Silva",
                  image: "/placeholder.svg?height=128&width=128",
                }}
                className="w-32 h-32 border-4 border-white"
              />
            </div>
            <div className="flex flex-col items-center mt-4 text-center md:items-start md:mt-0 md:text-left md:flex-1">
              <h1 className="text-2xl font-bold">João Silva</h1>
              <p className="text-muted-foreground">@joaosilva</p>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="p-4 bg-background rounded-lg shadow">
                <h2 className="mb-4 text-lg font-semibold">Sobre</h2>
                <p className="mb-4 text-sm text-gray-600">
                  Apaixonado por cinema desde criança. Fã de ficção científica,
                  thrillers psicológicos e clássicos do cinema.
                </p>
                <div className="py-2 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <Film className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>87</strong> filmes avaliados
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>156</strong> comentários
                    </span>
                  </div>
                </div>
                <Button
                  className="flex items-center w-full gap-2 mt-4"
                  variant="outline"
                >
                  <Edit className="w-4 h-4" /> Editar perfil
                </Button>
              </div>
            </div>

            <div className="md:col-span-3">
              <Tabs defaultValue="posts" className="w-full">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="posts" className="flex-1">
                    Postagens
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="posts" className="space-y-6">
                  {!data ? (
                    <PostsError message="Não foi possível carregar os posts" />
                  ) : data.posts.length === 0 ? (
                    <EmptyPosts />
                  ) : (
                    data.posts.map((post) => (
                      <Post content={post} key={post.id} />
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

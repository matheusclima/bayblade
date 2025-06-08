export const dynamic = "force-dynamic";
import { Building2, Film } from "lucide-react";
import Image from "next/image";
import api from "@/api/api";
import { Profile, Session } from "@/types/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NavBar from "@/components/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostsError from "@/components/post/error";
import EmptyPosts from "@/components/post/empty";
import Post from "@/components/post";
import { PaginatedPosts } from "@/types/post";
import EditProfile from "@/components/user/edit-profile";
import FollowUser from "@/components/follow";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("nextfilm_access_token")?.value;
  const { data: session } = await api.get<Session | undefined>(
    "/auth/session",
    {
      headers: {
        Cookie: `nextfilm_access_token=${accessToken}`,
      },
    }
  );

  if (!session) redirect("/auth/signin");

  const { data } = await api.get<PaginatedPosts>(`/posts/users/${id}`, {
    headers: {
      Cookie: `nextfilm_access_token=${accessToken}`,
    },
  });

  const { data: profile } = await api.get<Profile>(`/users/${id}`, {
    headers: {
      Cookie: `nextfilm_access_token=${accessToken}`,
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="container px-4 py-6 mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Coluna lateral */}
          <div className="md:col-span-1 space-y-2">
            {/* Avatar + nome lado a lado */}
            <div className="flex items-center gap-4">
              <Image
                src={profile.avatar ?? "/image/profile-placeholder.jpeg"}
                alt={profile.nome}
                width={128}
                height={128}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-background object-cover"
              />
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">{`${profile.nome} ${profile.sobrenome}`}</h1>
                <p className="text-muted-foreground">@{profile.usuario}</p>
              </div>
            </div>

            {/* Sobre */}
            <div className="p-4 bg-background rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold">Sobre</h2>
              <p className="mb-4 text-sm text-gray-600">
                {profile.bio || "Sem bio"}
              </p>
              <div className="py-2 border-t">
                <div className="flex items-center gap-2 mb-2">
                  <Film className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    <strong>87</strong> filmes avaliados
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    <strong>{profile.cidade ?? "Hakuna Matata"}</strong>
                  </span>
                </div>
              </div>
              <div className="flex mt-4 sm:mt-0">
                {session.user.id === id ? (
                  <EditProfile userData={profile} />
                ) : (
                  <FollowUser isFollowing={profile.isFollowing ?? false} profileId={profile.id} />
                )}
              </div>
            </div>
          </div>

          {/* Coluna das postagens */}
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
      </main>
    </div>
  );
}

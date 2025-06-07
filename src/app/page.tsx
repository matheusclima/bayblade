import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MovieCard } from "@/components/movie-card";
import { UserAvatar } from "@/components/user-avatar";
import { getTrendingMoviesByPage } from "@/api/filmes";
import api from "@/api/api";
import { PaginatedPosts } from "@/types/post";
import Post from "@/components/post";
import { Session } from "@/types/user";
import PostsError from "@/components/post/error";
import EmptyPosts from "@/components/post/empty";
import { CreatePost } from "@/components/post/create";
import { cookies } from "next/headers";
import NavBar from "@/components/navBar";

export default async function Home() {
  const trendingMovies = await getTrendingMoviesByPage(1);
  const { data } = await api.get<PaginatedPosts>("/posts");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("nextfilm_access_token")?.value;
  const { data: session } = await api.get<Session | undefined>("/auth/session", {
    headers: {
      Cookie: `nextfilm_access_token=${accessToken}`,
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container grid grid-cols-1 gap-6 px-4 py-6 mx-auto md:grid-cols-3 lg:grid-cols-4">
        <div className="hidden md:block">
          <div className="sticky top-20 space-y-4">
            {session ? (
              <div className="p-4 bg-card border rounded-lg shadow">
                <h2 className="mb-4 text-lg text-card-foreg font-semibold">
                  Seu Perfil
                </h2>
                <div className="flex items-center gap-3 mb-4">
                  <UserAvatar
                    user={{
                      name: `${session.user.nome} ${session.user.sobrenome}`,
                      image: "/placeholder.svg?height=48&width=48",
                    }}
                    className="w-12 h-12"
                  />
                  <div>
                    <p className="font-medium">{`${session.user.nome} ${session.user.sobrenome}`}</p>
                    <p className="text-sm text-muted-foreground">
                      @{session.user.usuario}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div>
                    <p className="font-medium">245</p>
                    <p className="text-xs text-muted-foreground">Seguidores</p>
                  </div>
                  <div>
                    <p className="font-medium">123</p>
                    <p className="text-xs text-muted-foreground">Seguindo</p>
                  </div>
                </div>
                <Link href="/perfil">
                  <Button className="w-full mt-4 bg-rose-600 hover:bg-rose-700 cursor-pointer">
                    Ver perfil
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="p-4 bg-card border rounded-lg shadow text-center">
                <h2 className="mb-2 text-lg font-semibold text-card-foreg">
                  Faça login para uma melhor experiência
                </h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  Acesse sua conta para visualizar seu perfil e interagir com a
                  comunidade.
                </p>
                <Link href="/auth/signin">
                  <Button className="w-full bg-rose-600 hover:bg-rose-700 cursor-pointer">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-1 space-y-6 md:col-span-2">
          <CreatePost />
          <div className="space-y-6">
            {!data ? (
              <PostsError message="Não foi possível carregar os posts" />
            ) : data.posts.length === 0 ? (
              <EmptyPosts />
            ) : (
              data.posts.map((post) => <Post content={post} key={post.id} />)
            )}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-20 space-y-4">
            <div className="p-4 bg-card border rounded-lg shadow">
              <h2 className="mb-4 text-lg text-card-foreground font-semibold">
                Filmes populares
              </h2>
              <div className="space-y-4">
                {trendingMovies.results.slice(0, 3).map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={{
                      id: movie.id,
                      title: movie.title,
                      image: movie.poster_path,
                      year: movie.release_date,
                      rating: movie.vote_average,
                    }}
                    compact
                  />
                ))}
              </div>
              <Button asChild className="w-full mt-4" variant="outline">
                <Link href="/explorar">Ver mais filmes</Link>
              </Button>
            </div>

            <div className="p-4 bg-card border rounded-lg shadow">
              <h2 className="mb-4 text-lg text-card-foreground font-semibold">
                Categorias
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Ação",
                  "Drama",
                  "Comédia",
                  "Ficção",
                  "Terror",
                  "Romance",
                  "Animação",
                ].map((cat) => (
                  <Button
                    key={cat}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search, Filter, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Genre, Movie } from "@/types/movie";
import { getMovieGenres, getTrendingMoviesByPage } from "@/api/filmes";
import { tmdbImageUrl } from "@/constants";
import MovieList from "@/components/movie-list";
import NavBar from "@/components/navBar";
import { UserAvatar } from "@/components/user-avatar";

export default function ExplorePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      const data = await getTrendingMoviesByPage(1);
      setMovies(data.results);
    };
    const getGenres = async () => {
      const data = await getMovieGenres();
      setGenres(data.genres);
    };
    getGenres();
    getMovies();
  }, []);

  console.log("genres", genres);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <Link href="/" className="text-xl font-bold text-rose-600">
            NextFilm
          </Link>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">Início</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/explorar">Explorar</Link>
            </Button>
            <UserAvatar
              user={{
                name: "Usuário",
                image: "/placeholder.svg?height=32&width=32",
              }}
              className="w-8 h-8"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Search bar */}
        <div className="mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              type="search"
              placeholder="Buscar filmes..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filter by genre */}
        {query ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Resultados da busca</h2>
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 rounded-lg aspect-[2/3]"></div>
                    <div className="mt-2 bg-gray-200 h-4 rounded w-3/4"></div>
                    <div className="mt-1 bg-gray-200 h-3 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : movies.length > 0 ? (
              <MovieList data={movies} />
            ) : (
              <div className="text-center py-10">
                <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium">Nenhum filme encontrado</h3>
                <p className="text-gray-500 mt-2">
                  Tente uma busca diferente ou outro gênero
                </p>
              </div>
            )}
          </div>
        ) : (
          <Tabs defaultValue="popular" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="popular">Populares</TabsTrigger>
              <TabsTrigger value="recent">Recentes</TabsTrigger>
            </TabsList>

            <TabsContent value="popular">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {isLoading
                  ? [...Array(6)].map((_, index) => (
                      <div key={index} className="animate-pulse">
                        <div className="bg-gray-200 rounded-lg aspect-[2/3]"></div>
                        <div className="mt-2 bg-gray-200 h-4 rounded w-3/4"></div>
                        <div className="mt-1 bg-gray-200 h-3 rounded w-1/2"></div>
                      </div>
                    ))
                  : movies.map((movie) => (
                      <Link
                        key={movie.id}
                        href={`/filmes/${movie.id}`}
                        className="group"
                      >
                        <div className="rounded-lg overflow-hidden relative">
                          <Image
                            src={`${tmdbImageUrl}${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
                            width={200}
                            height={300}
                          />
                          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            {movie.vote_average}
                          </div>
                        </div>
                        <div className="mt-2">
                          <h3 className="font-medium line-clamp-1 group-hover:text-purple-600">
                            {movie.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(movie.release_date).getFullYear()}
                          </p>
                        </div>
                      </Link>
                    ))}
              </div>
            </TabsContent>

            <TabsContent value="recent">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {isLoading
                  ? [...Array(6)].map((_, index) => (
                      <div key={index} className="animate-pulse">
                        <div className="bg-gray-200 rounded-lg aspect-[2/3]"></div>
                        <div className="mt-2 bg-gray-200 h-4 rounded w-3/4"></div>
                        <div className="mt-1 bg-gray-200 h-3 rounded w-1/2"></div>
                      </div>
                    ))
                  : movies.map((movie) => (
                      <Link
                        key={movie.id}
                        href={`/movies/${movie.id}`}
                        className="group"
                      >
                        <div className="rounded-lg overflow-hidden relative">
                          <Image
                            src={movie.poster_path || "/placeholder.svg"}
                            alt={movie.title}
                            className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
                            width={200}
                            height={300}
                          />
                          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            {movie.vote_average}
                          </div>
                        </div>
                        <div className="mt-2">
                          <h3 className="font-medium line-clamp-1 group-hover:text-purple-600">
                            {movie.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {movie.release_date}
                          </p>
                        </div>
                      </Link>
                    ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t py-2">
        <div className="flex justify-around">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/feed">
              <ArrowLeft className="h-6 w-6" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/explore">
              <Search className="h-6 w-6 text-purple-600" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/create-post">
              <Filter className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MovieCard } from "@/components/movie-card"
import { UserAvatar } from "@/components/user-avatar"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <Link href="/" className="text-xl font-bold text-rose-600">
            NextFilm
          </Link>
          <div className="relative w-full max-w-md mx-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar filmes ou pessoas..." className="pl-8" />
          </div>
          <div className="flex items-center gap-4">
          <Button className="bg-rose-600 hover:bg-rose-700 cursor-pointer">Postar</Button>
            {/* <Button asChild variant="ghost" size="sm">
              <Link href="/explorar">Explorar</Link>
            </Button> */}
            {/* <Button asChild variant="ghost" size="sm">
              <Link href="/notificacoes">Notificações</Link>
            </Button> */}
            <UserAvatar user={{ name: "Tralarero Tralala", image: "/placeholder.svg?height=32&width=32" }} className="w-8 h-8" />
          </div>
        </div>
      </header>

      <main className="container grid grid-cols-1 gap-6 px-4 py-6 mx-auto md:grid-cols-3 lg:grid-cols-4">
        <div className="hidden md:block">
          <div className="sticky top-20 space-y-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold">Seu Perfil</h2>
              <div className="flex items-center gap-3 mb-4">
                <UserAvatar
                  user={{ name: "Tralarero", image: "/placeholder.svg?height=48&width=48" }}
                  className="w-12 h-12"
                />
                <div>
                  <p className="font-medium">Tralarero Tralala</p>
                  <p className="text-sm text-muted-foreground">@tralalero</p>
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
              <Button asChild className="w-full mt-4 bg-rose-600 hover:bg-rose-700 cursor-pointer
" >
                <Link href="/perfil">Ver perfil</Link>
              </Button>
            </div>

            {/* <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold">Sugestões para seguir</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserAvatar
                        user={{ name: `Usuário ${i}`, image: `/placeholder.svg?height=32&width=32` }}
                        className="w-8 h-8"
                      />
                      <div>
                        <p className="text-sm font-medium">Maria Oliveira</p>
                        <p className="text-xs text-muted-foreground">@mariaoliveira</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Seguir
                    </Button>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>

        <div className="col-span-1 space-y-6 md:col-span-2">
          {/* <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center gap-3 mb-4">
              <UserAvatar
                user={{ name: "Usuário", image: "/placeholder.svg?height=40&width=40" }}
                className="w-10 h-10"
              />
              <Input placeholder="Compartilhe sua opinião sobre um filme..." />
              <Button className="bg-rose-600 hover:bg-rose-700 cursor-pointer
">Postar</Button>
            </div>
          </div> */}

          <div className="space-y-6">
            {[1, 2].map((post) => (
              <div key={post} className="p-4 bg-white rounded-lg shadow">
                <div className="flex items-center gap-3 mb-4">
                  <UserAvatar
                    user={{ name: `Usuário ${post}`, image: `/placeholder.svg?height=40&width=40` }}
                    className="w-10 h-10"
                  />
                  <div>
                    <p className="font-medium">Carlos Mendes</p>
                    <p className="text-xs text-muted-foreground">Há 2 horas</p>
                  </div>
                </div>
                <p className="mb-4">
                  Acabei de assistir "Interestelar" pela terceira vez e continuo impressionado com a profundidade da
                  história e os efeitos visuais. Christopher Nolan é um gênio! O que vocês acharam?
                </p>
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img
                    src="/placeholder.svg?height=300&width=600"
                    alt="Cena do filme"
                    className="object-cover w-full h-64"
                  />
                </div>
                <div className="flex gap-4 mb-4">
                  <Button variant="ghost" size="sm">
                    ❤️ 42 curtidas
                  </Button>
                  <Button variant="ghost" size="sm">
                    💬 18 comentários
                  </Button>
                  <Button variant="ghost" size="sm">
                    🔄 Compartilhar
                  </Button>
                </div>
                <div className="pt-4 mt-4 border-t">
                  <div className="mb-4 space-y-4">
                    <div className="flex gap-2">
                      <UserAvatar
                        user={{ name: "Comentarista", image: "/placeholder.svg?height=32&width=32" }}
                        className="w-8 h-8"
                      />
                      <div className="flex-1 p-2 bg-gray-100 rounded-lg">
                        <p className="text-sm font-medium">Ana Souza</p>
                        <p className="text-sm">
                          Concordo totalmente! A trilha sonora do Hans Zimmer é simplesmente perfeita.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <UserAvatar
                      user={{ name: "Você", image: "/placeholder.svg?height=32&width=32" }}
                      className="w-8 h-8"
                    />
                    <Input placeholder="Escreva um comentário..." className="flex-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-20 space-y-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold">Filmes populares</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <MovieCard
                    key={i}
                    movie={{
                      title: "Duna: Parte 2",
                      image: "/placeholder.svg?height=120&width=80",
                      year: "2024",
                      rating: "4.8",
                    }}
                    compact
                  />
                ))}
              </div>
              <Button asChild className="w-full mt-4" variant="outline">
                <Link href="/filmes">Ver mais filmes</Link>
              </Button>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold">Categorias</h2>
              <div className="flex flex-wrap gap-2">
                {["Ação", "Drama", "Comédia", "Ficção", "Terror", "Romance", "Animação"].map((cat) => (
                  <Button key={cat} variant="outline" size="sm" className="text-xs">
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


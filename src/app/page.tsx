import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MovieCard } from '@/components/movie-card';
import { UserAvatar } from '@/components/user-avatar';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { getTrendingMoviesByPage } from '@/api/filmes';

export default async function Home() {
	const trendingMovies = await getTrendingMoviesByPage(1);

	return (
		<div className="min-h-screen bg-background">
			<header className="sticky top-0 z-10 bg-background border-b">
				<div className="container flex items-center justify-between h-16 px-4 mx-auto">
					<Link href="/" className="text-xl font-bold text-rose-600">
						NextFilm
					</Link>
					<div className="relative w-full max-w-md mx-4">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input placeholder="Buscar filmes ou pessoas..." className="pl-8" />
					</div>
					<div className="flex items-center gap-4">
						<Link href="/perfil" className="cursor-pointer">
							<UserAvatar
								user={{
									name: 'Tralarero Tralala',
									image: '/placeholder.svg?height=32&width=32',
								}}
								className="w-8 h-8"
							/>
						</Link>
					</div>
				</div>
			</header>

			<main className="container grid grid-cols-1 gap-6 px-4 py-6 mx-auto md:grid-cols-3 lg:grid-cols-4">
				<div className="hidden md:block">
					<div className="sticky top-20 space-y-4">
						<div className="p-4 bg-card border rounded-lg shadow">
							<h2 className="mb-4 text-lg text-card-foreg font-semibold">
								Seu Perfil
							</h2>
							<div className="flex items-center gap-3 mb-4">
								<UserAvatar
									user={{
										name: 'Tralarero',
										image: '/placeholder.svg?height=48&width=48',
									}}
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
							<Button className="w-full mt-4 bg-rose-600 hover:bg-rose-700 cursor-pointer">
								<Link href="/perfil">Ver perfil</Link>
							</Button>
						</div>
					</div>
				</div>

				<div className="col-span-1 space-y-6 md:col-span-2">
					<div className="space-y-6">
						{[1, 2].map((post) => (
							<div key={post} className="p-4 bg-card border rounded-lg shadow">
								<div className="flex items-center gap-3 mb-4">
									<UserAvatar
										user={{
											name: `Usuário ${post}`,
											image: `/placeholder.svg?height=40&width=40`,
										}}
										className="w-10 h-10"
									/>
									<div>
										<p className="font-medium">Carlos Mendes</p>
										<p className="text-xs text-muted-foreground">Há 2 horas</p>
									</div>
								</div>
								<p className="mb-4">
									Acabei de assistir &quot;Interestelar&quot; pela terceira vez
									e continuo impressionado com a profundidade da história e os
									efeitos visuais. Christopher Nolan é um gênio! O que vocês
									acharam?
								</p>
								<div className="mb-4 overflow-hidden rounded-lg">
									<Image
										src="/placeholder.svg?height=300&width=600"
										alt="Cena do filme"
										className="object-cover w-full h-64"
										width={600}
										height={300}
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
												user={{
													name: 'Comentarista',
													image: '/placeholder.svg?height=32&width=32',
												}}
												className="w-8 h-8"
											/>
											<div className="flex-1 p-2 bg-muted rounded-lg">
												<p className="text-sm text-muted-foreground font-medium">
													Ana Souza
												</p>
												<p className="text-sm text-muted-foreground">
													Concordo totalmente! A trilha sonora do Hans Zimmer é
													simplesmente perfeita.
												</p>
											</div>
										</div>
									</div>
									<div className="flex gap-2">
										<UserAvatar
											user={{
												name: 'Você',
												image: '/placeholder.svg?height=32&width=32',
											}}
											className="w-8 h-8"
										/>
										<Input
											placeholder="Escreva um comentário..."
											className="flex-1"
										/>
									</div>
								</div>
							</div>
						))}
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
									'Ação',
									'Drama',
									'Comédia',
									'Ficção',
									'Terror',
									'Romance',
									'Animação',
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

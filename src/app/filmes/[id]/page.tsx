import { getMovieById, getMovieCredits, getMovieProviders } from '@/api/filmes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Bookmark, Heart, Share2, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as dotenv from 'dotenv';
import CreatePost from '@/components/create-post';
import MovieReviews from './review';
import { tmdbImageUrl } from '@/constants';
import { cookies } from 'next/headers';
dotenv.config();

interface MoviePageProps {
	params: {
		id: number;
	};
}

export default async function MoviePage({ params }: MoviePageProps) {
	const { id } = await params;
	const movieInfo = await getMovieById(id);
	const movieCredits = await getMovieCredits(id);
	const movieProviders = await getMovieProviders(id);
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('nextfilm_access_token')?.value;
	const director = movieCredits.crew.find(
		(member) => member.job === 'Director'
	);

	console.log(movieInfo)

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
								name: 'Usuário',
								image: '/placeholder.svg?height=32&width=32',
							}}
							className="w-8 h-8"
						/>
					</div>
				</div>
			</header>

			<main className="container px-4 py-6 mx-auto">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					<div className="md:col-span-1">
						<div className="sticky top-24">
							<div className="overflow-hidden bg-card rounded-lg shadow">
								<Image
									src={`${tmdbImageUrl}${movieInfo.poster_path}`}
									alt="Poster do filme"
									width={300}
									height={450}
									className="object-cover w-full"
								/>
								<div className="p-4">
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-1">
											<Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
											<span className="font-bold">4.8</span>
											<span className="text-sm text-muted-foreground">
												/5 (2.4k votos)
											</span>
										</div>
										<div className="text-sm text-muted-foreground">
											{new Date(movieInfo.release_date).getFullYear()}
										</div>
									</div>
									<div className="flex flex-wrap gap-2 mb-4">
										{movieInfo.genres.map((genre) => (
											<Button
												key={genre.id}
												variant="outline"
												size="sm"
												className="text-xs"
											>
												{genre.name}
											</Button>
										))}
									</div>
									<div className="grid grid-cols-2 gap-2">
										<Button className="bg-rose-600 hover:bg-rose-700">
											<Heart className="w-4 h-4 mr-2" /> Favorito
										</Button>
										<Button variant="outline">
											<Bookmark className="w-4 h-4 mr-2" /> Salvar
										</Button>
										<Button variant="outline" className="col-span-2">
											<Share2 className="w-4 h-4 mr-2" /> Compartilhar
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="md:col-span-2">
						<div className="mb-6">
							<h1 className="mb-2 text-3xl font-bold">{movieInfo.title}</h1>
							<p className="mb-4 text-gray-600">
								Dirigido por {director?.name} • {movieInfo.runtime} minutos
							</p>
							<p className="mb-6 text-foreground">{movieInfo.overview}</p>
							<div className="p-4 mb-6 bg-card rounded-lg">
								<h3 className="mb-2 text-lg font-semibold text-card-foreground">
									Elenco
								</h3>
								<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
									{movieCredits.cast.slice(0, 6).map((actor) => (
										<div key={actor.id} className="flex items-center gap-2">
											<Image
												src={`${tmdbImageUrl}${actor.profile_path}`}
												alt={actor.name}
												width={40}
												height={40}
												className="object-cover w-10 h-10 rounded-full"
											/>
											<div className="text-sm">
												<p className="font-medium">{actor.name}</p>
												<p className="text-xs text-card-foreground/80">
													{actor.character}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						<Tabs defaultValue="reviews" className="w-full">
							<TabsList className="w-full mb-6">
								<TabsTrigger value="reviews" className="flex-1">
									Avaliações
								</TabsTrigger>
								<TabsTrigger value="onde-assistir" className="flex-1">
									Onde Assistir
								</TabsTrigger>
							</TabsList>
							<TabsContent value="reviews" className="space-y-6">
								<div className="p-4 bg-card rounded-lg shadow">
									<div className="flex items-center justify-between mb-4">
										<h3 className="text-lg font-semibold">
											Avaliações dos usuários
										</h3>
										{accessToken ? (
											<CreatePost />
										) : (
											<Link href="/auth/signin">
												<Button>Escrever avaliação</Button>
											</Link>
										)}
									</div>
									<MovieReviews id={id} />
								</div>
							</TabsContent>
							<TabsContent value="onde-assistir" className="space-y-6">
								<div className="p-4 bg-card rounded-lg shadow">
									<h3 className="mb-4 text-lg font-semibold">Disponível em</h3>
									<div className="space-y-4">
										{movieProviders.results.BR?.flatrate?.map((provider) => (
											<div
												key={provider.provider_id}
												className="flex items-center justify-between p-3 border rounded-lg bg-muted"
											>
												<div className="flex items-center gap-3">
													<Image
														src={`${tmdbImageUrl}${provider.logo_path}`}
														alt={provider.provider_name}
														width={40}
														height={40}
														className="object-cover w-10 h-10 rounded-full"
													/>
													<div>
														<p className="font-medium text-muted-foreground">
															{provider.provider_name}
														</p>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</TabsContent>
						</Tabs>

						<div className="p-4 mt-6 bg-card rounded-lg shadow">
							<h3 className="mb-4 text-lg text-card-foreground font-semibold">
								Deixe seu comentário
							</h3>
							<div className="flex gap-3">
								<UserAvatar
									user={{
										name: 'Você',
										image: '/placeholder.svg?height=40&width=40',
									}}
									className="w-10 h-10"
								/>
								<div className="flex-1 space-y-3">
									<Input placeholder="O que você achou do filme?" />
									<Button>Comentar</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

import { tmdbImageUrl } from '@/constants';
import { Movie } from '@/types/movie';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MovieList({ data }: { data: Movie[] }) {
	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
			{data.map((movie) => (
				<Link key={movie.id} href={`/movies/${movie.id}`} className="group">
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
						<p className="text-sm text-gray-500">{movie.release_date}</p>
					</div>
				</Link>
			))}
		</div>
	);
}

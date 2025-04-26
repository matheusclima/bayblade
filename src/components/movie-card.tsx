import Link from "next/link"
import { Star } from "lucide-react"

interface Movie {
  title: string
  image: string
  year: string
  rating: string
}

interface MovieCardProps {
  movie: Movie
  compact?: boolean
}

export function MovieCard({ movie, compact = false }: MovieCardProps) {
  if (compact) {
    return (
      <Link href="/filme/1" className="flex items-start gap-3 group">
        <img
          src={movie.image || "/placeholder.svg"}
          alt={movie.title}
          className="object-cover w-16 rounded-md aspect-[2/3]"
        />
        <div>
          <h3 className="font-medium group-hover:text-rose-600">{movie.title}</h3>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-xs">{movie.rating}</span>
            <span className="text-xs text-muted-foreground">({movie.year})</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href="/filme/1"
      className="block overflow-hidden transition-transform rounded-lg shadow group hover:scale-105"
    >
      <div className="relative">
        <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="object-cover w-full aspect-[2/3]" />
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-sm font-medium text-white">{movie.title}</h3>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-xs text-white">{movie.rating}</span>
            <span className="text-xs text-gray-300">({movie.year})</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

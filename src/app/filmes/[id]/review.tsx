import api from "@/api/api";
import { Rating } from "@/components/ui/rating";
import { UserAvatar } from "@/components/ui/user-avatar";
import { ReviewType } from "@/types/post";

export default async function MovieReviews({ id }: { id: number }) {
  const { data: reviews } = await api.get<ReviewType[]>(
    `/reviews/movies/${id}`
  );

  function getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Ontem";
    if (diffDays < 7) return `Há ${diffDays} dias`;
    if (diffDays < 30) return `Há ${Math.floor(diffDays / 7)} semanas`;
    if (diffDays < 365) return `Há ${Math.floor(diffDays / 30)} meses`;
    return `Há ${Math.floor(diffDays / 365)} anos`;
  }

  return (
    <div className="space-y-6">
      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center">
          Seja o primeiro a avaliar
        </p>
      ) : (
        reviews.map((review) => (
          <div
            key={review.id}
            className="pb-4 border-b last:border-0 last:pb-0"
          >
            <div className="flex items-start gap-3 mb-2">
              <UserAvatar
                user={{
                  name: ` ${review.user.nome} ${review.user.sobrenome}`,
                  image: `/placeholder.svg?height=40&width=40`,
                }}
                className="w-10 h-10"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {review.user.nome} {review.user.sobrenome}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getRelativeTime(new Date(review.createdAt))}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Rating
                      value={review.avaliacao}
                      readOnly
                      className="text-muted-foreground"
                    />
                  </div>
                </div>
                <h4 className="mt-2 mb-1 font-medium">{review.titulo}</h4>
                <div
                  className="prose text-sm text-muted-foreground/90"
                  dangerouslySetInnerHTML={{ __html: review.descricao }}
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

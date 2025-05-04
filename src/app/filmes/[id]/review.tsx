import api from '@/api/api';
import { Button } from '@/components/ui/button';
import { Rating } from '@/components/ui/rating';
import { UserAvatar } from '@/components/ui/user-avatar';
import { howManyDaysAgo } from '@/lib/utils';
import { Review } from '@/types/post';
import { Heart, MessageSquare } from 'lucide-react';

export default async function MovieReviews({ id }: { id: number }) {
	const { data: reviews } = await api.get<Review[]>(`/posts/movies/${id}`);
  console.log(reviews);
	return (
		<div className="space-y-6">
			{reviews.map((review) => (
				<div key={review.id} className="pb-4 border-b last:border-0 last:pb-0">
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
									<p className="font-medium">{review.user.nome} {review.user.sobrenome}</p>
									<p className="text-xs text-muted-foreground">Há {howManyDaysAgo(new Date(review.createdAt))} dias</p>
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
							<div className="flex gap-4 mt-2">
								<Button variant="ghost" size="sm" className="text-xs">
									<Heart className="w-3 h-3 mr-1" /> {review.curtidas}
								</Button>
								<Button variant="ghost" size="sm" className="text-xs">
									<MessageSquare className="w-3 h-3 mr-1" /> 5
								</Button>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

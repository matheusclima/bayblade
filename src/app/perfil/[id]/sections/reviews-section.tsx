import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Star } from "lucide-react";
import Image from "next/image";

interface Review {
  id: string;
  movieTitle: string;
  moviePoster: string;
  rating: number;
  review: string;
  createdAt: string;
  movieYear: number;
}

interface UserReviewsProps {
  reviews: Review[];
}

export default function UserReviews({ reviews }: UserReviewsProps){
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-primary fill-primary" : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Reviews Recentes</h2>
      
      <div className="grid gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-card border-border hover:border-primary/30 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src={review.moviePoster}
                    alt={review.movieTitle}
                    width={64}
                    height={96}
                    className="w-16 h-24 object-cover rounded-md border border-border group-hover:border-primary/50 transition-colors"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {review.movieTitle}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {review.movieYear}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-sm text-muted-foreground">{review.rating}/5</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                    {review.review}
                  </p>
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
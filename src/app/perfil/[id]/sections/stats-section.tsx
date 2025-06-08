
import { Card, CardContent } from "@/components/ui/card";

interface UserStatsProps {
  stats: {
    totalReviews: number;
    moviesWatched: number;
    averageRating: number;
    followers: number;
    following: number;
  };
}

export default function UserStats({ stats }: UserStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      <Card className="bg-card border-border hover:border-primary/30 transition-colors">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{stats.totalReviews}</div>
          <div className="text-sm text-muted-foreground">Reviews</div>
        </CardContent>
      </Card>
      
      <Card className="bg-card border-border hover:border-primary/30 transition-colors">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{stats.moviesWatched}</div>
          <div className="text-sm text-muted-foreground">Filmes</div>
        </CardContent>
      </Card>
      
      <Card className="bg-card border-border hover:border-primary/30 transition-colors">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{stats.averageRating.toFixed(1)}</div>
          <div className="text-sm text-muted-foreground">Média</div>
        </CardContent>
      </Card>
      
      <Card className="bg-card border-border hover:border-primary/30 transition-colors">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{stats.followers}</div>
          <div className="text-sm text-muted-foreground">Seguidores</div>
        </CardContent>
      </Card>
      
      <Card className="bg-card border-border hover:border-primary/30 transition-colors">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{stats.following}</div>
          <div className="text-sm text-muted-foreground">Seguindo</div>
        </CardContent>
      </Card>
    </div>
  );
};


import { FileText } from 'lucide-react';

interface EmptyPostsProps {
  title?: string;
  description?: string;
}

const EmptyPosts = ({ 
  title = "Nenhum post encontrado",
  description = "Ainda não há posts para exibir. Que tal criar o primeiro?"
}: EmptyPostsProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-8 text-center">
      <div className="mb-6">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-background" />
        </div>
        <h3 className="text-xl font-semibold text-foreground/80 mb-2">
          {title}
        </h3>
        <p className="text-foreground/50 max-w-md mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};

export default EmptyPosts;
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CommentProps {
  id: number;
  author: {
    nome: string;
    sobrenome: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
}

const Comment = ({ author, content, createdAt }: CommentProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex gap-3 p-4 border border-muted-foreground rounded-md">
      <Avatar className="w-8 h-8">
        <AvatarImage src={author.avatar} alt={author.nome} />
        <AvatarFallback className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          {getInitials(`${author.nome} ${author.sobrenome}`)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-sm font-semibold text-muted-foreground/40">{author.nome} {author.sobrenome}</h4>
          <span className="text-xs text-muted-foreground/40">
            {formatDistanceToNow(createdAt, { 
              addSuffix: true, 
              locale: ptBR 
            })}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

export default Comment;

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

interface CommentFormProps {
  onSubmit: (content: string) => void;
  isSubmitting?: boolean;
  currentUser?: {
    name: string;
    avatar?: string;
  };
}

const CreateComment = ({ 
  onSubmit, 
  isSubmitting = false,
}: CommentFormProps) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      toast.error('O comentário não pode estar vazio.');
      return;
    }

    if (comment.length > 500) {
      toast.error('O comentário não pode ter mais de 500 caracteres.');
      return;
    }

    onSubmit(comment.trim());
    setComment('');
    
    toast.success('Comentário enviado com sucesso!');
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 pt-4">
      <div className="flex gap-3">        
        <div className="flex-1 space-y-3">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escreva seu comentário..."
            className="min-h-[100px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            maxLength={500}
          />
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {comment.length}/500 caracteres
            </span>
            
            <Button
              type="submit"
              disabled={isSubmitting || !comment.trim()}
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Comentar
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateComment;
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MessageSquareIcon } from "lucide-react";
import Comment from "./item";
import { DialogTitle } from "@radix-ui/react-dialog";
import { AxiosError } from "axios";
import api from "@/api/api";
import { PostType } from "@/types/post";
import { toast } from "sonner";
import CreateComment from "./create";

export default function Comments({ postId }: { postId: number }) {
  const queryClient = useQueryClient();
  
  const { mutate: addCommentMutation, isPending } = useMutation({
    mutationFn: async (comment: string) => {
      await api.post(`/posts/${postId}/comment`, {
        content: comment,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", postId],
      });
    },
    onError: (error: AxiosError) => {
      toast.error("Erro ao adicionar comentário. Tente novamente mais tarde.");
      console.error("Erro ao adicionar comentário:", error);
    },
  });

  const { data: post } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const { data } = await api.get<PostType>(`/posts/${postId}/comments`);
      return data;
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          💬 {post?.comments.length ?? 0} comentários
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-4xl">
        <DialogTitle></DialogTitle>
        <Card className="w-full">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquareIcon className="w-5 h-5 text-blue-600" />
              Comentários ({post?.comments.length})
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <CreateComment onSubmit={addCommentMutation} isSubmitting={isPending} />

            {post?.comments && post.comments.length > 0 ? (
              <div className="space-y-2 rounded-lg overflow-y-auto h-[200px] scrollbar-hidden">
                {post.comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    id={comment.id}
                    author={comment.user}
                    content={comment.descricao}
                    createdAt={comment.createdAt}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MessageSquareIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Ainda não há comentários.</p>
                <p className="text-sm">Seja o primeiro a comentar!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export type PostType = {
  id: number;
  content: string;
  imageUrl?: string;
  likesCount: number;
  commentsCount: number;
  comments: Comment[];
  createdAt: string;
  isLiked: boolean;
  user: {
    id: string;
    nome: string;
    sobrenome: string;
    usuario: string;
    avatar?: string;
  };
};

export type Comment = {
  id: number;
  descricao: string;
  createdAt: string;
  user: {
    id: string;
    nome: string;
    sobrenome: string;
    avatar?: string;
  };
}

export type ReviewType = {
  id: string;
  titulo: string;
  descricao: string;
  imageUrl?: string;
  avaliacao: number;
  curtidas: number;
  createdAt: string;
  user: {
    id: string;
    nome: string;
    sobrenome: string;
  };
};

export type PaginatedPosts = {
  posts: PostType[];
  page: number;
  limit: number;
  hasNextPage: boolean;
};

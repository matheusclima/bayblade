export type PostType = {
    id: string;
    content: string;
    imageUrl?: string;
    likesCount: number;
    commentsCount: number;
    createdAt: string
    user: {
        id: string;
        nome: string;
        sobrenome: string;
        usuario: string;
    }
}

export type ReviewType = {
    id: string;
    titulo: string;
    descricao: string;
    imageUrl?: string;
    avaliacao: number;
    curtidas: number;
    createdAt: string
    user: {
        id: string;
        nome: string;
        sobrenome: string;
    }
}
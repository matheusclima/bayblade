export type Review = {
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
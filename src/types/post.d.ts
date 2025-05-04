export type Review = {
    id: string;
    titulo: string;
    descricao: string;
    imageUrl: string;
    avaliacao: number;
    curtidas: number;
    createdAt: string
    user: {
        nome: string;
        sobrenome: string;
    }
}
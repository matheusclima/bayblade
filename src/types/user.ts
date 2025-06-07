export interface CookieUser {
    id: string;
    nome: string;
    sobrenome: string;
    usuario: string;
    email: string;
  };

export type Session = {
  user: {
    id: string;
    nome: string;
    sobrenome: string;
    usuario: string;
    email: string;
    avatar?: string;
    bio?: string;
    cidade?: string;
    createdAt: string;
  }
}
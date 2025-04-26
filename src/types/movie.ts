export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface MovieCollection {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
}

export interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: MovieCollection | null;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieData {
    id: number;
    results: Movie[];
}
export interface CastMember {
    cast_id: number;
    character: string; // Personagem que o ator interpreta
    credit_id: string;
    gender: number; // 1: Feminino, 2: Masculino, 0: Não informado
    id: number;
    name: string; // Nome do ator
    order: number; // Ordem de importância na lista (geralmente, o ator principal tem o menor valor)
    profile_path: string | null; // Caminho para a imagem do ator
}

export interface CrewMember {
    credit_id: string;
    department: string; // Exemplo: "Directing", "Writing"
    gender: number; // 1: Feminino, 2: Masculino, 0: Não informado
    id: number;
    job: string; // Exemplo: "Director", "Writer"
    name: string; // Nome do membro da equipe
}

export interface MovieCredits {
    id: number; // ID do filme
    cast: CastMember[]; // Lista de atores
    crew: CrewMember[]; // Lista de membros da equipe de produção
}

export interface MovieProvider {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
}

export interface MovieResults {
    link: string;
    ads: MovieProvider[];
    flatrate: MovieProvider[];
}

export interface MovieDataBR {
    id: number;
    results: {
        BR: MovieResults;
    };
}

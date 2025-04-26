import { Movie, MovieCredits, MovieData } from "../../types/movie";
import tmdbApi from "..";

export const getMovieById = async (id: number) => {
    const response = await tmdbApi.get<Movie>(`/movie/${id}?language=pt-BR`);
    return response.data;
}

export const getMovieCredits = async (id: number) => {
    const response = await tmdbApi.get<MovieCredits>(`/movie/${id}/credits?language=pt-BR`);
    return response.data;
}

export const getMovieProviders = async (id: number) => {
    const response = await tmdbApi.get<MovieData>(`/movie/${id}/watch/providers?language=pt-BR`);
    return response.data;
}
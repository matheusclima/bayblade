import { Movie, MovieCredits, MovieData, MovieDataBR, MovieGenre } from "../../types/movie";
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
    const response = await tmdbApi.get<MovieDataBR>(`/movie/${id}/watch/providers?language=pt-BR`);
    return response.data;
}

export const getTrendingMoviesByPage = async (page: number) => {
    const response = await tmdbApi.get<MovieData>(`/movie/popular?language=pt-BR&page=${page}`);
    return response.data;
}

export const getPopularMoviesByPage = async (page: number) => {
    const response = await tmdbApi.get<MovieData>(`/movie/popular?language=pt-BR&page=${page}`);
    return response.data;
}

export const getMovieGenres = async () => {
    const response = await tmdbApi.get<MovieGenre>(`/genre/movie/list?language=pt-BR`);
    return response.data;
}
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config()

const tmdbToken = process.env.TMDB_TOKEN;

const baseUrl = 'https://api.themoviedb.org/3'

const tmdbApi =  axios.create({
    baseURL: baseUrl,
    headers: {
        'Authorization': `Bearer ${tmdbToken}`,
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
    },
    withCredentials: true,
})

export default tmdbApi
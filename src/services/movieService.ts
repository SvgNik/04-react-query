import axios from "axios";
import type { FetchMoviesResponse } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (
  query: string,
  page: number = 1
): Promise<FetchMoviesResponse> => {
  const options = {
    params: {
      query: query,
      page: page,
      include_adult: false,
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  };

  const response = await axios.get<FetchMoviesResponse>(
    `${BASE_URL}/search/movie`,
    options
  );
  return response.data;
};

export default fetchMovies;

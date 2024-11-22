// src/app/movies/api.ts
const API_KEY = 'YOUR_TMDB_API_KEY'; // API anahtarınızı buraya ekleyin
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string): Promise<any[]> => {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return [];
  }
};

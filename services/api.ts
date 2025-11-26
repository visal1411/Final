export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers:{
        accept: 'application/json',
    }
}

export const fetchMovies = async ({ query }: { query?: string } = {}) => {
  console.log("key==",process.env.EXPO_PUBLIC_MOVIE_API_KEY);

  // Use api_key in URL, only call search if query is not empty
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?api_key=${TMDB_CONFIG.API_KEY}&query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${TMDB_CONFIG.API_KEY}`;

  console.log("Fetching from:", endpoint);

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: { accept: 'application/json' }, // no Authorization header needed
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (movieId: number) : Promise<MovieDetails> => {

  try{
    const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`, {
      method: 'GET',
      headers: { accept: 'application/json' },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details`);
    }
    const data = await response.json();
    return data;
  }catch(error){
    console.error("Error fetching movie details:", error);
    throw error;
  }
}



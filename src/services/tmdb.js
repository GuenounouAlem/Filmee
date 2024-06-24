import axios from 'axios';

const API_KEY = '5af4f59005d7b211a718c1359ee2820d';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async () => {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: API_KEY },
    });
    return response.data.results;
  };
  
  export const getTopRatedMovies = async () => {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
      params: { api_key: API_KEY },
    });
    return response.data.results;
  };
  
  export const discoverMovies = async (pages = (Math.random() * 5) + 1) => {
    const currentYear = new Date().getFullYear();
    const requests = [];
  
    for (let i = 1; i <= pages; i++) {
      const randomPage = Math.floor(Math.random() * 500) + 1;
      requests.push(
        axios.get(`${BASE_URL}/discover/movie`, {
          params: {
            api_key: API_KEY,
            sort_by: 'popularity.desc',
            'vote_count.gte': 100,
            'vote_average.gte': 1,
            'vote_average.lte': 10,
            'primary_release_date.gte': `${currentYear - 30}-01-01`,
            'primary_release_date.lte': `${currentYear}-12-31`,
            page: randomPage,
          },
        })
      );
    }
  
    const responses = await Promise.all(requests);
    const allMovies = responses.flatMap(response => response.data.results);
  
    // Shuffle the movies to ensure more randomness
    for (let i = allMovies.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allMovies[i], allMovies[j]] = [allMovies[j], allMovies[i]];
    }
  
    return allMovies;
  };
  
  export const getRandomMovie = async () => {
    const [popular, topRated, discovered] = await Promise.all([
      getPopularMovies(),
      getTopRatedMovies(),
      discoverMovies(),
    ]);
  
    const allMovies = [...popular, ...topRated, ...discovered];
    const uniqueMovies = [...new Map(allMovies.map(movie => [movie.id, movie])).values()];
    const randomMovie = uniqueMovies[Math.floor(Math.random() * uniqueMovies.length)];
    return randomMovie;
  };
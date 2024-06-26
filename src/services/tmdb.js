import axios from 'axios';
import { useContext } from 'react';
import { FilterContext } from '../FilterContext'; // Adjust the path as necessary

const API_KEY = '5af4f59005d7b211a718c1359ee2820d';
const BASE_URL = 'https://api.themoviedb.org/3';

const genreMapping = {
  'Action': 28,
  'Comedy': 35,
  'Thriller': 53,
  'Adventure': 12,
  'Science Fiction': 878,
  'Fantasy': 14,
  'Animation': 16,
  'Drama': 18,
  'Mystery': 9648,
  'Romance': 10749
};

const useMovieService = () => {
  const { activeFilters } = useContext(FilterContext);

  const discoverMovies = async (page = 1) => {
    const currentYear = new Date().getFullYear();
    const filterParams = {
      'vote_average.gte': 1,
      'vote_average.lte': 10,
      'primary_release_date.gte': `${currentYear - 80}-01-01`,
      'primary_release_date.lte': `${currentYear}-12-31`,
      'vote_count.gte': 100,
      sort_by: 'popularity.desc',
      page
    };

    // Handle "How good?" filters
    if (activeFilters.includes('Weak')) {
      filterParams['vote_average.lte'] = 3.999;
    } else if (activeFilters.includes('Mid')) {
      filterParams['vote_average.gte'] = 4;
      filterParams['vote_average.lte'] = 7;
    } else if (activeFilters.includes('Peak')) {
      filterParams['vote_average.gte'] = 7;
    }

    // Handle "How Old?" filters
    if (activeFilters.includes('Relics')) {
      filterParams['primary_release_date.lte'] = `${currentYear - 61}-12-31`;
    } else if (activeFilters.includes('Boomers')) {
      filterParams['primary_release_date.gte'] = `${currentYear - 60}-01-01`;
      filterParams['primary_release_date.lte'] = `${currentYear - 40}-12-31`;
    } else if (activeFilters.includes('OGs')) {
      filterParams['primary_release_date.gte'] = `${currentYear - 40}-01-01`;
      filterParams['primary_release_date.lte'] = `${currentYear - 20}-12-31`;
    } else if (activeFilters.includes('Zzz')) {
      filterParams['primary_release_date.gte'] = `${currentYear - 20}-01-01`;
    }

    // Handle "What kind?" filters
    const selectedGenres = activeFilters.filter(filter => Object.keys(genreMapping).includes(filter));
    if (selectedGenres.length > 0) {
      filterParams['with_genres'] = selectedGenres.map(genre => genreMapping[genre]).join(',');
    }

    try {
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          ...filterParams
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  };

  const getRandomMovie = async (retryCount = 6) => {
    let randomMovie = null;

    while (!randomMovie && retryCount > 0) {
      try {
        const randomPage = Math.floor(Math.random() * 100) + 1;
        const movies = await discoverMovies(randomPage);

        if (movies.length > 0) {
          const uniqueMovies = [...new Map(movies.map(movie => [movie.id, movie])).values()];
          randomMovie = uniqueMovies[Math.floor(Math.random() * uniqueMovies.length)];
        } else {
          console.warn('No movies found, retrying...');
        }
      } catch (error) {
        console.error('Error fetching random movie:', error);
      }

      retryCount--;
    }

    if (!randomMovie) {
      throw new Error('No movies found with the current filters.');
    }

    try {
      const detailsResponse = await axios.get(`${BASE_URL}/movie/${randomMovie.id}`, {
        params: {
          api_key: API_KEY,
          append_to_response: 'credits'
        }
      });
      return {
        ...randomMovie,
        ...detailsResponse.data,
      };
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  };

  return { discoverMovies, getRandomMovie };
};

export default useMovieService;

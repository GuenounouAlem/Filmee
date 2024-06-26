import { useState, useContext } from 'react';
import Rating from './Rating';
import { FilterContext } from './FilterContext'; // Adjust the path as necessary
import useMovieService from './services/tmdb';

const MovieCard = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const movieService = useMovieService();
  const { activeFilters } = useContext(FilterContext);

  const fetchRandomMovie = async () => {
    setError(null); // Reset error state
    try {
      const randomMovie = await movieService.getRandomMovie();
      setMovie(randomMovie);
      
      
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      {movie ? (
        <>
          <figure className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full max-w-xs h-auto mx-auto mt-4"
            />
            <Rating rating={movie.vote_average} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{movie.title}</h2>
            <p>{movie.overview}</p>
            <div className="movie-details">
              <p><strong>Year:</strong> {new Date(movie.release_date).getFullYear()}</p>
              <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
              <p><strong>Director:</strong> {getDirectorName(movie.credits.crew)}</p>
              <p><strong>Main Actors:</strong> {getMainActors(movie.credits.cast)}</p>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={fetchRandomMovie}>
                Gimme
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="card-body">
          <h2 className="card-title">No Movie Yet</h2>
          {error ? <p className="text-red-500">{error}</p> : null}
          <div className="card-actions justify-end">
            <button className="btn btn-primary " onClick={fetchRandomMovie}>
              Gimme
            </button>
          </div>
        </div>
      )}
    </div>
    
  );
};

const getDirectorName = (crew) => {
  const director = crew.find(member => member.job === 'Director');
  return director ? director.name : 'N/A';
};

// Helper function to get main actors
const getMainActors = (cast) => {
  return cast.slice(0, 5).map(actor => actor.name).join(', ');
};

export default MovieCard;

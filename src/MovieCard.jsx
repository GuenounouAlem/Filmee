
import { useState } from 'react';
import { getRandomMovie } from './services/tmdb.js';
import Rating from './Rating';

const MovieCard = () => {
  const [movie, setMovie] = useState(null);

  const fetchRandomMovie = async () => {
    const randomMovie = await getRandomMovie();
    setMovie(randomMovie);
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

export default MovieCard;
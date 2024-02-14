// MovieList.js
import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  //console.log(movies);

  if (!movies) {
    return null;
  }
  if (movies.length === 0) {
    return <p>No movies available.</p>;
  }
  return (
    <div className='px-6'>
      <h1 className='text-3xl py-7 text-white'>{title}</h1>
      <div className='flex items-center overflow-x-auto'>
        {/* Use overflow-x-auto to enable horizontal scrolling */}
        <div className='flex gap-4'>
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieList;

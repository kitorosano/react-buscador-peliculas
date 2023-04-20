import PropTypes from 'prop-types'

function ListOfMovies({ movies }) {
  return (
    <ul className='movies'>
      {movies.map((movie) => (
        <li
          key={movie.id}
          className='movie'
        >
          <img
            src={movie.poster}
            alt={`Poster de ${movie.title}`}
          />
          <div className='movie-info'>
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

function NoMoviesResults() {
  return <p>No se encontraron peliculas para esta busqueda</p>
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />
}

ListOfMovies.propTypes = {
  movies: PropTypes.array
}

Movies.propTypes = {
  movies: PropTypes.array
}

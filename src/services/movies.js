const API_KEY = 'Your_api_key_here'

export const searchMovies = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
    )
    const { Search: movies } = await response.json()

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  } catch (error) {
    throw new Error("Error searching movies")
  }
}

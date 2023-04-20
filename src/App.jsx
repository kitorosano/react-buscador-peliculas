import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con numeros')
      return
    }

    if (search.length < 3) {
      setError('No se puede buscar una pelicula con menos de 3 caracteres')
      return
    }
    setError('')
  }, [search])

  return { search, updateSearch: setSearch, error }
}

function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce((search) => getMovies({ search }), 300),
    []
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form
          className='form'
          onSubmit={handleSubmit}
        >
          <input
            name='search'
            value={search}
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'initial'
            }}
            onChange={handleChange}
            placeholder='Avengers, Star Wars, The Matrix...'
            type='text'
          />
          <input
            type='checkbox'
            checked={sort}
            onChange={handleSort}
          />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {loading && <p>Cargando...</p>}
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App

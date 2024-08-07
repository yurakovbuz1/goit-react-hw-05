import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import css from './MoviesPage.module.css'
import Loader from '../../components/Loader/Loader';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import MovieList from '../../components/MovieList/MovieList';


const MoviesPage = () => {
    const searchUrl = 'https://api.themoviedb.org/3/search/movie';

    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState([])
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);

    const [params, setParams] = useSearchParams();    

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setError(false);
                setLoading(true);
                const { data } = await axios.get(searchUrl, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTUyZDAwMWJiZWQyNGVhMGY2ZjIyMjNkNmEzYjg3ZiIsIm5iZiI6MTcxOTU4NTAzMC40MDA4Miwic3ViIjoiNjY3ZWM3NzJmODMxN2Q2OWQ2N2RlM2U1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.BMEPlQ8uxaI6rFYlFakrcTUq2CLDLhDV5TXDZ53Je2Y',
                        accept: 'application/json'
                    },
                    params: {
                        query: params.get("filter"),
                        include_adult: false,
                        language: 'en - US',
                    }
                })
                setMovies(data.results);
            }
            catch (e) {
                setError(true);
            }
            finally {
                setLoading(false);
            }
        }
        fetchMovies()
    }, [params])

    const handleSubmit = (value) => {
        if (value !== query) {
            params.set('filter', value)
            setParams(params)
            setMovies([])
            setQuery(params.get("filter"))
        }
    }

    return (
        <>
            <SearchBar onSubmit={handleSubmit} params={params} />
            {isError ? <NotFoundPage /> :
                <MovieList movies={movies} from={'/movies' + location.search} />
                
                // <ul>
                //     {movies.map((movie) =>
                //         <li key={movie.id}>
                //             <Link to={`/movies/${movie.id}`} state={{
                //                 search: location.search,
                //             }} className={css.movieLink}>{movie.title}</Link>
                //         </li>
                //     )}
                // </ul>
            }
            {isLoading && <Loader />}

        </>
    )
}

export default MoviesPage;
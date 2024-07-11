import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import css from './MoviesPage.module.css'
import Loader from '../../components/Loader/Loader';
import axios from 'axios';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage/NotFoundPage';


const MoviesPage = () => {
    const searchUrl = 'https://api.themoviedb.org/3/search/movie';
    const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list';

    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([]);
    const [query, setQuery] = useState([])
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const location = useLocation();

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
            
        const fetchGenres = async () => {
        try {
            setError(false);
            setLoading(true);
            const {data} = await axios.get(genresUrl, {
            headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTUyZDAwMWJiZWQyNGVhMGY2ZjIyMjNkNmEzYjg3ZiIsIm5iZiI6MTcxOTU4NTAzMC40MDA4Miwic3ViIjoiNjY3ZWM3NzJmODMxN2Q2OWQ2N2RlM2U1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.BMEPlQ8uxaI6rFYlFakrcTUq2CLDLhDV5TXDZ53Je2Y',
                    accept: 'application/json'
                }
            })
            setGenres(data.genres);
        }
        catch (e) {
            setError(true);
        }
        finally {
            setLoading(false);
        }
        }
        fetchMovies()
        fetchGenres()
        
    }, [params])


    const handleSubmit = (searchQuery) => {
        if (searchQuery !== query) {
            setMovies([]);
            setQuery(params.get('filter'));
        }
    }

    const handleOnChange = ({target : {value}}) => {
        params.set('filter', value)
        setParams(params)
    }
    
    const getMovieGenres = (genre_ids) => {
        const selectedGenres = genre_ids.map((genreId) => {
            const genre = genres.find((genre) => genreId === genre.id)
            return genre ? genre.name : null
        }).filter((name) => name !== null).join(', ');
        return selectedGenres;
    }

    // const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(params.get('filter').toLowerCase()))
    // console.log('movies :>> ', movies);

    return (
        <>
            <SearchBar onSubmit={handleSubmit} onChange={handleOnChange} params={params} />
            {isError ? <NotFoundPage /> :
                <ul>
                    {movies.map((movie) =>
                        <li key={movie.id}>
                            <Link to={`/movies/${movie.id}`} state={{
                                title: movie.title,
                                year: movie.release_date.substring(0, 4),
                                overview: movie.overview,
                                vote: (movie.vote_average * 10),
                                genres: getMovieGenres(movie.genre_ids),
                                img: movie.poster_path,
                                search: location.search,
                                homePage: false
                            }} className={css.movieLink}>{movie.title}</Link>
                        </li>
                    )}
                </ul>
            }
            {isLoading && <Loader />}

        </>
    )
}

export default MoviesPage;
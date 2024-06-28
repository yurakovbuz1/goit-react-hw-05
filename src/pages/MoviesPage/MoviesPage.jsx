import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import css from './MoviesPage.module.css'
import Loader from '../../components/Loader/Loader';
import axios from 'axios';
import { Link } from 'react-router-dom';


const MoviesPage = () => {
    const searchUrl = 'https://api.themoviedb.org/3/search/movie';
    const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list';

    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([]);
    const [query, setQuery] = useState([])
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);

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
                        query,
                        include_adult: false,
                        language: 'en - US',
                    }
                })
                console.log('data :>> ', data.results);
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
        
    }, [query])

    const handleSubmit = (searchQuery) => {
        console.log('searchQuery :>> ', searchQuery);
        if (searchQuery !== query) {
            setMovies([]);
            
            setQuery(searchQuery);
            
        }
    }
    
    const getMovieGenres = (genre_ids) => {
        const selectedGenres = genre_ids.map((genreId) => {
            const genre = genres.find((genre) => genreId === genre.id)
            return genre ? genre.name : null
        }).filter((name) => name !== null).join(', ');
        return selectedGenres;
    }

    return (
        <>
            <SearchBar onSubmit={handleSubmit} />
            {isLoading && <Loader />}
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
                            homePage: false
                        }} className={css.movieLink}>{movie.title}</Link>
                    </li>
                )}
            </ul>

        </>
    )
}

export default MoviesPage;
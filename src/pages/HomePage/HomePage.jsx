import axios from 'axios';
import css from './HomePage.module.css'
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';


const HomePage = () => {
    const moviesUrl = 'https://api.themoviedb.org/3/trending/movie/day';
    const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list';

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
        try {
            setError(false);
            setLoading(true);
            const { data } = await axios.get(moviesUrl, {
            headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTUyZDAwMWJiZWQyNGVhMGY2ZjIyMjNkNmEzYjg3ZiIsIm5iZiI6MTcxOTU4NTAzMC40MDA4Miwic3ViIjoiNjY3ZWM3NzJmODMxN2Q2OWQ2N2RlM2U1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.BMEPlQ8uxaI6rFYlFakrcTUq2CLDLhDV5TXDZ53Je2Y',
                    accept: 'application/json'
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

    }, [])

    const getMovieGenres = (genre_ids) => {
        const selectedGenres = genre_ids.map((genreId) => {
            const genre = genres.find((genre) => genreId === genre.id)
            return genre ? genre.name : null
        }).filter((name) => name !== null).join(', ');
        return selectedGenres;
    }
    
    return (
        
        <>
            {isLoading && <Loader/>}
            {isError ? <p>Sorry, something went wrong.. please try again</p> : 
            <div>
            <h2>Trending movies</h2>
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
                                homePage: true
                            }} className={css.movieLink}>{movie.title}</Link>
                        </li>
                    )}
                </ul>
            </div>
            }

        </>
    )
}

export default HomePage;
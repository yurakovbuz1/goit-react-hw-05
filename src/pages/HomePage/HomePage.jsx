import axios from 'axios';
import css from './HomePage.module.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import NotFoundPage from '../NotFoundPage/NotFoundPage';


const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    
    const moviesUrl = 'https://api.themoviedb.org/3/trending/movie/day';

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
        fetchMovies()

    }, [])
    
    return (
        
        <>
            {isLoading && <Loader/>}
            {isError ? <NotFoundPage/> : 
            <div>
            <h2>Trending movies</h2>
                <ul>
                    {movies.map((movie) =>
                        <li key={movie.id}>
                            <Link to={`/movies/${movie.id}`} className={css.movieLink}>{movie.title}</Link>
                        </li>
                    )}
                </ul>
            </div>
            }

        </>
    )
}

export default HomePage;
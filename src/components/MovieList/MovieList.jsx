import { Link } from 'react-router-dom';
import css from './MovieList.module.css'


const MovieList = ({ movies, from}) => {

    return (
        <>
             <ul>
                    {movies.map((movie) =>
                        <li key={movie.id}>
                            <Link to={`/movies/${movie.id}`} state={{
                                from
                            }} className={css.movieLink}>{movie.title}</Link>
                        </li>
                    )}
                </ul>

        </>
    )
}

export default MovieList;
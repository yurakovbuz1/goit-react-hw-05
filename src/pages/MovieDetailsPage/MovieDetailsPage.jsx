import { Link, useLocation } from 'react-router-dom';
import css from './MovieDetailsPage.module.css'


const MovieDetailsPage = () => {
    const imageUrl = 'https://image.tmdb.org/t/p/w500/';
    const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list';
    const {movieId} = useParams();
    const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
    const { state } = useLocation();
    console.log('state.image :>> ', state.image);
    
    

    return (
        <>
            <Link to={state.homePage ? '/' : '/movies'} className={css.goBack}>Go back</Link>
            <div className={css.mainContainer}>
                <img src={imageUrl + details.poster_path} alt={details.title} />
                <div>
                    <div className={css.descriprion}>
                        <h2>{details.title} ({details.release_date.substring(0, 4)})</h2>
                        <p>User score: {(details.vote_average*10).toFixed(2)}%</p>
                        <p><b>Overview</b></p>
                        <p>{details.overview}</p>
                        <p><b>Genres</b></p>
                        <p>{details.genres.map((genre) => genre.name).join(", ")}</p>
                    </div>
                    <nav>
                        <Link to={`cast`} className={css.link}>Cast</Link>
                        <Link to={`reviews`} className={css.link}>Reviews</Link>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default MovieDetailsPage;
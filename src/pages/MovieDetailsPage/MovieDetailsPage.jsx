import { Link, useLocation, useParams } from 'react-router-dom';
import css from './MovieDetailsPage.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';


const MovieDetailsPage = () => {
    const imageUrl = 'https://image.tmdb.org/t/p/w500/';
    const [details, setDetails] = useState();
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const { state } = useLocation();
    const { movieId } = useParams();
    const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}`;

    useEffect(() => {
        const fetchMovies = async () => {
        try {
            setError(false);
            setLoading(true);
            const { data } = await axios.get(detailsUrl, {
            headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTUyZDAwMWJiZWQyNGVhMGY2ZjIyMjNkNmEzYjg3ZiIsIm5iZiI6MTcxOTU4NTAzMC40MDA4Miwic3ViIjoiNjY3ZWM3NzJmODMxN2Q2OWQ2N2RlM2U1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.BMEPlQ8uxaI6rFYlFakrcTUq2CLDLhDV5TXDZ53Je2Y',
                    accept: 'application/json'
                }
            })
            setDetails(data);
        }
        catch (e) {
            setError(true);
        }
        finally {
            setLoading(false);
        }
        }
        fetchMovies()

    }, [detailsUrl])
    return (
        <>
            <Link to={state ? (state.search ? `/movies/${state.search}` : '/') : '/'} className={css.goBack}>Go back</Link>
            {details && (<div className={css.mainContainer}>
                <img src={imageUrl + details.poster_path} alt={details.title} />
                <div className={css.descriprion}>
                    <h2>{details.title} ({details.release_date.substring(0, 4)})</h2>
                    <p>User score: {details.vote_average * 10}%</p>
                    <p><b>Overview</b></p>
                    <p>{details.overview}</p>
                    <p><b>Genres</b></p>
                    <p>{details.genres.map((genre)=> genre.name).join(', ')}</p>
                </div>
            </div>
            )}
            <div className="addContainer">
                {/* <Link to={}>Cast</Link> */}

            </div>

        </>
    )
}

export default MovieDetailsPage;
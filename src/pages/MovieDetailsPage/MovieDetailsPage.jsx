import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import css from './MovieDetailsPage.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';


const MovieDetailsPage = () => {
    const imageUrl = 'https://image.tmdb.org/t/p/w500/';
    const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list';
    const {movieId} = useParams();
    const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
    const { state } = useLocation();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [genres, setGenres] = useState([]);
    const [details, setDetails] = useState([]);

    useEffect(() => {
        if (!state) {
            navigate('/movies');
        } else {
            const fetchMovie = async () => {
                try {
                    setError(false);
                    setLoading(true);
                    const { data } = await axios.get(detailsUrl, {
                        headers: {
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTUyZDAwMWJiZWQyNGVhMGY2ZjIyMjNkNmEzYjg3ZiIsIm5iZiI6MTcxOTU4NTAzMC40MDA4Miwic3ViIjoiNjY3ZWM3NzJmODMxN2Q2OWQ2N2RlM2U1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.BMEPlQ8uxaI6rFYlFakrcTUq2CLDLhDV5TXDZ53Je2Y',
                            accept: 'application/json'
                        }
                    })
                    console.log('data :>> ', data);
                    setDetails(data);
                }
                catch (e) {
                    setError(true);
                    console.log(e + "Caught error")
                }
                finally {
                    setLoading(false);
                }
            }
            const fetchGenres = async () => {
                try {
                    setError(false);
                    setLoading(true);
                    const { data } = await axios.get(genresUrl, {
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
            fetchMovie()
            fetchGenres()
        }
    }, [state, navigate, detailsUrl]);

    console.log('details :>> ', details);

    // if (!state) {
    //     return null;
    // }

    const getMovieGenres = (genre_ids) => {
        const selectedGenres = genre_ids.map((genreId) => {
            const genre = genres.find((genre) => genreId === genre.id)
            return genre ? genre.name : null
        }).filter((name) => name !== null).join(', ');
        return selectedGenres;
    }

    // const userScore = (details.vote_average * 10).toFixed(2);

    return (
        <>
            <Link to={state.homePage ? '/' : `/movies/${state.search}`} className={css.goBack}>Go back</Link>
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
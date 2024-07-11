import { Link, useLocation, useNavigate } from 'react-router-dom';
import css from './MovieDetailsPage.module.css'
import { useEffect } from 'react';


const MovieDetailsPage = () => {
    const imageUrl = 'https://image.tmdb.org/t/p/w500/';
    const { state } = useLocation();
    const navigate = useNavigate();
    
    console.log('state :>> ', state);
    useEffect(() => {
        if (!state) navigate('/movies');
    }, [state, navigate])
    if (!state) {
        return null;
    }

    return (
        <>
            <Link to={state.homePage ? '/' : `/movies/${state.search}`} className={css.goBack}>Go back</Link>
            <div className={css.mainContainer}>
                <img src={imageUrl + state.img} alt={state.title} />
                <div className={css.descriprion}>
                    <h2>{state.title} ({state.year})</h2>
                    <p>User score: {state.vote}%</p>
                    <p><b>Overview</b></p>
                    <p>{state.overview}</p>
                    <p><b>Genres</b></p>
                    <p>{state.genres}</p>
                </div>
            </div>
            <div className="addContainer">

            </div>

        </>
    )
}

export default MovieDetailsPage;
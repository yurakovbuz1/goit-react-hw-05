import { useEffect, useState } from 'react';
import css from './MovieCast.module.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';


const MovieCast = () => {
    const imageUrl = 'https://image.tmdb.org/t/p/w500/';
    const [cast, setCast] = useState();
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const { movieId } = useParams();
    const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
    useEffect(() => {
        const fetchCast = async () => {
        try {
            setError(false);
            setLoading(true);
            const { data } = await axios.get(castUrl, {
            headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTUyZDAwMWJiZWQyNGVhMGY2ZjIyMjNkNmEzYjg3ZiIsIm5iZiI6MTcxOTU4NTAzMC40MDA4Miwic3ViIjoiNjY3ZWM3NzJmODMxN2Q2OWQ2N2RlM2U1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.BMEPlQ8uxaI6rFYlFakrcTUq2CLDLhDV5TXDZ53Je2Y',
                    accept: 'application/json'
                }
            })
            setCast(data.cast);
        }
        catch (e) {
            setError(true);
        }
        finally {
            setLoading(false);
        }
        }
        fetchCast()

    }, [castUrl])


    return (
        <>
            {isError && <NotFoundPage />} 
            {cast && (
                <div className={css.container}>
                    {cast.map((character) => 
                        <div key={character.id}>
                            <img src={imageUrl + character.profile_path} alt={character.name} className={css.image} />
                            <p>Name: {character.name}</p>
                            <p>Character: {character.character}</p>
                        </div>
                    )}
                </div>
            )}
            {isLoading && <Loader />} 
        </>
    )
}

export default MovieCast;
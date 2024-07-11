import { useEffect, useState } from 'react';
import css from './MovieReviews.module.css'
import axios from 'axios';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';


const MovieReviews = () => {
    const [reviews, setReviews] = useState();
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const { movieId } = useParams();
    const reviewsUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
    useEffect(() => {
        const fetchReviews = async () => {
        try {
            setError(false);
            setLoading(true);
            const { data } = await axios.get(reviewsUrl, {
            headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTUyZDAwMWJiZWQyNGVhMGY2ZjIyMjNkNmEzYjg3ZiIsIm5iZiI6MTcxOTU4NTAzMC40MDA4Miwic3ViIjoiNjY3ZWM3NzJmODMxN2Q2OWQ2N2RlM2U1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.BMEPlQ8uxaI6rFYlFakrcTUq2CLDLhDV5TXDZ53Je2Y',
                    accept: 'application/json'
                }
            })
            setReviews(data.results);
        }
        catch (e) {
            setError(true);
        }
        finally {
            setLoading(false);
        }
        }
        fetchReviews()

    }, [reviewsUrl])


    return (
        <>
            {isError && <NotFoundPage />} 
            {reviews && (
                (reviews.length > 0) ?
                        (<div className={css.container}>
                            {reviews.map((review) =>
                                <div key={review.id} className={css.review}>
                                    <p>Author: <br /> {review.author}</p>
                                    <p>Content: <br /> {review.content}</p>
                                </div>
                            )}
                        </div>)
                    : <p>We do not have any reviews for this movie</p>       
            )}
            {isLoading && <Loader />} 
        </>
    )
}

export default MovieReviews;
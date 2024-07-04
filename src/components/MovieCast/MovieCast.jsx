import { useEffect, useState } from 'react';
import css from './MovieCast.module.css'
import Loader from '../Loader/Loader';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const MovieCast = () => {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const params = useParams();

    console.log('params :>> ', params);

    useEffect(() => {
        const fetchCast = async () => {
            try {
                setError(false);
                setLoading(true);
                const { data } = await axios.get(searchUrl, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTUyZDAwMWJiZWQyNGVhMGY2ZjIyMjNkNmEzYjg3ZiIsIm5iZiI6MTcxOTU4NTAzMC40MDA4Miwic3ViIjoiNjY3ZWM3NzJmODMxN2Q2OWQ2N2RlM2U1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.BMEPlQ8uxaI6rFYlFakrcTUq2CLDLhDV5TXDZ53Je2Y',
                        accept: 'application/json'
                    },
                    params: {
                        query: params.get("filter"),
                        include_adult: false,
                        language: 'en - US',
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
        fetchCast()
    }, []);

    return (
        <>
            {isLoading && <Loader/>}
            {isError ? <p>Sorry, something went wrong.. please try again</p> : 
            <div>
            
            </div>
            }
        </>
    )
}

export default MovieCast;
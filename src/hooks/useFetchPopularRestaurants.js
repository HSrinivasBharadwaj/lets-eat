import axios from 'axios'
import { useEffect, useState } from 'react';
import { SWIGGY_URI } from '../utils/constants';

const useFetchPopularRestaurants = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const [popularRestaurants, setPopularRestaurants] = useState([]);
    useEffect(() => {
        fetchPopularRestaurants()
    }, [])
    const fetchPopularRestaurants = async () => {
        setLoading(true);
        try {
            const response = await axios.get(SWIGGY_URI);
            setPopularRestaurants(response.data.data.cards[1].card.card.gridElements.infoWithStyle);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }
    return { error, popularRestaurants, loading }

}

export default useFetchPopularRestaurants
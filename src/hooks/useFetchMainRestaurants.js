import axios from 'axios'
import { useEffect, useState } from 'react';
import { SWIGGY_URI } from '../utils/constants';

const useFetchMainRestaurants = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const [mainRestaurants, setMainRestaurants] = useState([]);
    useEffect(() => {
        fetchMainRestaurants()
    }, [])
    const fetchMainRestaurants = async () => {
        setLoading(true);
        try {
            const response = await axios.get(SWIGGY_URI);
            setMainRestaurants(response.data.data.cards[4].card.card.gridElements.infoWithStyle);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }
    return { error, mainRestaurants, loading }

}

export default useFetchMainRestaurants
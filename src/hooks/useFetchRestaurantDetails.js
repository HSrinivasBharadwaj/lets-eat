import axios from 'axios'
import { useEffect, useState } from 'react';
import { RESTAURANT_PAGE_URI } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addCategoriesData } from '../features/restaurants/restaurantSlice';

const useFetchRestaurantDetails = (id) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [offersDetails, setOffersDetails] = useState([]);
    const [restaurantDetails, setRestaurantDetails] = useState([]);
    const [popularRestaurants, setPopularRestaurants] = useState([]);
    useEffect(() => {
        fetchRestaurantDetails()
    }, [])
    const fetchRestaurantDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(RESTAURANT_PAGE_URI+id);
            setTitle(response.data.data.cards[0].card.card.text);
            setRestaurantDetails(response.data.data.cards[2].card.card.info);
            setOffersDetails(response.data.data.cards[3].card.card.gridElements.infoWithStyle)
            setPopularRestaurants(response.data.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards.slice(1,))
            dispatch(addCategoriesData(response.data.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards.slice(1)))
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }
    return { error, title, loading, restaurantDetails, offersDetails, popularRestaurants }

}

export default useFetchRestaurantDetails
import React, { useEffect, useState } from 'react'
import useFetchMainRestaurants from '../hooks/useFetchMainRestaurants'
import RestaurantCard from './RestaurantCard';
import Button from './Button';
import Shimmer from './Shimmer';
import { addRestaurantData } from '../features/restaurants/restaurantSlice';
import { useDispatch, useSelector } from 'react-redux';
import lang from "../utils/language";


const MainContainer = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");
    const getLanguages = useSelector(state => state.config.lang);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const buttonList = [
        { title: "Fast Delivery", id: 1 },
        { title: "Rating 4.0+", id: 2 },
        { title: "Rs. 300-Rs. 600", id: 3 },
        { title: "Less than Rs. 300", id: 4 }
    ]
    const { loading, error, mainRestaurants } = useFetchMainRestaurants();
    const { restaurants } = mainRestaurants;
    //initial Render display all the restaurant data
    useEffect(() => {
        if (restaurants) {
            setFilteredRestaurants(restaurants)
        } 
        dispatch(addRestaurantData({restaurants}))  
    }, [restaurants])
    if (loading || !restaurants || restaurants.length === 0) {
        return <Shimmer />
    }
    if (error) {
        return <p className='text-red-500'>{error}</p>
    }
    const changeSearchValue = (e) => {
        const inputValue = e.target.value;
        setSearchValue(inputValue);
        const filteredData = restaurants.filter(restaurant => restaurant.info.name.toLowerCase().includes(inputValue.toLowerCase()));
        setFilteredRestaurants(filteredData)
    }
    const handleClick = (title) => {
        let filterData = []
        //Logic for filtering
        switch (title) {
            case "Fast Delivery":
                filterData = restaurants.filter(restaurant => restaurant.info.sla.deliveryTime <= 25);
                setFilteredRestaurants(filterData)
                break;
            case "Rating 4.0+":
                filterData = restaurants.filter(restaurant => restaurant.info.avgRating >= 4.0);
                setFilteredRestaurants(filterData)
                break;
            case "Rs. 300-Rs. 600":
                filterData = restaurants.filter(restaurant => Number(restaurant.info.costForTwo) >= 300 && Number(restaurant.info.costForTwo) <= 600);
                setFilteredRestaurants(filterData)
                break;
            case "Less than Rs. 300":
                filterData = restaurants.filter(restaurant => Number(restaurant.info.costForTwo) < 300)
                setFilteredRestaurants(filterData)
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <h1 className="font-bold text-2xl">{lang[getLanguages].mainRestaurants}</h1>
            {/* Render the button List */}
            <div className='my-5 flex justify-evenly items-center'>
                {buttonList.map((button) => {
                    return (
                        <Button title={button.title} key={button.id} onClick={() => handleClick(button.title)} />
                    )
                })}
            </div>
            {/* Search field */}
            <div className='my-5'>
                <input
                    value={searchValue}
                    type='text'
                    placeholder='Search for restaurant...'
                    className='flex border border-gray-500 p-2 w-1/2 mx-auto rounded-lg'
                    onChange={changeSearchValue}
                />
            </div>
            <div className="flex flex-wrap mt-5">
                {filteredRestaurants.map((restaurant) => {
                    return (
                        <div key={restaurant.info.id} className='w-1/3'>
                            <RestaurantCard info={restaurant.info} />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default MainContainer
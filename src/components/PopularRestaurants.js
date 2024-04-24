import React from 'react'
import useFetchPopularRestaurants from '../hooks/useFetchPopularRestaurants'
import RestaurantCard from './RestaurantCard';
import Shimmer from './Shimmer';
import lang from "../utils/language";
import { useSelector } from "react-redux";

const PopularRestaurants = () => {
  const getLanguages = useSelector(state => state.config.lang);
  const {loading,error,popularRestaurants} = useFetchPopularRestaurants();
  const {restaurants} = popularRestaurants
  if (loading || !restaurants || restaurants.length === 0) {
    return <Shimmer />
  }
  if (error) {
    return <p className='text-red-500'>{error}</p>
  }
  return (
    <div>
      <h1 className="font-bold text-2xl">{lang[getLanguages].popularRestaurants}</h1>
      <div className="flex overflow-x-scroll mt-5">
        {restaurants.map((restaurant) => {
          return (
            <div key={restaurant.info.id} className='w-1/3'>
              <RestaurantCard  info={restaurant.info}/>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default PopularRestaurants
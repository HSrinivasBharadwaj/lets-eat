import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchRestaurantDetails from '../hooks/useFetchRestaurantDetails';
import Shimmer from './Shimmer';
import ItemCategories from './ItemCategories';



const RestaurantPage = () => {
  const params = useParams();
  const [showVegItems, setShowVegItems] = useState(false);
  const [searchFilterRestaurants, setSearchFilterRestaurants] = useState([]);
  const [searchValue, setSearchValue] = useState("")
  const { error, title, loading, restaurantDetails, offersDetails, popularRestaurants } = useFetchRestaurantDetails(params.id);
  const { offers } = offersDetails;
  if (loading || !title || !restaurantDetails || !offers || !popularRestaurants) {
    return <Shimmer />;
  }
  if (error) {
    return <p className='text-red-500'>{error}</p>;
  }

  const toggleVegItems = () => {
    setShowVegItems(!showVegItems)
  }

  const changeSearchValue = (e) => {
    const input = e.target.value;
    setSearchValue(input);
    const flattenedArray = popularRestaurants.flatMap(restaurant => restaurant.card.card.itemCards);
    const searchFilterRestaurants = flattenedArray?.filter(tests => tests?.card?.info?.name.toLowerCase().includes(searchValue.toLowerCase()));
    setSearchFilterRestaurants(searchFilterRestaurants)
  }

  return (
    <div className='px-8 md:px-16 lg:px-24 xl:px-32 py-10'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <div className='mt-6 border border-gray-300 rounded-lg p-6'>
        <div className='flex items-center mb-4'>
          <h2 className='text-lg font-bold mr-2'>{restaurantDetails.avgRating}</h2>
          <h2 className='text-lg font-bold mr-2'>({restaurantDetails.totalRatingsString})</h2>
          <h2 className='text-lg font-bold'>{restaurantDetails.costForTwoMessage}</h2>
        </div>
        <div className='mt-2'>
          <h2 className='text-lg underline text-red-400'>{restaurantDetails.cuisines.join(", ")}</h2>
        </div>
        <div className='mt-2'>
          <h2 className='text-lg mr-4'>Outlet - {restaurantDetails.areaName}</h2>
          <h2 className='text-lg'>{restaurantDetails.sla.slaString}</h2>
        </div>
        <hr className='my-2' />
        <div>
          <h2>{restaurantDetails?.sla?.lastMileTravelString} | {restaurantDetails.feeDetails?.message?.split("|")[1]}</h2>
        </div>
      </div>
      <div className='mt-6'>
        <h1 className='text-3xl font-bold my-6'>Deals for you</h1>
        <div className='flex justify-between items-center'>
          {offers.map((offer, index) => {
            return (
              <div key={index} className='border border-gray-300 rounded p-2 w-44 mr-5 h-24 text-center'>
                <div className='flex flex-col items-center '>
                  <h1 className='mb-1'>{offer.info.offerTag}</h1>
                  <p className='mb-1'>{offer.info.header}</p>
                  <p className='font-semibold'>{offer.info.couponCode}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='mt-6'>
        <h1 className='text-3xl font-bold my-6 text-center'>Menu</h1>
        <div className='my-5'>
          <button onClick={toggleVegItems} className='bg-green-500 text-white rounded-md cursor-pointer w-1/12 py-3 mx-auto'>{showVegItems ? "Show All" : "Veg"}</button>
        </div>
        <div className='my-5'>
          <input
            type='text'
            placeholder='Search for the dish...'
            className='border border-gray-300 rounded p-2 w-full'
            value={searchValue}
            onChange={changeSearchValue}
          />
        </div>
        <div className='my-5'>
          {popularRestaurants.map((categoryItems, index) => {
            return (
              <div key={index}>
                <ItemCategories category={categoryItems.card.card} vegItems={showVegItems} searchFilterRestaurants={searchFilterRestaurants} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;

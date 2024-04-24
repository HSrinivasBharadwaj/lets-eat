import React from 'react';
import Categories from './Categories';
import PopularRestaurants from './PopularRestaurants';
import MainContainer from './MainContainer';

const Body = () => {
  return (
    <main className='mx-60 mt-5 p-5'>
        <div>
            {/* Categories */}
            <Categories />
        </div>
        <hr className='my-5'/>
        <div>
          {/* Popular Restaurants */}
          <PopularRestaurants />
        </div>
        <hr className='my-5'/>
        <div>
          {/* Main Container */}
          <MainContainer />
        </div>
    </main>
  )
}

export default Body
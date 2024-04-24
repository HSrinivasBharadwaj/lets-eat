import React from 'react'
import { CATEGORIES_URI } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ info }) => {
    const navigate = useNavigate();
    const goToRestaurantPage = (id) => {
        navigate("/restaurant/"+id)
    }
    return (
        <div>
            <div className='flex flex-col justify-center' onClick={() => goToRestaurantPage(info.id)}>
                <img
                    src={CATEGORIES_URI + info.cloudinaryImageId}
                    alt={info.name}
                    className='max-w-none w-60 h-60 mt-5 cursor-pointer mr-5 rounded-lg'
                />
                <h1 className='font-bold text-lg truncate w-40 mt-1'>{info.name}</h1>
                <div className='flex items-center mt-2'>
                    <p className='text-blue-600 font-semibold mr-2'>{info.avgRating}</p>
                    <p className='text-gray-600'>{info.sla.slaString}</p>
                </div>
                <p className='text-sm text-gray-600 truncate w-40 mt-1'>{info.cuisines.join(", ")}</p>
                <p className='text-sm text-gray-600 mt-1'>{info.areaName}</p>
            </div>
        </div>

    )
}

export default RestaurantCard
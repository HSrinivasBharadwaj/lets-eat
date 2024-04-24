import React from 'react';
import { RESTAURANT_ITEMS_IMAGE_URI } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addItems } from '../features/cart/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemDetails = ({ items }) => {
  const dispatch = useDispatch();
  const addItemsToCart = (items) => {
    let quantity = 1;
    dispatch(addItems({ items, quantity }))
    toast("Item added to cart")
  }
  return (
    <div>
      <ToastContainer />
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-lg font-bold'>{items.name}</h1>
          <p className='w-[550px] mt-1 text-gray-600'>{items.description}</p>
          <p className='mt-1 font-semibold'>₹ {items.defaultPrice === undefined ? items.price / 100 : items.defaultPrice / 100} </p>
        </div>
        <div>
          <img className='w-20 h-20 cursor-pointer mt-5 rounded-md' src={RESTAURANT_ITEMS_IMAGE_URI + items.imageId} alt={items.name} />
          <button onClick={() => addItemsToCart(items)} className='bg-blue-500 text-white px-4 py-1 rounded-md mt-2'>Add</button>
        </div>
      </div>
      <hr className='my-5' />
    </div>
  )
}

export default ItemDetails
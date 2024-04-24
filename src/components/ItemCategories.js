import React, { useState } from 'react'
import ItemDetails from './ItemDetails';


const ItemCategories = ({ category,vegItems,searchFilterRestaurants }) => {
    const [showAccordion, setShowAccordion] = useState(true);
    const { itemCards } = category;
    if (!itemCards) return <div>...</div>
    const toggleAccordion = () => {
        setShowAccordion(!showAccordion)
    }
    
    const getVegItems = vegItems ? itemCards.filter(item => item?.card?.info?.isVeg === 1) : itemCards;
    const itemsToDisplay = searchFilterRestaurants.length > 0 ? searchFilterRestaurants : getVegItems;
    return (
        <div className='flex flex-col'>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-xl text-green-500'>{category.title}</h1>
                <div className='cursor-pointer text-2xl' onClick={toggleAccordion}>
                    {showAccordion ? "🔼" : "🔽"}
                </div>
            </div>
            <div className='mt-5'>
                
                {showAccordion && getVegItems && itemsToDisplay && itemsToDisplay.map((items) => {
                    return (
                        <div >
                            <ItemDetails items={items.card.info} />
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default ItemCategories
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Shimmer = () => {
    return (
        <div className='flex flex-col'>
            <Skeleton width={100} />
            <div className='mt-2 flex justify-between overflow-x-hidden'>
                {Array.from({ length: 10 }).map((_, index) => {
                    return (
                        <div key={index}>
                            <Skeleton height={200} width={200} className="mr-5" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Shimmer
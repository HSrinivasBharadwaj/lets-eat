import React from 'react';


const Button = ({ title, onClick }) => {
    return (
        <div>
            <button onClick={onClick} className='border border-gray-500 rounded-full cursor-pointer p-2'>{title}</button>
        </div>
    )
}

export default Button
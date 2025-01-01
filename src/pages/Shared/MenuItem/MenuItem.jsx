import React from 'react';

const MenuItem = ({item}) => {
    const {image, name, price, recipe}  = item
    return (
        <div className='flex space-x-3'>
            <img style={{borderRadius: '0px 200px 200px 200px'}} src={image} alt="" className='w-[100px] object-cover' />
            <div>
            <h1>{name}-----------</h1>
            <p>{recipe}</p>
            </div>
            <p className='text-yellow-500'>${price}</p>
            
        </div>
    );
};

export default MenuItem;
import React from 'react';

const FoodCard = ({item}) => {
    const {recipe, image, price, name} = item
    return (
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src={image}
            alt="Shoes" />
        </figure>
        <p className='absolute top-0 right-0 mr-4 mt-4 bg-slate-900 text-white'>${price}</p>
        <div className="card-body">
          <h2 className="font-bold text-xl text-center">
            {name}
          </h2>
          <p className='text-center my-2'>{recipe}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-outline border-0 text-blue-800 border-b-4 mt-4 border-orange-600 bg-slate-100">Add To Cart</button>
          </div>
        </div>
      </div>
    );
};

export default FoodCard;
import React from 'react';

const RecommendCard = ({item}) => {
    const {image, recipe, name} = item
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
  <figure>
    <img
      src={image}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="font-bold text-xl text-center">{name}</h2>
    <p className='text-center my-2'>{recipe}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary">Add To Cart</button>
    </div>
  </div>
</div>
    );
};

export default RecommendCard;
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { data, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';

const FoodCard = ({item}) => {
  const {recipe, image, price, name, _id} = item
  // refetch after user add cart to saved it is come from custom hook useCart 
  const [, refetch] = useCart()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const location = useLocation()
  const {user} = useAuth()
  const handleAddToCart = () => {
    // console.log(food);
    if(user && user?.email) {
      // send data to database
      const cartItem = {
        menuId: _id,
        email: user?.email,
        name,
        image,
        price
      }
      axiosSecure.post('/carts', cartItem)
      .then((res) => {
        if(res.data.insertedId){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} has been saved`,
            showConfirmButton: false,
            timer: 2000
          });
          refetch()
        }
        // after add cart update ui means navbar inbox 
       
      })
    }
    else{
      Swal.fire({
        title: "You Are Not Logged In",
        text: "Please Login For Add To The Cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!"
      }).then((result) => {
        if (result.isConfirmed) {
         navigate('/login', {state: location.pathname})
        }
      });
     
    }
  }
  
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
            <button onClick={ handleAddToCart} className="btn btn-outline border-0 text-blue-800 border-b-4 mt-4 border-orange-600 bg-slate-100">Add To Cart</button>
          </div>
        </div>
      </div>
    );
};

export default FoodCard;
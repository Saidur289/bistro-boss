import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { FaUtensils } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const image_hosting = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting}`
const UpdateItem = () => {
    const navigate = useNavigate()
    const {category, price, name, recipe, _id} = useLoaderData()
    const axiosPublic = useAxiosPublic()
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure()
    const onSubmit = async(data) => {
      console.log(data);
      // image upload to imgbb and then get an url
      const imageFile = {image: data.image[0]}
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
  
      })
      // send data to database
      if(res.data.success){
          const menuItem = {
              name: data?.name,
              category: data?.category,
              price: parseFloat(data?.price),
              recipe: data?.recipe,
              image: res.data.data.display_url
          }
          const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
          if(menuRes.data.modifiedCount> 0){
              reset()
              Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `Your ${data.name}  has been saved`,
                  showConfirmButton: false,
                  timer: 1500
                });
                navigate('/dashboard/manageItems')
                 
          }
      }
      // console.log(res.data);
    };
    return (
        <div>
            <SectionTitle heading={'update an item'} subHeading={'Refresh Info'}>

            </SectionTitle>
             <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        
          <div className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Recipe Name</span>
            
            </div>
            <input
              type="text"
              defaultValue={recipe}
              placeholder="Recipe Name"
              {...register("name", { required: true })}
              className="input input-bordered w-full "
            />
          </div>
          <div className="md:flex gap-6">
                    {/*category  */}
                    <div className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Name</span>
            
            </div>
            <select

            defaultValue={category}
            {...register("category", { required: true })}
            className="select select-bordered w-full"
          >
            <option disabled value="default">
              Select A Category
            </option>
            <option value="salad">Salad</option>
            <option value="pizza">Pizza</option>
            <option value="soup">Soup</option>
            <option value="Dessert">Dessert</option>
            <option value="drinks">Drinks</option>
          </select>
          </div>
                
         
          {/* price */}
          <div className="form-control w-full">
            <div className="label">
              <span className="label-text">Price</span>
            
            </div>
            <input
              type="number"
              defaultValue={price}
              placeholder="Price"
              {...register("price", { required: true })}
              className="input input-bordered w-full "
            />
          </div>
          </div>
          <div className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Details</span>
             
            </div>
            <textarea defaultValue={recipe}  {...register("recipe", { required: true })} className="textarea textarea-primary" placeholder="Recipe Details"></textarea>
          </div>
          
          <div className="form-control w-full my-6">
          <input type="file" {...register('image', {required: true})} className="file-input w-full max-w-xs" />
          </div>
          <button className="btn">Update Items</button>
         
        </form>
      </div>
        </div>
    );
};

export default UpdateItem;
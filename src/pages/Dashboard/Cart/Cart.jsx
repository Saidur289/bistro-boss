import { FaTrash } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();
  const total = cart.reduce((pre, curr) => pre + curr.price, 0);
  const axiosSecure = useAxiosSecure()
  const handleDeleteCart = id => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
       
          axiosSecure.delete(`/carts/${id}`)
          .then((res) => {
            refetch()
            if(res.data.deletedCount>0){
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
            }
          })
        }
      });
  }
  return (
    <div>
      <div className="flex justify-evenly mb-8">
        <h1 className="text-4xl">Items: {cart.length}</h1>
        <h1 className="text-4xl">Total Price: {total}</h1>
        {
          cart.length? <Link to = '/dashboard/payment'> <button className="btn btn-primary">Pay</button></Link>:  <button disabled className="btn btn-primary">Pay</button>
        }
       
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
               #
              </th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
                cart.map((item, index) =>  <tr key={index}>
                <th>
                  {index + 1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                 {item.name}
                 
                </td>
                <td>${item.price}</td>
                <th>
                  <button onClick={() => handleDeleteCart(item._id)} className="btn btn-ghost btn-xs"><FaTrash className="text-red-500"></FaTrash></button>
                </th>
              </tr>)
            }
           
           
          </tbody>
         
        

        </table>
      </div>
    </div>
  );
};

export default Cart;

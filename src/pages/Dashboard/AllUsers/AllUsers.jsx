import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrash, FaUsers } from "react-icons/fa";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });
  //   console.log(users);
  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then((res) => {
          refetch();
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleAdminRole = (id) => {
     axiosSecure.patch(`/users/admin/${id}`)
     .then((res) => {
        refetch()
        if(res.data.modifiedCount>0){
           Swal.fire(`Your Role Updated Successfully`)
        }
     })
  };
  return (
    <div>
      <div className="flex justify-evenly">
        <h1 className="text-3xl font-bold">All Users</h1>
        <h1 className="text-3xl font-bold">Total Users :{users.length}</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={index} className="bg-base-200">
                <th>{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>
                 {
                    user?.role === 'admin'? 'Admin':  <button
                    onClick={() => handleAdminRole(user._id)}
                    className="btn btn-ghost btn-xs"
                  >
                    <FaUsers className= "text-orange-500 text-2xl "></FaUsers>
                  </button>
                 }
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="btn btn-ghost btn-xs"
                  >
                    <FaTrash className="text-red-500 text-2xl"></FaTrash>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;

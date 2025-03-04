import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
import Loading from "../Loading/Loading";

const Navbar = () => {
  const { user, handleSignOut } = useContext(AuthContext);
  const [isAdmin,isAdminLoading] =  useAdmin()
  // cart data from custom hook useCart
  const [cart]  = useCart()
  // if(isAdminLoading) return <Loading></Loading>
  const handleLogOut = () => {
    handleSignOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  const links = (
    <>
      <li className="uppercase">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="uppercase">
        <NavLink to="/menu">Our Menu</NavLink>
      </li>
      <li className="uppercase">
        <NavLink to="/order/salad">Our Shop</NavLink>
      </li>
      {
        user && isAdmin &&  <li className="uppercase">
        <NavLink to="/dashboard/adminHome">DashBoard</NavLink>
      </li>
      }
      {
        user && !isAdmin &&  <li className="uppercase">
        <NavLink to="/dashboard/userHome">DashBoard</NavLink>
      </li>
      }
      <li className="uppercase">
        <NavLink to="/dashboard/cart">
          <button className="flex items-center gap-1">
            <FaShoppingCart className="mr-2"></FaShoppingCart>
            <div className="badge badge-secondary">+{cart.length}</div>
          </button>
        </NavLink>
      </li>
      {user ? (
        <button onClick={handleLogOut} className="">
          Log Out
        </button>
      ) : (
        <li className="uppercase">
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
    </>
  );
  return (
    <>
      <div className="navbar max-w-screen-xl fixed z-10 bg-opacity-30  bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;

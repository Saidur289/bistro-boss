import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
  const axiosPublic = useAxiosPublic()
  const { handleSignUp, updateUser } = useContext(AuthContext);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data)
    handleSignUp(data.email, data.password).then((result) => {    
      // create object for update profile 
      const updatedData = {
        displayName: data.name,
        photoURL: data.photo
      }
      // update user function
      updateUser(updatedData)
      .then(() => {
        // create user than save to database
        const userInfo = {
          name: data?.name,
          email: data?.email
        }
        axiosPublic.post('/users', userInfo)
        .then(res => {
          if(res.data.insertedId){
            reset()
            Swal.fire('user sign up successfully')
            navigate('/')
          }
        })
      })
     
    });
  };
  return (
    <>
    <Helmet>
        <title>Bistro Boss | Sign Up</title>
    </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
                {errors.name?.type && <span>This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="url"
                  name="photo"
                  {...register("photo", { required: true })}
                  placeholder="Name"
                  className="input input-bordered"
                  
                />
                {errors.photo?.type && <span>This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email?.type && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                      message:
                        "Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
                    },
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Sign UP"
                />
              </div>
            </form>
            <p className="p-3 text-xs text-center">
              Already Have An Account?{" "}
              <Link to="/login" className="text-red-700 font-bold">
                Login
              </Link>{" "}
            </p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

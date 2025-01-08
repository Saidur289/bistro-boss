import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha'
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
   const {handleSingIn} = useContext(AuthContext)
    const [disabled, setDisabled] = useState(true)
    const handleLogin = e => {
        e.preventDefault()
        const form = e.target 
        const email = form.email.value 
        const password = form.password.value 
        handleSingIn(email, password)
        .then((result) => {
          console.log(result.user);
          Swal.fire('user sing in successfully')
        });
        navigate(location?.state? location?.state: '/')

    }
    useEffect(() => {
        loadCaptchaEnginge(6); 
    }, [])
    const handleValidCaptcha = e => {
    const value = e.target.value 
    // console.log(value);
    if(validateCaptcha(value)){
        setDisabled(false)
    }
    else{
        setDisabled(true)
    }
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card  w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                <LoadCanvasTemplate />
                </label>
                <input type="text" onBlur={handleValidCaptcha} name='captcha' placeholder="Type the captcha" className="input input-bordered" required />
               
              </div>
              <div className="form-control mt-6">
                <input type="submit" disabled = {disabled} value="Login" className='btn text-white btn-primary' />
              </div>
            </form>
            <p className='p-3 text-xs text-center'>Do Not Have An Account? <Link to = '/signup' className='text-red-700 font-bold'>Sign Up</Link> </p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    );
};

export default Login;
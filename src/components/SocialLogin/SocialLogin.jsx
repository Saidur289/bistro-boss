import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const { handleLoginGoogle} = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const handleGoogle = () => {
        handleLoginGoogle()
        .then((res) => {
            const userInfo = {
                name: res?.user?.displayName,
                email: res?.user?.email
            }
          axiosPublic.post('/users', userInfo)
          .then((res) => {
            navigate('/')
          })
        })
    }
    return (
        <div className="my-3">
            <div className="divider"></div>
           <button onClick={handleGoogle} className="btn btn-wide bg-blue-500 text-white"><FaGoogle className="mr-2"></FaGoogle>Login With Google</button> 
        </div>
    );
};

export default SocialLogin;
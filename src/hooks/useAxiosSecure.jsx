import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useEffect } from "react";

 const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
 })
const useAxiosSecure = () => {
  const navigate = useNavigate()
  const { handleSignOut} = useAuth()
  useEffect(() => {
    axiosSecure.interceptors.response.use(res => {
      return res 
    }, async error => {
      console.log('Error caught from insterceptors');
      if(error.response.status === 401 || error.response.status === 403){
        // logout
        handleSignOut()
        navigate('/login')
      }
      return Promise.reject(error)
    })
  }, [handleSignOut, navigate])
  return axiosSecure

};

export default useAxiosSecure;
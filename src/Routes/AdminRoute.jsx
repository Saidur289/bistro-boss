import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loading from "../pages/Shared/Loading/Loading";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({children}) => {
    const [isAdmin, isAdminLoading] = useAdmin()
    const {user, loading} = useAuth()
    const location = useLocation()
    if(loading || isAdminLoading){
        return <Loading></Loading>
    }
    if(user && isAdmin){
        return children
    }
    return (
        <Navigate state={location.pathname} to = '/'></Navigate>
    );
};

export default AdminRoute;
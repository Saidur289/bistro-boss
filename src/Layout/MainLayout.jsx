import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";


const MainLayout = () => {
    const location = useLocation()
    const headerFooter = location.pathname.includes('login') || location.pathname.includes('signup')
    return (
        <div>
           {headerFooter ||  <Navbar></Navbar>}
            <Outlet></Outlet>
           {headerFooter || <Footer></Footer>}
        </div>
    );
};

export default MainLayout;
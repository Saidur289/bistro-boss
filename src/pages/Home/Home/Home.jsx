import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import PopularMenu from "../PopularMenu/PopularMenu";
import Recommend from "../Recommend/Recommend";
import Service from "../Service/Service";
import Category from "./Category/Category";
import Featured from "./Featured/Featured";
import Testimonials from "./Testmonials/Testimonials";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testimonials></Testimonials>
            <Service></Service>
            <Recommend></Recommend>
        </div>
    );
};

export default Home;
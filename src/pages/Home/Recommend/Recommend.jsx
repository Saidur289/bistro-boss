
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import RecommendCard from "../../Shared/RecommendCard/RecommendCard";
import useMenu from "../../../hooks/useMenu";


const Recommend = () => {
     const [menu] = useMenu()
     
    return (
        <section className="my-20">
            <SectionTitle heading={'CHEF RECOMMENDS'} subHeading={'Should Try'}></SectionTitle>
            <div className="grid md:grid-cols-3 gap-5">
                {
                    menu.slice(0, 3).map((item) =><RecommendCard key={item._id} item={item}></RecommendCard> )
                }
            </div>
        </section>
    );
};

export default Recommend;
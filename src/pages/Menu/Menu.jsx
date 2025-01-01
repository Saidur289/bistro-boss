import { Helmet } from 'react-helmet-async';
import bannerImg from '../../assets/menu/banner3.jpg'
import Cover from '../Shared/Cover/Cover';
import useMenu from '../../hooks/useMenu';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import MenuCategory from '../Shared/MenuCategory/MenuCategory';
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import soapImg from '../../assets/menu/soup-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'

const Menu = () => {
    const [menu] = useMenu()
    const salad = menu.filter((item) => item.category === 'salad')
    const desserts = menu.filter((item) => item.category === 'dessert')
    const pizza = menu.filter((item) => item.category === 'pizza')
    const offered = menu.filter((item) => item.category === 'offered')
    const soup = menu.filter((item) => item.category === 'soup')
    return (
        <div>
            <Helmet>
                <title>BistroBoss | Menu</title>
            </Helmet>
           <Cover img={bannerImg} title={'Our Menu'}></Cover>
           <SectionTitle subHeading='Don Not Miss' heading='Today Offer'></SectionTitle>
           {/* offered card */}
           <MenuCategory items={offered}></MenuCategory>
            {/* dessert menu */}
            <MenuCategory items={desserts} title='dessert' img={dessertImg}></MenuCategory>
            {/* pizza menu */}
            <MenuCategory items={pizza} title='pizza' img={pizzaImg}></MenuCategory>
            {/* soup menu */}
            <MenuCategory items={soup} title={'soup'} img={soapImg}></MenuCategory>
            {/* salad  menu*/}
            <MenuCategory items={salad} title={'salad'} img={saladImg}></MenuCategory>
        </div>
    );
};

export default Menu;
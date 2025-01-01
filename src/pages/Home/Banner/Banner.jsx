import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import img1 from '../../../assets/home/01.jpg'
import img2 from '../../../assets/home/02.jpg'
import img3 from '../../../assets/home/03.png'
import img4 from '../../../assets/home/04.jpg'
import img5 from '../../../assets/home/05.png'
import img6 from '../../../assets/home/06.png'


const Banner = () => {
    return (
        <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={50}
        totalSlides={6}
        className="relative"
    >
      <Slider>
        <Slide index={0}>
            <img src={img1}     className="w-full" alt="" />
        </Slide>
        <Slide index={1}>
            <img src={img2}    className="w-full" alt="" />
        </Slide>
        <Slide index={2}>
            <img src={img3}    className="w-full" alt="" />
        </Slide>
        <Slide index={2}>
            <img src={img4}    className="w-full" alt="" />
        </Slide>
        <Slide index={2}>
            <img src={img5}    className="w-full" alt="" />
        </Slide>
        <Slide index={2}>
            <img src={img6}    className="w-full" alt="" />
        </Slide>
      </Slider>
      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
        <ButtonBack className="px-4 py-2 bg-blue-500 text-white rounded">Back</ButtonBack>
        <ButtonNext className="px-4 py-2 bg-blue-500 text-white rounded">Next</ButtonNext>
      </div>
    </CarouselProvider>
    );
};

export default Banner;
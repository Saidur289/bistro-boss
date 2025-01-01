import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const Testimonials = () => {
    const [reviews, setReview] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
        .then((res) => res.json())
        .then((data) => setReview(data))
    }, [])

    return (
        <div className='my-20'>
            <SectionTitle heading={'Testimonials'} subHeading={'What Our Client Say'}></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        
       {
        reviews.map((review) => <SwiperSlide key={review._id}>
            <div className='m-24 flex flex-col items-center justify-center text-center'>
            <Rating style={{ maxWidth: 250 }} value={review.rating}  />
                <p className='mt-4'>{review.details}</p>
                <p className='text-2xl text-orange-500'>{review.name}</p>
            </div>
        </SwiperSlide>)
       }
        
      </Swiper>
        </div>
    );
};

export default Testimonials;
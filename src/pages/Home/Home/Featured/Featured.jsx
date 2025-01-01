import React from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import featuredImg from '../../../../assets/home/featured.jpg'
import './Featured.css'
const Featured = () => {
    return (
        <div className='featured-item bg-fixed text-white pt-8 my-20'>
            <SectionTitle subHeading={'check it out'} heading={'Feature Item'}>

            </SectionTitle>
            <div className='md:flex justify-center items-center pb-20 pt-12 px-36 bg-opacity-60 bg-slate-400'>
                <div>
                <img src={featuredImg} alt="" />
                </div>
                <div className='md:ml-10'>
                <p>Aug 20, 2026</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis perferendis minus excepturi eius mollitia distinctio, quod sunt qui illum nam nesciunt laborum id sit exercitationem consectetur ab nobis est aspernatur incidunt! Vel voluptatibus autem cupiditate iure repellendus, voluptates in neque ex reprehenderit ipsum repudiandae velit deleniti necessitatibus tempore beatae exercitationem.</p>
                <button className='btn btn-outline border-0 text-white border-b-4 mt-4'>Order Now</button>

            </div>
            </div>
           
        </div>
    );
};

export default Featured;
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './MainSlider.module.css';
import slider1 from '../../assets/images/slider-image-3.jpeg'
import slider2 from '../../assets/images/slider-image-1.jpeg'
import slider3 from '../../assets/images/slider-image-2.jpeg'
import slider4 from '../../assets/images/grocery-banner.png'
import slider5 from '../../assets/images/grocery-banner-2.jpeg'

import Slider from 'react-slick';


export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows:false
    };


    let [count, setCount] = useState(0)
    useEffect(() => { }, [])
    return (
        <div className="flex flex-wrap items-center justify-center py-5">
            <div className="w-3/4">
                <Slider {...settings}>
                    <img src={slider1} className='w-full h-[400px]' />
                    <img src={slider4} className='w-full h-[400px]' />
                    <img src={slider5} className='w-full h-[400px]' />
                </Slider>

            </div>
            <div className="w-1/4">
                <img src={slider2} className='w-full h-[200px]' />
                <img src={slider3} className='w-full h-[200px]' />

            </div>
        </div>
    )
}

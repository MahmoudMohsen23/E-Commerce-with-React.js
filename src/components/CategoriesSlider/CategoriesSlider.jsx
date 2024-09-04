import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './CategoriesSlider.module.css';
import Slider from "react-slick";
import axios from 'axios';
import { ScaleLoader } from 'react-spinners';

export default function CategoriesSlider() {
    let [count, setCount] = useState(0)
    const [categories, setCategories] = useState([])
    const [loadingScreen, setloadingScreen] = useState(true)

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true
    };

    async function getCategories() {

        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            console.log(data.data);
            setCategories(data.data)
            setloadingScreen(false)


        } catch (error) {
            console.log(error);
            setloadingScreen(false)

        }
    }

    useEffect(() => {
        getCategories()
    }, [])
    return (
        <>

            {loadingScreen ? <div className='flex justify-center items-center w-full'>
                <ScaleLoader color='#0aad0a' />
            </div> : <div className='py-5'>
                <h2 className='py-3 text-gray-800 font-semibold text-xl'> Shop Popular Categories</h2>
                <Slider {...settings}>
                    {categories.map((category) =>
                        <div key={category._id}>
                            <img src={category.image} alt={category.name} className='h-[200px] w-full' />
                            <h3 className='font-light mt-2'>{category.name}</h3>
                        </div>)}
                </Slider>
            </div>}

        </>
    )
}

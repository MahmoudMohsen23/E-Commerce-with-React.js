import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Categories.module.css';
import axios from 'axios';
import logo from '../../assets/images/slider-2.jpeg'
import { Link } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';

export default function Categories() {
    let [count, setCount] = useState(0)
    const [loadingScreen, setloadingScreen] = useState(true)

    useEffect(() => {
        getCategories()
    }, [])

    const [categories, setCategories] = useState([])

    async function getCategories() {
        try {
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            console.log(data.data);
            setCategories(data.data)
            setloadingScreen(false)

        } catch (error) {
            console.log(error);
            setloadingScreen(false)

        }
    }
    return (
        <>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
            </Helmet>
            {loadingScreen ? <div className='flex justify-center items-center w-full h-screen'>
                <PacmanLoader color='#0aad0a' /></div> : <div className="grid grid-cols-3 pt-8 gap-8 ">
                {categories.map((category) => <div key={category._id} className="card border-[1px] border-gray-400 rounded-md cursor-pointer overflow-hidden">
                    <Link to={`/categoriesdetails/${category._id}`}>
                        <div className="card-im h-[350px]">
                            <img src={category.image} className='w-full h-full object-cover' alt={category.name} />
                        </div>
                        <div className="card-body">
                            <h2 className='text-center text-[25px] font-semibold p-4 '>{category.name}</h2>
                        </div>
                    </Link>
                </div>)}
            </div>}

        </>
    )
}

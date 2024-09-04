import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Brands.module.css';
import axios from 'axios';
import { PropagateLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';

export default function Brands() {
    let [count, setCount] = useState(0)
    useEffect(() => {
        getBrands()
    }, [])

    const [brands, setBrands] = useState([])
    const [loadingScreen, setloadingScreen] = useState(true)

    async function getBrands() {
        try {
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
            console.log(data.data);
            setBrands(data.data)
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
                <title>Brands</title>
            </Helmet>

            {loadingScreen ? <div className='flex justify-center items-center w-full h-screen'>
                <PropagateLoader color='#0aad0a' /></div> : <div className="grid grid-cols-4 pt-8 gap-8 ">
                {brands.map((brand) => <div className="card border-[1px] border-gray-400 rounded-md cursor-pointer overflow-hidden">
                    <div className="card-im h-[200px]">
                        <img src={brand.image} className='w-full h-full object-cover' alt={brand.name} />
                    </div>
                    <div className="card-body">
                        <h2 className='text-center text-[20px]  p-4 '>{brand.name}</h2>
                    </div>
                </div>)}
            </div>
            }


        </>
    )
}

import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './CategoriesDetails.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PacmanLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';


export default function RecentProducts() {



    const [recentProducts, setRecentProducts] = useState([])
    const [loadingScreen, setloadingScreen] = useState(true)
    let { id } = useParams()
    console.log(id);


    async function getRecentProducts() {
        try {
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
            setRecentProducts(data.data)
            setloadingScreen(false)


        } catch (error) {
            console.log(error);
            setloadingScreen(false)

        }
    }

    useEffect(() => {
        getRecentProducts()
    }, [])

    return (
        <>



{loadingScreen ? (
    <div className='flex justify-center items-center w-full h-screen'>
        <PacmanLoader color='#0aad0a' />
    </div>
) : (
    <>
        {recentProducts.filter((product) => product.category._id == id).length > 0 ? (
            <div className="grid grid-cols-6 gap-4 lg:py-8">
                {recentProducts.filter((product) => product.category._id == id).map((product) => (
                    <div key={product.id} className='product overflow-hidden px-2'>
                        <Link to={`/productdetails/${product.id}/${product.category.name}`} >
                            <Helmet>
                                <meta charSet="utf-8" />
                                <title>{product.category.name}</title>
                            </Helmet>
                            <img src={product.imageCover} className='w-full' alt={product.title} />
                            <h2 className='text-[--main-color] text-[14px]'>{product.category.name}</h2>
                            <span className='text-[16px] font-bold'>{product.title.split(' ').splice(0, 2).join()}</span>
                            <div className='flex justify-between text-[13px] mt-2'>
                                <span>{product.price} EGP</span>
                                <span> <i className='fa fa-star text-yellow-300'></i> {product.ratingsAverage}</span>
                            </div>
                            <div className='w-full mt-1 mb-1'>
                                <button className='btn bg-green-700  hover:bg-lime-500  text-white w-full rounded-md p-1 '>Add To Cart</button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        ) : (
            <div className='h-screen w-full flex justify-center items-center'>
                <p className='text-2xl font-semibold text-white p-3 bg-red-600 rounded-xl'>No products available in this category.</p>
            </div>
        )}
    </>
)}



        </>
    )
}

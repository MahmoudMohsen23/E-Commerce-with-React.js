import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './ProductDetails.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import { RingLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';


export default function ProductDetails() {

    let { id, category } = useParams()
    const [productDetails, setProductDetails] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentProductId, setCurrentProductId] = useState(0)
    let { addProductToCart, setCartItemsNo, cartItemsNo } = useContext(CartContext)
    const [loadingScreen, setloadingScreen] = useState(true)


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


    async function addProduct(productId) {
        setCurrentProductId(productId)
        setIsLoading(true)
        let response = await addProductToCart(productId)
        if (response.data.status === 'success') {
            setIsLoading(false)
            let newCartItemsNo = cartItemsNo + 1
            setCartItemsNo(newCartItemsNo)

            toast.success(response.data.message, {
                duration: 2000,
                position: 'top-center',
            })
        } else {
            setIsLoading(false)
            toast.error(response.data.message, {
                duration: 1000,
                position: 'top-center',
            })
        }

    }

    async function getProductDetails(id) {

        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            console.log(data.data);
            setProductDetails(data.data)
            setloadingScreen(false)


        } catch (error) {
            console.log(error);
            setloadingScreen(false)

        }
    }

    async function getRelatedProducts(category) {

        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            console.log(data.data);
            let allProducts = data.data
            let related = allProducts.filter((product) => product.category.name == category)
            setRelatedProducts(related)
            setloadingScreen(false)

        } catch (error) {
            console.log(error);
            setloadingScreen(false)

        }
    }


    useEffect(() => {
        getProductDetails(id)
        getRelatedProducts(category)
    }, [id, category])


    return (
        <>

            {loadingScreen ? <div className='flex justify-center items-center w-full h-screen '>
                <RingLoader color='#0aad0a' />
            </div> : <div className="flex justify-center items-center gap-5 pt-11">
                <div className='w-1/4'>
                    <Slider {...settings}>
                        {productDetails?.images.map((image) => <img key={productDetails.id} className='w-full' src={image} alt={productDetails?.title} />
                        )}

                        <Helmet>
                            <meta charSet="utf-8" />
                            <title>{productDetails?.title}</title>
                        </Helmet>
                    </Slider>
                </div>

                <div className='w-2/4'>
                    <h1 className='text-[18px] font-semibold text-gray-950'>{productDetails?.title}</h1>
                    <p className='mb-3 text-gray-500 mt-3 font-light'>{productDetails?.description}</p>
                    <span className='text-[15px] text-gray-700'>{productDetails?.category.name}</span>

                    <div className='flex justify-between text-[13px] mt-1'>
                        <span>{productDetails?.price} EGP</span>
                        <span> <i className='fa fa-star text-yellow-300'></i> {productDetails?.ratingsAverage}</span>
                    </div>
                    <div className='w-full mt-1 mb-1'>
                        <button onClick={() => addProduct(productDetails.id)} className='btn bg-green-700 hover:bg-lime-500 text-white w-full rounded-md p-1 '>
                            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}
                        </button>
                    </div>
                </div>
            </div>}

            {loadingScreen ? <div className='flex justify-center items-center w-full  h-screen'>
                <RingLoader color='#0aad0a' />
            </div> : <><RelatedProducts products={relatedProducts} /></>}

        </>
    )
}

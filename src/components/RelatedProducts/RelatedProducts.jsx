import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './RelatedProducts.module.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { WishListContext } from '../../Context/WishListContext';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';

export default function RelatedProducts({ products }) {
    const [currentProductId, setCurrentProductId] = useState(0)
    let { addProductToCart, setCart, setCartItemsNo, cartItemsNo } = useContext(CartContext)
    const [isLoading, setIsLoading] = useState(false)


    let [count, setCount] = useState(0)
    let { setWishList, addToWishList, wishListCount, setWishListCount } = useContext(WishListContext)

    async function addWish(productId) {
        let response = await addToWishList(productId)
        console.log(response);
        if (response.data.status === 'success') {
            let newWishListCount = wishListCount + 1
            setWishListCount(newWishListCount)
            setWishList(response.data.data)
            toast.success(response.data.message, {
                duration: 2000,
                position: 'top-center',
            })
        } else {
            toast.error(response.data.message, {
                duration: 1000,
                position: 'top-center',
            })
        }

    }

    async function addProduct(productId) {
        setCurrentProductId(productId)
        setIsLoading(true)
        let response = await addProductToCart(productId)
        if (response?.data?.status === 'success') {
            let newCartItemsNo = cartItemsNo + 1
            setCartItemsNo(newCartItemsNo)
            setIsLoading(false)
            setCart(response.data)

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

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        arrows: false
    };
    useEffect(() => { }, [])
    return (
        <>
            <div className='mt-10  mx-auto'>

                <Slider {...settings}>
                    {products.map((product) => <div key={product.id} className='product overflow-hidden px-2 relative'>
                        <div onClick={() => addWish(product.id)} className={` cursor-pointer text-2xl absolute left-[15px] `}><i className="fa-solid fa-heart special"></i></div>
                        <div className="p-4">
                            <Link to={`/productdetails/${product.id}/${product.category.name}`} >
                                <img src={product.imageCover} className='w-full' alt={product.title} />
                                <h2 className='text-[--main-color] text-[14px]'>{product.category.name}</h2>
                                <span className='text-[16px] font-bold'>{product.title.split(' ').splice(0, 2).join()}</span>
                                <div className='flex justify-between text-[13px] mt-2'>
                                    <span>{product.price} EGP</span>
                                    <span> <i className='fa fa-star text-yellow-300'></i> {product.ratingsAverage}</span>
                                </div>
                                <div className='w-full mt-1 mb-1'>
                                    <button onClick={() => addProduct(product.id)} className='btn bg-green-700 text-white w-full rounded-md p-1 '>
                                        {currentProductId === product.id && isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}
                                    </button>
                                </div>
                            </Link>
                        </div>
                    </div>)}
                </Slider>


            </div>

        </>)
}

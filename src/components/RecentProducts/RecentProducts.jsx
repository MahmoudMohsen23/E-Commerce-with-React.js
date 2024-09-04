
import { useContext, useState } from 'react'
import { useEffect } from 'react'
import styles from './RecentProducts.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';
import { SyncLoader } from 'react-spinners';

export default function RecentProducts() {

    const [recentProducts, setRecentProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentProductId, setCurrentProductId] = useState(0)
    const [loadingScreen, setloadingScreen] = useState(true)

    let { addProductToCart, setCart, setCartItemsNo, cartItemsNo } = useContext(CartContext)
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

            {loadingScreen ? <div className='flex justify-center items-center w-full h-screen'>
                <SyncLoader color='#0aad0a' />
            </div> : <div className="grid grid-cols-6 gap-4 lg:py-8">
                {recentProducts.map((product) => <div key={product.id} className='product overflow-hidden px-2 relative'>
                    <div onClick={() => addWish(product.id)} className={` cursor-pointer text-2xl position-absolute `}><i className="fa-solid fa-heart special"></i></div>
                    <Link to={`/productdetails/${product.id}/${product.category.name}`} >
                        <img src={product.imageCover} className='w-full' alt={product.title} />
                        <h2 className='text-[--main-color] text-[14px]'>{product.category.name}</h2>
                        <span className='text-[16px] font-bold'>{product.title.split(' ').splice(0, 2).join()}</span>
                        <div className='flex justify-between text-[13px] mt-2'>
                            <span>{product.price} EGP</span>
                            <span> <i className='fa fa-star text-yellow-300'></i> {product.ratingsAverage}</span>
                        </div>
                    </Link>
                    <div className='w-full mt-1 mb-1'>
                        <button onClick={() => addProduct(product.id)} className='btn bg-green-700 hover:bg-lime-500 text-white w-full rounded-md p-1 '>
                            {currentProductId === product.id && isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}</button>
                    </div>
                </div>)}
            </div >}

        </>
    )
}

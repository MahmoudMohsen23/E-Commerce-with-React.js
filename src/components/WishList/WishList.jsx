import React, { useContext, useState, useEffect } from 'react';
import styles from './WishList.module.css';
import { WishListContext } from '../../Context/WishListContext';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { GridLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';

export default function WishList() {
    const [wishDetails, setWishDetails] = useState([]);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingScreen, setloadingScreen] = useState(true);

    const { getLoggedUserWishList, setWishList, removeProductFromWishList, wishListCount, setWishListCount } = useContext(WishListContext);
    const { addProductToCart, setCart, setCartItemsNo, cartItemsNo } = useContext(CartContext);

    // Add product to cart
    async function addProduct(productId) {
        setCurrentProductId(productId);
        setIsLoading(true);
        try {
            let response = await addProductToCart(productId);
            if (response.data.status === 'success') {
                setCart(response.data);
                let newCartItemsNo = cartItemsNo + 1;
                setCartItemsNo(newCartItemsNo);
                toast.success(response.data.message, {
                    duration: 2000,
                    position: 'top-center',
                });
            } else {
                toast.error(response.data.message, {
                    duration: 1000,
                    position: 'top-center',
                });
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        } finally {
            setIsLoading(false);
            setCurrentProductId(null);
        }
    }

    // Get wish details
    async function getWishDetails() {
        try {
            let response = await getLoggedUserWishList();
            setWishListCount(response.data.count);
            setWishDetails(response.data.data);
            setloadingScreen(false);
        } catch (error) {
            console.error('Error fetching wish list:', error);
            setloadingScreen(false);
        }
    }

    // Remove item from wish list
    async function removeItem(productId) {
        try {
            let response = await removeProductFromWishList(productId);
            console.log(response);
            if (response.data.status === 'success') {
                // Filter out the removed item from the state
                const updatedWishDetails = wishDetails.filter(item => item._id !== productId);
                setWishDetails(updatedWishDetails);
                setWishListCount(response.data.data.length);
                setWishList(updatedWishDetails); // Update the context with the new wishlist
                toast.success('Item removed successfully!', {
                    duration: 2000,
                    position: 'top-center',
                });
            } else {
                toast.error('Failed to remove item!', {
                    duration: 2000,
                    position: 'top-center',
                });
            }
        } catch (error) {
            console.error('Error removing item:', error);
            toast.error('Failed to remove item!', {
                duration: 2000,
                position: 'top-center',
            });
        }
    }

    useEffect(() => {
        getWishDetails(); // Fetch the wish list details on component mount
    }, []);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Wish List</title>
            </Helmet>
            {loadingScreen ? (
                <div className='flex justify-center items-center w-full h-screen'>
                    <GridLoader color='#0aad0a' />
                </div>
            ) : (
                <div className="container mx-auto pt-5 my-5">
                    <div className="flex justify-between">
                        <div className="font-bold px-1 text-3xl text-[--main-color]"><h2>My Wish List</h2></div>
                        <div className="font-bold px-1">Total number of items: <span className="font-semibold text-[--main-color]">{wishDetails.length}</span></div>
                    </div>

                    {wishDetails.length === 0 ? (
                        <div className='h-screen w-full flex justify-center items-center'>
                            <p className="bg-red-600 text-white p-3 rounded-xl text-2xl">No items in your wishlist.</p>

                        </div>
                    ) : (
                        wishDetails.map((wishProduct) => (
                            <div key={wishProduct._id} className="shadow-md rounded-lg my-3">
                                <div className="flex justify-between items-center">
                                    <div className="w-1/4">
                                        <div className="grid grid-cols-2 gap-5 items-center">
                                            {/* Check if the image is available */}
                                            {wishProduct.imageCover ? (
                                                <img className="w-full my-4 mx-4" src={wishProduct.imageCover} alt={wishProduct.title} />
                                            ) : (
                                                <p className="text-red-500">Image not available</p>
                                            )}
                                            <div className='mx-5'>
                                                <h3 className="font-semibold">{wishProduct.title}</h3>
                                                <p className="pt-2">Price: <span className="text-[--main-color]">{wishProduct.price}</span></p>
                                                <button onClick={() => removeItem(wishProduct._id)} className="text-red-600 mt-3">
                                                    <i className="fa-solid fa-trash text-red-600"></i> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="me-16">
                                        <div>
                                            <button onClick={() => addProduct(wishProduct.id)} className="bg-green-600 hover:bg-[--main-color] duration-500 px-4 py-2 rounded-md text-white">
                                                {isLoading && currentProductId === wishProduct.id ? (
                                                    <i className="fas fa-spinner fa-spin"></i>
                                                ) : (
                                                    <>
                                                        <i className="fa-solid fa-plus"></i> Add To Cart
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </>
    );
}

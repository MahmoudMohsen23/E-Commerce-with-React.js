import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GridLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';

export default function Cart() {
    let { getLoggedUserCart, updateCartItemCount, deleteProductItem, clearCart, setCart, setCartItemsNo } = useContext(CartContext);
    const [cartDetails, setCartDetails] = useState(null);
    const [loadingPlusButtonId, setLoadingPlusButtonId] = useState(null); // Track loading state for plus button
    const [loadingMinusButtonId, setLoadingMinusButtonId] = useState(null); // Track loading state for minus button
    const [isClear, setisClear] = useState(false); // \
    const [loadingScreen, setloadingScreen] = useState(true)
    let navigate = useNavigate();

    async function getCartItems() {
        let response = await getLoggedUserCart();
        console.log(response);
        setCartItemsNo(response.data.numOfCartItems)
        setCartDetails(response.data.data);
        setloadingScreen(false)

    }

    async function updateCartCount(productId, count, action) {
        if (count === 0) return;

        if (action === 'plus') {
            setLoadingPlusButtonId(productId); // Set loading state for the plus button
        } else {
            setLoadingMinusButtonId(productId); // Set loading state for the minus button
        }

        let response = await updateCartItemCount(productId, count);
        console.log(response.data.data);
        setCartDetails(response.data.data);

        // Reset loading state after the update
        setLoadingPlusButtonId(null);
        setLoadingMinusButtonId(null);
    }

    async function deleteItem(productId) {
        let response = await deleteProductItem(productId);
        console.log(response.data.data);
        setCartItemsNo(response.data.numOfCartItems)
        setCartDetails(response.data.data);
        setCart(response.data)
    }

    async function clearAllItems() {
        setisClear(true)
        let response = await clearCart()
        setisClear(false)
        setCartItemsNo(0)
        setCartDetails(null)
        setCart(response.data)

    }



    function goToCheckout() {

        navigate(`/checkout/${cartDetails?._id}`);
    }

    useEffect(() => {
        getCartItems();
    }, []);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
            </Helmet>

            {loadingScreen ? (
                <div className='flex justify-center items-center w-full h-screen'>
                    <GridLoader color='#0aad0a' />
                </div>
            ) : (
                <>
                    {cartDetails && cartDetails.products.length > 0 ? (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
                            <h2 className="text-3xl text-[--main-color] font-semibold text-center">Shipping Cart</h2>
                            <h3 className="text-center text-slate-600 text-lg font-light mt-3">
                                Total Cart Price: {cartDetails?.totalCartPrice} EGP
                            </h3>
                            <table className="w-3/4 mx-auto my-6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-16 py-3">
                                            <span className="sr-only">Image</span>
                                        </th>
                                        <th scope="col" className="px-6 text-center py-3">
                                            Product
                                        </th>
                                        <th scope="col" className="px-6 text-center py-3">
                                            Qty
                                        </th>
                                        <th scope="col" className="px-6 text-center py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 text-center py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartDetails?.products.map((product) => (
                                        <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="p-4 text-center">
                                                <img
                                                    src={product.product.imageCover}
                                                    className="w-16 md:w-32 max-w-full max-h-full"
                                                    alt={product.product.title}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">
                                                {product.product.title}
                                            </td>
                                            <td className="px-6 text-center py-4">
                                                <div className="flex items-center">
                                                    <button
                                                        disabled={product.count === 1}
                                                        onClick={() => updateCartCount(product.product.id, product.count - 1, 'minus')}
                                                        className="inline-flex disabled:cursor-not-allowed items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                        type="button"
                                                    >
                                                        <span className="sr-only">Quantity button</span>
                                                        {loadingMinusButtonId === product.product.id ? (
                                                            <i className="fas fa-spinner fa-spin"></i>
                                                        ) : (
                                                            <svg
                                                                className="w-3 h-3"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 18 2"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M1 1h16"
                                                                />
                                                            </svg>
                                                        )}
                                                    </button>
                                                    <div>
                                                        <span>{product.count}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => updateCartCount(product.product.id, product.count + 1, 'plus')}
                                                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                        type="button"
                                                    >
                                                        <span className="sr-only">Quantity button</span>
                                                        {loadingPlusButtonId === product.product.id ? (
                                                            <i className="fas fa-spinner fa-spin"></i>
                                                        ) : (
                                                            <svg
                                                                className="w-3 h-3"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 18 18"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M9 1v16M1 9h16"
                                                                />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">
                                                {product.price * product.count} EGP
                                            </td>
                                            <td className="px-6 text-center py-4">
                                                <span
                                                    onClick={() => deleteItem(product.product.id)}
                                                    className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                                                >
                                                    Remove
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="text-center mb-3">
                                <button onClick={clearAllItems} className="w-3/4 text-red-500 border-2 border-red-500 hover:text-white hover:bg-red-500 duration-500 rounded-md p-1">
                                    {isClear ? <i className='fas fa-spinner fa-spin'></i> : 'Clear Cart'}
                                </button>
                            </div>
                            <div className="text-center mb-7">
                                <button onClick={goToCheckout} className="w-3/4 text-green-700 border-2 border-green-700  hover:bg-green-700 duration-500 hover:text-white rounded-md p-1">
                                    Continue To Checkout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className='h-screen w-full flex justify-center items-center'>
                            <p className='text-2xl font-semibold text-white bg-red-600 p-4 rounded-xl'>Your cart is empty. Start shopping now!</p>
                        </div>
                    )}
                </>
            )}


        </>
    );
}

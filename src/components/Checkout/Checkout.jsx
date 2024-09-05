import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import styles from './Checkout.module.css';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';

export default function Checkout() {
    let { id } = useParams()

    let [isLoading, setIsLoading] = useState(false)
    let { checkout } = useContext(CartContext)
    let [isOnlinePayment, setIsOnlinePayment] = useState(false)
    let navigate = useNavigate()

    async function handleCheckout(cartId, url) {
        setIsLoading(true)
        let { data } = await checkout(cartId, url, myForm.values)
        let checkoutUrl = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`
        if (isOnlinePayment) {
            checkoutUrl = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://mahmoudmohsen23.github.io/E-Commerce-with-React.js/`
        }
        if (data.status == 'success') {
            setIsLoading(false)
            if (isOnlinePayment) {
                window.location.href = data.session.url
            } else {
                navigate('/allorders')
            }

        }
    }

    let myForm = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        },
        onSubmit: () => handleCheckout(id)
    })


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Checkout</title>
            </Helmet>
            <form onSubmit={myForm.handleSubmit} className="max-w-lg mx-auto mt-5">

                <h2 className='text-2xl mb-5 text-[--main-color] font-bold'>Checkout Now :</h2>
                <div className="mb-5">
                    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
                    <input onChange={myForm.handleChange} onBlur={myForm.handleBlur} value={myForm.values.details} type="text" name="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your details" />
                </div>



                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                    <input onChange={myForm.handleChange} onBlur={myForm.handleBlur} value={myForm.values.phone} type="tel" name="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your phone" />
                </div>


                <div className="mb-5">
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
                    <input onChange={myForm.handleChange} onBlur={myForm.handleBlur} value={myForm.values.city} type="text" name="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your city" />
                </div>


                <input type="checkbox" id='forOnline' onChange={() => setIsOnlinePayment(!isOnlinePayment)} />
                <label className='mx-1 text-sm' htmlFor="forOnline">Pay Online</label>

                <div className='text-right'>
                    <button type="submit" disabled={isLoading} className=" text-white bg-[--main-color]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
                        {isLoading ? <i className='fa fa-spinner fa-spin'></i> : <>
                            {isOnlinePayment ? 'Pay Online' : 'Cash On Delivery'}
                        </>}
                    </button>
                </div>

            </form>
        </>
    )
}


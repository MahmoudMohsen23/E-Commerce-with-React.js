import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Footer.module.css';
import amazon from '../../assets/images/Amazon-Pay-logo.svg'
import mastercard from '../../assets/images/mastercard_logo.svg__3.png'
import paypal from '../../assets/images/PayPal-Logo.png'
import americanexpress from '../../assets/images/americanexpress.23e3b98512ffad5d0ad1.png'
import appstore from '../../assets/images/app store.png'
import googleplay from '../../assets/images/google play.png'

export default function Footer() {
    let [count, setCount] = useState(0)
    useEffect(() => { }, [])
    return (
        <footer className='text-2xl pb-16  bg-[#e6e6e7]'>
            <div className="container mx-auto">
                <div className='pt-10 pl- pb-4'>
                    <h2>Get the FreshCart app</h2>
                    <p className='text-lg text-gray-600'>We will send you a link, open it on your phone to download the app </p>
                </div>

                <div className="flex gap-5 text-center justify-center mb-5 ">
                    <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email..." />
                    <button className=" text-white bg-[--main-color]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Share App Link</button>
                </div>

                <div className='flex justify-between items-center border-t-2 border-gray-300 border-b-2  '>
                    <div className='flex justify-center items-center gap-3'>
                        <h5 className='text-lg inline-block'>Payment Partners</h5>
                        <img src={amazon} alt="amazon" className='w-20' />
                        <img src={mastercard} alt="mastercard" className='w-12' />
                        <img src={paypal} alt="paypal" className='w-12' />
                        <img src={americanexpress} alt="americanexpress" className='w-12' />
                    </div>
                    <div >
                        <h5 className=' text-lg flex  items-center'>Get deliveries with FreshCart
                            <img src={appstore} className='w-32 cursor-pointer' alt="appstore" />
                            <img src={googleplay} className='w-32 cursor-pointer' alt="googleplay" />

                        </h5>
                    </div>
                </div>
            </div>
        </footer>
    )
}

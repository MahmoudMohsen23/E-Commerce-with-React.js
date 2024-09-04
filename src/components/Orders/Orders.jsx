import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Orders.module.css';
import { CartContext } from '../../Context/CartContext';
import { UserTokenContext } from '../../Context/UserTokenContext';
import { PacmanLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';

export default function Orders() {
    let [orders, setOrders] = useState([])
    const [loadingScreen, setloadingScreen] = useState(true)
    let { getOrders } = useContext(CartContext)
    let { userId } = useContext(UserTokenContext)

    async function getAllOrders() {
        let response = await getOrders(userId)
        setOrders(response.data)
        console.log(response.data);
        setloadingScreen(false)
    }
    useEffect(() => { if (userId) getAllOrders() }, [userId])
    return (
        <>
         <Helmet>
                <meta charSet="utf-8" />
                <title>All Orders</title>
            </Helmet>
            {loadingScreen ? <div className='flex justify-center items-center w-full h-screen'>
                <PacmanLoader color='#0aad0a' /></div> :
                <div className="container mx-auto pt-5 mt-5">
                    <h1 className='text-3xl text-[--main-color] font-semibold'>Your Orders : </h1>

                    {orders.map((order) => {
                        return <div key={order.id} >
                            <div className="order overflow-auto shadow rounded p-4 my-5">
                                <div className="flex items-center">
                                    <h2 className='font-bolder h1'>{order.id}</h2>
                                    <h4 className='font-bold text-[--main-color] mx-4'>processing</h4>
                                </div>
                                <p>you have ordered <span className='font-bold'>{order.cartItems.length}</span> items.</p>
                                <div className="flex gap-2">
                                    {order.cartItems.map((item) => {
                                        return <div key={item._id} className="flex"> <img className='mx-1' style={{ width: 200 }} src={item.product.imageCover} alt="" key={item._id} /></div>
                                    })}
                                </div>
                                <hr />
                                <div className=" flex justify-between">
                                    <div className='font-bold'>Total amount {order.totalOrderPrice} EGP</div>
                                    <div className="font-bold">{order.updatedAt.split("T").slice(0, 3).join(" ").split(".").slice(0, 1).join(" ")}</div>
                                </div>

                            </div>

                        </div>
                    })}
                </div>}

        </>
    )
}

import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Navbar.module.css';
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserTokenContext } from '../../Context/UserTokenContext';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';

export default function Navbar() {
    let [count, setCount] = useState(0)
    let { token, setToken } = useContext(UserTokenContext)
    let { cartItemsNo } = useContext(CartContext)
    let { wishList,wishListCount } = useContext(WishListContext)
    console.log(wishList);
    let navigate = useNavigate()
    console.log(token, 'hello from nav component');
    useEffect(() => { }, [])

    function logOut() {
        setToken(null)
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <nav className='bg-[#d8d8d8] p-2 static lg:fixed top-0 left-0 right-0 z-20'>
            <div className="container mx-auto flex flex-col items-center lg:flex-row justify-between">
                <div className=" text-center flex flex-col items-center lg:flex-row">
                    <img src={logo} className='mr-2' alt="logo" />
                    {token ? <ul className='flex flex-col lg:flex-row gap-3 '>
                        <li>
                            <NavLink to={'home'}>Home</NavLink>
                        </li>

                        <li>
                            <NavLink to={'products'}>Products</NavLink>
                        </li>
                        <li>
                            <NavLink to={'categories'}>Categories</NavLink>
                        </li>
                        <li>
                            <NavLink to={'brands'}>Brands</NavLink>
                        </li>
                    </ul> : null}

                </div>

                <ul className=' flex flex-col items-center lg:flex-row gap-3'>
                    <li>
                        <i className='fa-brands mx-1 fa-instagram'></i>
                        <i className='fa-brands mx-1 fa-facebook'></i>
                        <i className='fa-brands mx-1 fa-tiktok'></i>
                        <i className='fa-brands mx-1 fa-twitter'></i>
                        <i className='fa-brands mx-1 fa-linkedin'></i>
                        <i className='fa-brands mx-1 fa-youtube'></i>
                    </li>

                    {token ? <>
                        <li><Link to={'/cart'} className='text-slate-900 mx-1 my-4 text-lg relative cursor-pointer'><i className="fa-solid fa-cart-shopping fa-lg"></i>
                            <span className='bg-red-600 text-white p-1 text-sm rounded-2xl absolute top-[-12px] right-[-10px] w-[18px] h-[18px] flex justify-center items-center'>{cartItemsNo}</span>
                        </Link></li>
                        <li><Link to={'/wishlist'} className='text-slate-900 mx-1 my-4 text-lg relative cursor-pointer'><i className="fa-solid fa-heart"></i>
                            <span className='bg-red-600 text-white p-1 text-sm rounded-2xl absolute top-[-12px] right-[-10px] w-[18px] h-[18px] flex justify-center items-center'>{wishListCount}</span>
                        </Link></li>
                        <li><button to={'signout'} onClick={logOut}><NavLink>SignOut</NavLink></button> </li>
                    </>
                        : <> <li><NavLink to={'register'}>Register</NavLink></li><li><NavLink to={'login'}>Login</NavLink></li></>}


                </ul>
            </div>
        </nav>
    )
}

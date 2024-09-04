import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './LayOut.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function LayOut() {
    let [count, setCount] = useState(0)
    useEffect(() => { }, [])
    return (
        <>
            <Navbar />

            <div className="container mx-auto pt-11 pb-8">
                <Outlet></Outlet>
            </div>
        
            <Footer />
        </>
    )
}

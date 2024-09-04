import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Home.module.css';
import RecentProducts from '../RecentProducts/RecentProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';

export default function Home() {
    let [count, setCount] = useState(0)

    useEffect(() => { }, [])
    return (
        <>
         <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
            <MainSlider />
            <CategoriesSlider />
            <RecentProducts />
        </>
    )
}

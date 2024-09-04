import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Products.module.css';
import RecentProducts from '../RecentProducts/RecentProducts';
import { Helmet } from 'react-helmet';

export default function Products() {
    let [count, setCount] = useState(0)
    useEffect(() => { }, [])
    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Products</title>
            </Helmet>
            <RecentProducts />
        </>
    )
}

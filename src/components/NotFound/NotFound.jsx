import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './NotFound.module.css';
import error from '../../assets/images/error.svg'
import { Helmet } from 'react-helmet';

export default function NotFound() {
    let [count, setCount] = useState(0)
    useEffect(() => { }, [])
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Not Found</title>
            </Helmet>


            <div className='flex justify-center items-center my-20  '>
                <img src={error} alt="error" />
            </div>
        </>

    )
}

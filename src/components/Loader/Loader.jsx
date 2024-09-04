import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Loader.module.css';

export default function Loader() {
    let [count, setCount] = useState(0)
    useEffect(() => { }, [])
    return (
        <div>Loader</div>
    )
}

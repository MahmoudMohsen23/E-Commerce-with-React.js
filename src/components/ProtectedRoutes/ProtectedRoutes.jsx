import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './ProtectedRoutes.module.css';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({children}) {
    let [count, setCount] = useState(0)
    useEffect(() => { }, [])
    if(localStorage.getItem('token')){ 
        return children
    }else { 
        return <Navigate to={'/login'} />
    }
}

import React from 'react'
import { useState, useEffect } from 'react'
import styles from './ResetCode.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

export default function ResetCode() {

    let [count, setCount] = useState(0)
    useEffect(() => { }, [])

    let [apiError, setApiError] = useState(null)
    let [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate()

    async function sendDataToApi(formValues) {
        try {
            setIsLoading(true)
            console.log(formValues);
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', formValues)
            if (data.status == "Success") {
                setIsLoading(false)
                setApiError(null)
                navigate('/newpassword')
            }
            console.log(data);
        }
        catch (error) {
            console.log("ERROR : ", error);
            setIsLoading(false)
        }
    }

    let myForm = useFormik({
        initialValues: {
            resetCode: "",
        },
        onSubmit: sendDataToApi
    })


    return (
        <>
            {apiError && <div className="p-4 mb-4 max-w-lg mx-auto mt-5 text-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{apiError}</span>
            </div>}
            <form onSubmit={myForm.handleSubmit} className="max-w-lg mx-auto mt-5">

                <h2 className='text-2xl mb-5 text-[--main-color] font-bold'>Reset Code :</h2>
                <div className="mb-5">
                    <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reset Code</label>
                    <input onChange={myForm.handleChange} onBlur={myForm.handleBlur} value={myForm.values.resetCode} type="text" name="resetCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Reset Code" />
                </div>

                <div className='text-right'>
                    <button type="submit" disabled={isLoading} className=" text-white bg-[--main-color]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
                        {isLoading ? <i className='fa fa-spinner fa-spin'></i> : 'Submit'}
                    </button>
                </div>

            </form>
        </>
    )
}


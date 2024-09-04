import React from 'react'
import { useState, useEffect } from 'react'
import styles from './Forget.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Forget() {

    let [count, setCount] = useState(0)
    useEffect(() => { }, [])

    let [apiError, setApiError] = useState(null)
    let [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate()

    async function sendDataToApi(formValues) {
        try {
            setApiError(null)
            setIsLoading(true)
            console.log(formValues);
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', formValues)
            if (data.statusMsg == "success") {
                navigate('/reset')
            } else {

            }
            console.log(data);

        } catch (error) {
            console.log("ERROR : ", error);
            setApiError(error.response.data.message)
            setIsLoading(false)
        }
    }

    let myForm = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email('invalid email').required('Required'),
        }),
        onSubmit: sendDataToApi
    })


    return (
        <>
            {apiError && <div className="p-4 mb-4 max-w-lg mx-auto mt-5 text-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{apiError}</span>
            </div>}
            <form onSubmit={myForm.handleSubmit} className="max-w-lg mx-auto mt-5">

                <h2 className='text-2xl mb-5 text-[--main-color] font-bold'>Forget Password :</h2>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input onChange={myForm.handleChange} onBlur={myForm.handleBlur} value={myForm.values.email} type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your email" />
                </div>

                {myForm.errors.email && myForm.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{myForm.errors.email}</span>
                </div> : null}

                
                <div className='text-right'>
                    <button type="submit" disabled={isLoading} className=" text-white bg-[--main-color]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
                        {isLoading ? <i className='fa fa-spinner fa-spin'></i> : 'Submit'}
                    </button>
                </div>

            </form>
        </>
    )
}


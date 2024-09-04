import React from 'react'
import { useState, useEffect } from 'react'
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Register() {
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
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formValues)
            if (data.message == "success") {
                navigate('/login')
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
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, 'not less than 3').max(10, 'max is 10').required('Required'),
            email: Yup.string().email('invalid email').required('Required'),
            password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/).required('Required'),
            rePassword: Yup.string().oneOf([Yup.ref('password')], 'rePassword should match password').required('Required'),
            phone: Yup.string().matches(/^01[0125][0-9]{8}$/).required('Required')
        }),
        onSubmit: sendDataToApi
    })


    return (
        <>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
            </Helmet>

            {apiError && <div className="p-4 mb-4 max-w-lg mx-auto mt-5 text-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{apiError}</span>
            </div>}
            <form onSubmit={myForm.handleSubmit} className="max-w-lg mx-auto mt-5">

                <h2 className='text-2xl mb-5 text-[--main-color] font-bold'>Register Now :</h2>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                    <input onChange={myForm.handleChange} onBlur={myForm.handleBlur} value={myForm.values.name} type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your name" />
                </div>

                {myForm.errors.name && myForm.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{myForm.errors.name}</span>
                </div> : null}

                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input onChange={myForm.handleChange} onBlur={myForm.handleBlur} value={myForm.values.email} type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your email" />
                </div>

                {myForm.errors.email && myForm.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{myForm.errors.email}</span>
                </div> : null}

                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input onChange={myForm.handleChange} onBlur={myForm.handleBlur} value={myForm.values.password} type="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your password" />
                </div>

                {myForm.errors.password && myForm.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{myForm.errors.password}</span>
                </div> : null}

                <div className="mb-5">
                    <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your rePassword</label>
                    <input onChange={myForm.handleChange} onBlur={myForm.handleBlur} value={myForm.values.rePassword} type="password" name="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your repassword" />
                </div>

                {myForm.errors.rePassword && myForm.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{myForm.errors.rePassword}</span>
                </div> : null}

                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                    <input onChange={myForm.handleChange} onBlur={myForm.handleBlur} value={myForm.values.phone} type="tel" name="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your phone" />
                </div>

                {myForm.errors.phone && myForm.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{myForm.errors.phone}</span>
                </div> : null}

                <div className='text-right'>
                    <button type="submit" disabled={isLoading} className=" text-white bg-[--main-color]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
                        {isLoading ? <i className='fa fa-spinner fa-spin'></i> : 'Register'}
                    </button>

                </div>
            </form>
        </>
    )
}

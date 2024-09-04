import axios from "axios";
import { createContext, useState } from "react";


export let WishListContext = createContext()

export default function WishListContextProvider({ children }) {
    const [wishList, setWishList] = useState(null)
    const [wishListCount, setWishListCount] = useState(null)

    let headers = {
        token: localStorage.getItem('token')
    }


    //add to wish list

    async function addToWishList(productId) {
        try {
            let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                productId
            }, {
                headers
            })

            return response
        } catch (error) {
            return error
        }
    }

    //Get Logged User Wish List

    async function getLoggedUserWishList() {
        try {
            let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                headers
            })

            return response
        } catch (error) {
            return error
        }
    }

    //Remove Product From Wish List

    async function removeProductFromWishList(productId) {
        try {
            let response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
                headers
            })

            return response
        } catch (error) {
            return error
        }
    }

    return <WishListContext.Provider value={{wishListCount, setWishListCount, wishList, setWishList, addToWishList, getLoggedUserWishList, removeProductFromWishList }} >
        {children}
    </WishListContext.Provider>
}
import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export let CartContext = createContext()


export default function CartContextProvider({ children }) {

    let headers = {
        token: localStorage.getItem('token')
    }

    let [cart, setCart] = useState(null)
    let [cartItemsNo, setCartItemsNo] = useState(null)


    async function getLoggedUserCart() {
        try {
            let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers
            })
            return response
        }
        catch (error) {
            return error;
        }
    }

    async function clearCart() {
        try {
            let response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers
            })
            return response
        } catch (error) {
            return error
        }


    }

    async function addProductToCart(productId) {
        try {
            let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
                productId
            }, {
                headers
            })

            return response
        }
        catch (error) {
            return error;
        }
    }

    async function updateCartItemCount(productId, count) {
        try {
            let response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                count
            }, {
                headers
            })
            return response
        }
        catch (error) {
            return error
        }
    }

    async function deleteProductItem(productId) {
        try {
            let response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                headers
            })

            return response
        }
        catch (error) {
            return error;
        }
    }

    async function checkout(cartId, formValues) {
        try {
            let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://mahmoudmohsen23.github.io/E-Commerce-with-React.js/`, {
                shippingAddress: formValues
            }, {
                headers
            })

            return response
        }
        catch (error) {
            return error;
        }
    }

    async function getOrders(userId) {
        try {
            let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)

            return response
        } catch (error) {
            return error
        }
    }

    async function getCart() {
        let response = await getLoggedUserCart
        setCart(response.data)
    }

    useEffect(() => { getCart() }, [])

    return <CartContext.Provider value={{ cartItemsNo, setCartItemsNo, cart, setCart, getLoggedUserCart, addProductToCart, updateCartItemCount, deleteProductItem, clearCart, checkout, getOrders }}>
        {children}
    </CartContext.Provider>
}
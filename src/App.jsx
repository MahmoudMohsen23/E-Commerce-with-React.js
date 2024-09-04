import { useContext, useEffect, useState } from 'react'
import './App.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import LayOut from './components/LayOut/LayOut'
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Login from './components/Login/Login'
import NotFound from './components/NotFound/NotFound'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CounterContextProvider from './Context/CounterContext'
import UserTokenContextProvider from './Context/UserTokenContext'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import Products from './components/Products/Products'

import CategoriesDetails from './components/CategoriesDetails/CategoriesDetails'
import CartContextProvider, { CartContext } from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import Checkout from './components/Checkout/Checkout'
import Forget from './components/Forget/Forget'
import ResetCode from './components/ResetCode/ResetCode'
import NewPassword from './components/NewPassword/NewPassword'
import Orders from './components/Orders/Orders'
import WishListContextProvider, { WishListContext } from './Context/WishListContext'
import WishList from './components/WishList/WishList'

function App() {


  const [count, setCount] = useState(0)
  let { getLoggedUserCart, setCartItemsNo } = useContext(CartContext)
  const { getLoggedUserWishList, setWishList, removeProductFromWishList, wishListCount, setWishListCount } = useContext(WishListContext);


  async function getCartItems() {
    let response = await getLoggedUserCart();
    setCartItemsNo(response.data.numOfCartItems)
  }

  async function getWishDetails() {

    let response = await getLoggedUserWishList();
    console.log(response);
    setWishListCount(response.data.count)
  }

  useEffect(() => {
    getCartItems()
    getWishDetails()
  }, [])
  const routes = createHashRouter([
    {
      path: "", element: <LayOut />, children: [
        { index: true, element: <Register /> },
        { path: 'forget', element: <Forget /> },
        { path: 'reset', element: <ResetCode /> },
        { path: 'newpassword', element: <NewPassword /> },
        { path: 'login', element: <Login /> },
        { path: 'home', element: <ProtectedRoutes> <Home /> </ProtectedRoutes> },
        { path: 'products', element: <ProtectedRoutes> <Products /> </ProtectedRoutes> },
        { path: 'productdetails/:id/:category', element: <ProtectedRoutes> <ProductDetails /></ProtectedRoutes> },
        { path: 'cart', element: <ProtectedRoutes> <Cart /> </ProtectedRoutes> },
        { path: 'categories', element: <ProtectedRoutes> <Categories /> </ProtectedRoutes> },
        { path: 'categoriesdetails/:id', element: <ProtectedRoutes> <CategoriesDetails /> </ProtectedRoutes> },
        { path: 'brands', element: <ProtectedRoutes> <Brands /> </ProtectedRoutes> },
        { path: 'wishlist', element: <ProtectedRoutes> <WishList /> </ProtectedRoutes> },
        { path: 'checkout/:id', element: <ProtectedRoutes> <Checkout /> </ProtectedRoutes> },
        { path: 'allorders', element: <ProtectedRoutes> <Orders /> </ProtectedRoutes> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ])
  return (
    <>

      <UserTokenContextProvider>
        <CounterContextProvider>


          <RouterProvider router={routes}></RouterProvider>
          <Toaster />
        </CounterContextProvider>
      </UserTokenContextProvider>

    </>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from './Context/CartContext.jsx'
import WishListContextProvider from './Context/WishListContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WishListContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </WishListContextProvider>

  </React.StrictMode>,
)

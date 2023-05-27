import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Authentication from './pages/Authentication'
import ProductInfo from './pages/ProductInfo'
import WishList from './pages/WishList'
import Cart from './pages/Cart'
import ProductList from './pages/ProductList'
import { clearMessage } from './redux/slices/messageSlice'

const requiredAuthPath = ['/wishlist', '/cart']

function App() {
  const user = useSelector((state) => state.userStore?.user)
  const message = useSelector((state) => state?.messageStore)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (requiredAuthPath.includes(pathname)) {
      if (!user) navigate('/login')
    }
  }, [pathname, user, navigate])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (message?.error && message?.message !== '') toast.error(message.message)
    else if (message?.message !== '') {
      toast.success(message.message)
    }
    message.message !== '' && dispatch(clearMessage())
  }, [message])

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='' element={<Home />} />
          <Route path='login' element={<Authentication />} />
          <Route path='products' element={<ProductList />} />
          <Route path='products/:itemName' element={<ProductInfo />} />
          <Route path='wishlist' element={<WishList />} />
          <Route path='cart' element={<Cart />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

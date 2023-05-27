import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Authentication from './pages/Authentication'
import ProductInfo from './pages/ProductInfo'
import WishList from './pages/WishList'
import Cart from './pages/Cart'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import ProductList from './pages/ProductList'

const requiredAuthPath = ['/wishlist', '/cart']

function App() {
  const user = useSelector((state) => state.userStore.user)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (requiredAuthPath.includes(pathname)) {
      if (!user) navigate('/login')
    }
  }, [pathname, user, navigate])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
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
  )
}

export default App

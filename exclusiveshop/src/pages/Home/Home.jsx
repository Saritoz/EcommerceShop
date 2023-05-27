import { useEffect, useRef } from 'react'
import Countdown from '../../components/Countdown'
import SideBar from '../../components/SideBar'
import Slider from '../../components/Slider'
import Title from '../../components/Title'
import Container from '../../layouts/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faHeadphones, faShield, faTruck } from '@fortawesome/free-solid-svg-icons'
import { CardCategory, CardItem } from '../../components/Card'
import Divider from '../../components/Divider'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCategories,
  getProductsMinInfo,
  getSomeBestSellerProduct,
  getSomeDiscountProducts
} from '../../redux/slices/productSlice'
import { isNewItem } from '../../utils/compareProductDate'
import { categoriesIcon } from '../../constants/categoriesicon'
import { addProdToCart, addProdToWishlist, removeProdToWishlist } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'

const imgsSrc = ['/assets/imgs/exampleslider.png', '/assets/imgs/exampleslider.png']

export default function Home() {
  const todayContainer = useRef(null)
  const categoryContainer = useRef(null)
  const ourProductContainer = useRef(null)
  const store = useSelector((state) => state.productStore)
  const user = useSelector((state) => state.userStore?.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleScrollLeft = (containerRef) => () => {
    const container = containerRef.current
    container.scrollLeft -= 250
  }

  const handleScrollRight = (containerRef) => () => {
    const container = containerRef.current
    container.scrollLeft += 250
  }

  const handleAddCart = (id) => {
    const product = {
      id_product: id
    }
    user ? dispatch(addProdToCart(product)) : navigate('/login')
  }

  const handleAddWishList = (id) => {
    user ? dispatch(addProdToWishlist(id)) : navigate('/login')
  }

  const handleRemWishList = (id) => {
    user ? dispatch(removeProdToWishlist(id)) : navigate('/login')
  }

  const viewProduct = (name, id) => {
    navigate(`/products/${name}`, { state: { id } })
  }

  const browseByCategory = (id) => {
    navigate('/products', { state: { categoryid: id } })
  }

  useEffect(() => {
    dispatch(getProductsMinInfo(20))
    dispatch(getAllCategories())
    dispatch(getSomeDiscountProducts())
    dispatch(getSomeBestSellerProduct())
  }, [])

  return (
    <Container>
      <section className='flex flex-wrap items-center gap-5 sm:flex-nowrap'>
        <SideBar customClass='w-[200px] hidden sm:block' data={store?.categories} browseByCategory={browseByCategory} />
        <Slider customClass='flex-1 sm:h-full' imgsSrc={imgsSrc} />
      </section>
      <section className='mt-8'>
        <Title>Today's</Title>
        <div className='mb-5'>
          <div className='my-3 flex flex-wrap items-center justify-between gap-y-5 sm:flex-nowrap'>
            <div className='flex flex-wrap items-center gap-5 sm:flex-nowrap'>
              <p className='text-3xl font-semibold'>Flash Sales</p>
              <Countdown days={1} />
            </div>
            <div>
              <button
                onClick={handleScrollLeft(todayContainer)}
                className='mr-3 h-10 w-10 rounded-full bg-neutral-200 text-center hover:bg-neutral-400'
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                onClick={handleScrollRight(todayContainer)}
                className='h-10 w-10 rounded-full bg-neutral-200 text-center hover:bg-neutral-400'
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
          <div ref={todayContainer} className='no-scrollbar my-4 flex w-full gap-5 overflow-x-auto scroll-smooth'>
            {store?.saleproduct.map((product) => {
              const action = user?.wishList?.includes(product._id) ? 'canremove' : 'canwishlist'
              return (
                <CardItem
                  key={product._id}
                  type={'saleoff'}
                  action={action}
                  data={product}
                  handleAddCart={handleAddCart}
                  handleAddWishList={handleAddWishList}
                  handleRemWishList={handleRemWishList}
                  viewProduct={viewProduct}
                />
              )
            })}
          </div>
        </div>
        <button className='ml-[50%] mt-4 w-[200px] -translate-x-[50%] rounded bg-red-500 px-5 py-2 capitalize text-white transition-colors duration-300 hover:bg-red-400 sm:w-auto sm:px-10'>
          view all products
        </button>
        <Divider />
      </section>
      <section className=''>
        <Title>Categories</Title>
        <div className='mb-5 mt-5 flex flex-wrap justify-between gap-y-5 sm:flex-nowrap'>
          <p className='text-3xl font-semibold capitalize'>Browse by category</p>
          <div>
            <button
              onClick={handleScrollLeft(categoryContainer)}
              className='mr-3 h-10 w-10 rounded-full bg-neutral-200 text-center hover:bg-neutral-400'
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              onClick={handleScrollRight(categoryContainer)}
              className='h-10 w-10 rounded-full bg-neutral-200 text-center hover:bg-neutral-400'
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
        <div className='no-scrollbar my-4 flex w-full gap-5 overflow-x-auto scroll-smooth' ref={categoryContainer}>
          {store?.categories.map((category) => (
            <CardCategory key={category._id} data={category} browseByCategory={browseByCategory}>
              <FontAwesomeIcon icon={categoriesIcon[category.name]} className='text-5xl' />
            </CardCategory>
          ))}
        </div>
        <Divider />
      </section>
      <section className=''>
        <Title>This month</Title>
        <div className='mb-5 mt-5 flex flex-wrap justify-between gap-y-5'>
          <p className='text-3xl font-semibold capitalize'>Best Selling Products</p>
          <button className='rounded bg-red-500 px-10 py-2 capitalize text-white transition-colors duration-300 hover:bg-red-400'>
            View All
          </button>
        </div>
        <div className='my-4 flex w-full flex-wrap justify-center gap-5 sm:justify-start'>
          {store?.bestseller.map((product) => {
            const action = user?.wishList?.includes(product._id) ? 'canremove' : 'canwishlist'
            const type = product.discount ? 'saleoff' : isNewItem(product.createdAt) ? 'new' : ''
            return (
              <CardItem
                key={product._id}
                type={type}
                action={action}
                data={product}
                handleAddCart={handleAddCart}
                handleAddWishList={handleAddWishList}
                handleRemWishList={handleRemWishList}
                viewProduct={viewProduct}
              />
            )
          })}
        </div>
        <Divider />
      </section>
      <section className=''>
        <Title>Our Products</Title>
        <div className='mb-5 mt-5 flex flex-wrap justify-between gap-y-5'>
          <p className='text-3xl font-semibold capitalize'>Explore our products</p>
          <div>
            <button
              onClick={handleScrollLeft(ourProductContainer)}
              className='mr-3 h-10 w-10 rounded-full bg-neutral-200 text-center hover:bg-neutral-400'
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              onClick={handleScrollRight(ourProductContainer)}
              className='h-10 w-10 rounded-full bg-neutral-200 text-center hover:bg-neutral-400'
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
        <div
          ref={ourProductContainer}
          className='no-scrollbar my-4 flex h-[620px] flex-col gap-5 overflow-x-auto scroll-smooth'
        >
          <div className='flex h-[620px] w-full gap-5'>
            {store.products.slice(0, 10).map((product) => {
              const action = user?.wishList?.includes(product._id) ? 'canremove' : 'canwishlist'
              const type = product.discount ? 'saleoff' : isNewItem(product.createdAt) ? 'new' : ''
              return (
                <CardItem
                  key={product._id}
                  type={type}
                  action={action}
                  data={product}
                  handleAddCart={handleAddCart}
                  handleAddWishList={handleAddWishList}
                  handleRemWishList={handleRemWishList}
                  viewProduct={viewProduct}
                />
              )
            })}
          </div>
          <div className='flex h-[620px] w-full gap-5'>
            {store.products.slice(10).map((product) => {
              const action = user?.wishList?.includes(product._id) ? 'canremove' : 'canwishlist'
              const type = product.discount ? 'saleoff' : isNewItem(product.createdAt) ? 'new' : ''
              return (
                <CardItem
                  key={product._id}
                  type={type}
                  action={action}
                  data={product}
                  handleAddCart={handleAddCart}
                  handleAddWishList={handleAddWishList}
                  handleRemWishList={handleRemWishList}
                  viewProduct={viewProduct}
                />
              )
            })}
          </div>
        </div>
        <button className='z-[1] ml-[50%] mt-4 w-[200px] -translate-x-[50%] rounded bg-red-500 px-5 py-2 capitalize text-white transition-colors duration-300 hover:bg-red-400 sm:w-auto sm:px-10'>
          view all products
        </button>
        <Divider />
      </section>
      <section className='mb-10'>
        <Title>Featured</Title>
        <div className='mb-5 mt-5 flex justify-between'>
          <p className='text-3xl font-semibold capitalize'>Our's Featured</p>
        </div>
        <div className='mt-8 flex flex-wrap justify-center gap-x-10 gap-y-8'>
          <div>
            <div className='relative mx-auto h-[75px] w-[75px] rounded-full bg-neutral-400'>
              <div className='absolute left-[50%] top-[50%] h-[50px] w-[50px] -translate-x-[50%] -translate-y-[50%] rounded-full bg-black'>
                <FontAwesomeIcon
                  icon={faTruck}
                  className='absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-[25px] text-white'
                />
              </div>
            </div>
            <div className='my-3'>
              <h5 className='text-center text-lg font-semibold uppercase'>Free and fast delivery</h5>
              <p className='text-center'>Free delivery for all orders over $140</p>
            </div>
          </div>
          <div>
            <div className='relative mx-auto h-[75px] w-[75px] rounded-full bg-neutral-400'>
              <div className='absolute left-[50%] top-[50%] h-[50px] w-[50px] -translate-x-[50%] -translate-y-[50%] rounded-full bg-black'>
                <FontAwesomeIcon
                  icon={faHeadphones}
                  className='absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-[25px] text-white'
                />
              </div>
            </div>
            <div className='my-3'>
              <h5 className='text-center text-lg font-semibold uppercase'>24/7 Customer service</h5>
              <p className='text-center'>Friendly 24/7 customer support</p>
            </div>
          </div>
          <div>
            <div className='relative mx-auto h-[75px] w-[75px] rounded-full bg-neutral-400'>
              <div className='absolute left-[50%] top-[50%] h-[50px] w-[50px] -translate-x-[50%] -translate-y-[50%] rounded-full bg-black'>
                <FontAwesomeIcon
                  icon={faShield}
                  className='absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-[25px] text-white'
                />
              </div>
            </div>
            <div className='my-3'>
              <h5 className='text-center text-lg font-semibold uppercase'>MONEY BACK GUARANTEE</h5>
              <p className='text-center'>We reurn money within 30 days</p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}

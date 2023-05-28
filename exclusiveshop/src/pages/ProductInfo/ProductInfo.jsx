import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb'
import Container from '../../layouts/Container'
import Divider from '../../components/Divider'
import Rating from '../../components/Rating'
import { faHeart, faRotateLeft, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '../../redux/slices/productSlice'
import { addProdToCart } from '../../redux/slices/userSlice'

export default function ProductInfo() {
  const [currentImg, setCurrentImg] = useState(0)
  const [amount, setAmount] = useState(1)
  const [size, setSize] = useState(null)
  const [color, setColor] = useState(null)
  const imgsSlide = useRef(null)
  const { state } = useLocation()
  const dispatch = useDispatch()
  const product = useSelector((state) => state.productStore?.productInfo)
  const user = useSelector((state) => state.userStore?.user)

  const handleChangeCurrImg = (index) => () => {
    setCurrentImg(index)
  }

  const handleAddAmount = () => {
    setAmount((prev) => (prev < 99 ? prev + 1 : prev))
  }

  const handleSubAmount = () => {
    setAmount((prev) => (prev > 1 ? prev - 1 : prev))
  }

  const handleAdd2Cart = () => {
    const product = {
      id_product: state.id,
      amount,
      color,
      size
    }
    user && dispatch(addProdToCart(product))
  }

  useEffect(() => {
    dispatch(getProductById(state.id))
  }, [])

  return (
    <section>
      <Container>
        <BreadCrumb />
        {product ? (
          <div className='mb-5 flex flex-wrap gap-5 lg:flex-nowrap'>
            <div className='mx-auto flex h-[500px] gap-5'>
              <div ref={imgsSlide} className='no-scrollbar group relative h-full overflow-y-auto'>
                {product.imagesUrl.map((img, index) => (
                  <div
                    key={`img${index}`}
                    className='mb-5 flex h-[100px] w-[100px] select-none items-center justify-center bg-neutral-100 hover:cursor-pointer lg:h-[125px] lg:w-[125px] xl:h-[150px] xl:w-[150px]'
                    onClick={handleChangeCurrImg(index)}
                  >
                    <img src={img} alt={`img${index}`} className='max-h-[90%] max-w-[90%]' crossOrigin='anonymous' />
                  </div>
                ))}
              </div>
              <div className='flex h-full flex-1 select-none items-center justify-center bg-neutral-100 lg:w-[425px] xl:w-[500px]'>
                <img
                  src={`${product.imagesUrl[currentImg]}`}
                  alt='img'
                  className='max-h-[90%] max-w-[90%]'
                  crossOrigin='anonymous'
                />
              </div>
            </div>
            <div className='flex basis-full flex-col gap-y-2 lg:basis-auto'>
              <h3 className='text-2xl font-semibold tracking-wide'>{product.name}</h3>
              <div>
                <Rating rating={product.rating} id={product._id} />
                <span className='ml-2'>{`(${product.userRating.length} Reviews)`}</span>
                <span className='mx-2'>{'|'}</span>
                {product.avalable ? (
                  <span className='text-green-500'>In stock</span>
                ) : (
                  <span className='text-red-500'>Out stock</span>
                )}
              </div>
              <div>
                {product.discount > 0 ? (
                  <p className='text-xl font-semibold text-red-500'>
                    <span>{`$${Math.round(product.price * (1 - product.discount / 100))}`}</span>
                    <span className='pl-4 text-gray-500 line-through'>{`$${product.price}`}</span>
                  </p>
                ) : (
                  <p className='text-xl font-semibold'>{`$${product.price}`}</p>
                )}
              </div>
              <div>
                <p>{product.description}</p>
              </div>
              <Divider customClass={'my-2'} />
              {product.colors.length > 0 && (
                <div>
                  <span>Colors: </span>
                  <span>
                    {product.colors.map((color) => (
                      <span
                        className='mx-1 inline-block h-[20px] w-[20px] rounded-full hover:cursor-pointer'
                        onClick={() => setColor(color)}
                      >
                        {color}
                      </span>
                    ))}
                  </span>
                </div>
              )}
              {product.sizes.length > 0 && (
                <div className='flex items-center'>
                  <p className='mr-3'>Size: </p>
                  <div className='flex gap-x-2'>
                    {product.sizes.map((size) => (
                      <button
                        className='min-w-[30px] rounded border-[1px] p-1 uppercase transition-colors duration-300 hover:cursor-pointer hover:bg-red-500 hover:text-white'
                        onClick={() => setSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className='mt-2 flex items-center gap-x-6'>
                <div>
                  <span
                    className='inline-block w-[30px] select-none border-[1px] text-center text-lg transition-colors duration-300 hover:cursor-pointer hover:bg-red-500 hover:text-white'
                    onClick={handleSubAmount}
                  >
                    -
                  </span>
                  <input
                    value={amount}
                    className='no-spin-button border-[1px] text-center text-lg '
                    type='number'
                    min={1}
                    max={99}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                  <span
                    className='inline-block w-[30px] select-none border-[1px] text-center text-lg transition-colors duration-300 hover:cursor-pointer hover:bg-red-500 hover:text-white'
                    onClick={handleAddAmount}
                  >
                    +
                  </span>
                </div>
                <button
                  className='rounded border-[1px] border-red-500 px-6 py-[2px] text-red-500 transition-colors duration-300 hover:cursor-pointer hover:bg-red-500 hover:text-white'
                  onClick={() => handleAdd2Cart()}
                >
                  Buy Now
                </button>
                {/* <button>
                  <FontAwesomeIcon icon={faHeart} className='text-lg' />{' '}
                </button> */}
              </div>
              <div>
                <div className='flex min-w-[320px] max-w-[400px] items-center gap-x-3 border-[1px] p-2'>
                  <FontAwesomeIcon icon={faTruckFast} className='w-[30px] text-2xl' />
                  <div>
                    <p className='font-semibold'>Free Delivery</p>
                    <p>Enter your postal code for Delivery Availability</p>
                  </div>
                </div>
                <div className='mt-2 flex min-w-[320px] max-w-[400px] items-center gap-x-3 border-[1px] p-2'>
                  <FontAwesomeIcon icon={faRotateLeft} className='w-[30px] text-2xl' />
                  <div>
                    <p className='font-semibold'>Return Delivery</p>
                    <p>Free 30 Days Delivery Returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='text-center'>Product is loading or not found</div>
        )}
      </Container>
    </section>
  )
}

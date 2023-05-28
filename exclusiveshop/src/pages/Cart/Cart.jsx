import BreadCrumb from '../../components/BreadCrumb/BreadCrumb'
import Container from '../../layouts/Container'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, getCartData, removeProdToCart } from '../../redux/slices/userSlice'
import ItemCart from './ItemCart'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.userStore?.cart)
  const user = useSelector((state) => state.userStore?.user)
  const [total, setTotal] = useState(0)

  const handleRemoveProd = (id) => {
    dispatch(removeProdToCart(id))
  }

  useEffect(() => {
    dispatch(getCartData())
  }, [user])

  useEffect(() => {
    return () => dispatch(clearCart())
  }, [])

  return (
    <section>
      <Container>
        <BreadCrumb />
        <div className='flex items-center gap-3 rounded px-2 py-5 text-center font-semibold shadow-md'>
          <p className='basis-1/4'>Product</p>
          <p className='basis-1/4'>Price</p>
          <p className='basis-1/4'>Quantity</p>
          <p className='basis-1/4'>Subtotal</p>
        </div>

        {cart?.map((item) => (
          <ItemCart
            key={item._id}
            idItem={item._id}
            data={item.id}
            amountItem={item.amount}
            setTotal={setTotal}
            handleRemoveProd={handleRemoveProd}
          />
        ))}

        <div className='my-4 flex flex-wrap justify-between gap-y-3'>
          <button
            className='rounded border-[1px] border-gray-500 px-8 py-2 capitalize transition-colors duration-300 hover:bg-neutral-500 hover:text-white'
            onClick={() => navigate('/')}
          >
            Return to shop
          </button>
          <button className='rounded border-[1px] border-gray-500 px-8 py-2 capitalize transition-colors duration-300 hover:bg-neutral-500 hover:text-white'>
            Update Cart
          </button>
        </div>
        <div className='my-5'>
          <div className='float-right w-[275px] rounded border-[1px] border-neutral-600 p-3 md:w-[450px]'>
            <table className='cart_table-custom w-full border-collapse'>
              <thead>
                <tr>
                  <th className='text-left capitalize'>Cart Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Subtotal:</td>
                  <td>${total.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Shipping:</td>
                  <td>Free</td>
                </tr>
                <tr>
                  <td>Total:</td>
                  <td>${total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <div className='flex justify-center'>
              <button className='rounded bg-red-500 px-5 py-2 text-white transition-colors duration-300 hover:bg-red-400'>
                Process to checkout
              </button>
            </div>
          </div>
          <div className='clear-both'></div>
        </div>
      </Container>
    </section>
  )
}

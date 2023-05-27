import { useDispatch, useSelector } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb'
import { CardItem } from '../../components/Card'
import Container from '../../layouts/Container'
import { addProdToCart, removeProdToWishlist } from '../../redux/slices/userSlice'
import { useEffect } from 'react'
import { getWishlistData } from '../../redux/slices/userSlice'
import { isNewItem } from '../../utils/compareProductDate'
import { useNavigate } from 'react-router-dom'

export default function WishList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const wishList = useSelector((state) => state.userStore?.wishList)
  const user = useSelector((state) => state.userStore?.user)
  const handleAddCart = (id) => {
    const product = {
      id_product: id
    }
    dispatch(addProdToCart(product))
  }

  const handleRemWishList = (id) => {
    dispatch(removeProdToWishlist(id))
  }

  const viewProduct = (name, id) => {
    navigate(`/products/${name}`, { state: { id } })
  }

  useEffect(() => {
    dispatch(getWishlistData())
  }, [user])

  return (
    <section>
      <Container>
        <BreadCrumb />
        <div className='my-3 flex items-center justify-between'>
          <h3 className='text-xl'>
            WishList <span>{`(${wishList?.length ? wishList.length : 0})`}</span>
          </h3>
          <button className='rounded border-[1px] px-5 py-2 capitalize transition-colors duration-300 hover:bg-neutral-500 hover:text-white'>
            Remove all
          </button>
        </div>
        <div className='mb-5 flex flex-wrap justify-center gap-5'>
          {wishList?.map((product) => {
            const type = isNewItem(product.createdAt) ? 'new' : product.amount ? 'saleoff' : ''
            return (
              <CardItem
                key={product._id}
                action={'canremove'}
                type={type}
                handleAddCart={handleAddCart}
                handleRemWishList={handleRemWishList}
                viewProduct={viewProduct}
                data={product}
              />
            )
          })}
        </div>
      </Container>
    </section>
  )
}

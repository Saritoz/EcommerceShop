import { useLocation, useNavigate } from 'react-router-dom'
import BreadCrumb from '../../components/BreadCrumb'
import Container from '../../layouts/Container'
import { useEffect } from 'react'
import { clearProdFound, findProductBySearch, getProductByCategory } from '../../redux/slices/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addProdToCart, addProdToWishlist, removeProdToWishlist } from '../../redux/slices/userSlice'
import { isNewItem } from '../../utils/compareProductDate'
import { CardItem } from '../../components/Card'

export const ProductList = () => {
  const { state } = useLocation()
  const listProdFound = useSelector((state) => state.productStore?.listProdFound)
  const user = useSelector((state) => state.userStore?.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(state)
    if (state?.categoryid) dispatch(getProductByCategory(state.categoryid))
    else dispatch(findProductBySearch(state?.search ? state.search : ''))
    return () => dispatch(clearProdFound())
  }, [])

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

  return (
    <section>
      <Container>
        <BreadCrumb />
        {state?.search && <p className='mb-3 text-xl'>The result for '{state.search}' :</p>}
        <div className='flex flex-wrap justify-center gap-5 md:justify-start'>
          {listProdFound?.map((product) => {
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
        {listProdFound?.length === 0 && <p className='text-center'>No product found</p>}
      </Container>
    </section>
  )
}

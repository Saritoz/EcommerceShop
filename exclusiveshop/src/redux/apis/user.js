import { axiosInstance } from './axiosinstance'

const axios = axiosInstance()

// add product to cart
export const addProd2Cart = async (product) => {
  const data = await axios.post('user/addtocart', product)
  return data
}

// remove product from cart
export const removeProd2Cart = async (id) => {
  const data = await axios.delete(`user/delcart/${id}`)
  return data
}

// add product to wishlist
export const addProd2Wishlist = async (id) => {
  const data = await axios.post(`/user/addwishlist`, { id_product: id })
  return data
}

// remove product from wishlist
export const removeProd2Wishlist = async (id) => {
  const data = await axios.delete(`/user/delwishlist/${id}`)
  return data
}

// get products in cart
export const getProductInCart = async () => {
  const data = await axios.get(`/user/cart`)
  return data
}

// get products in wishlist
export const getProductInWishList = async () => {
  const data = await axios.get(`/user/wishlist`)
  return data
}

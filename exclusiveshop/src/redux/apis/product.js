import { axiosInstance } from './axiosinstance'

const axios = axiosInstance()

// get mininfo product api
export const getMinInfo = async (limit = 10) => {
  const data = await axios.get('products/mininfo', { params: { limit } })
  return data
}

// get all categories api
export const getCategories = async () => {
  const data = await axios.get('categories/')
  return data
}

// get discount products api
export const getDiscountProducts = async (limit = 10) => {
  const data = await axios.get('products/discount', { params: { limit } })
  return data
}

// get bestseller products api
export const getBestSellerProducts = async (limit = 5) => {
  const data = await axios.get('products/bestseller', { params: { limit } })
  return data
}

// get product by search api
export const findProduct = async (searchData) => {
  const data = await axios.post('products/find', { search: searchData })
  return data
}

// get full info of product api
export const getProduct = async (id) => {
  const data = await axios.get(`products/${id}`)
  return data
}

// get by category api
export const getByCategory = async (id) => {
  const data = await axios.get(`products/list`, { params: { categoryid: id } })
  return data
}

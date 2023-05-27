import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getBestSellerProducts,
  getByCategory,
  getCategories,
  getDiscountProducts,
  getMinInfo,
  getProduct
} from '../apis/product'
import { findProduct } from '../apis/product'

const initialState = {
  products: [],
  categories: [],
  saleproduct: [],
  bestseller: [],
  listProdFound: [],
  productInfo: null
}

export const getProductsMinInfo = createAsyncThunk('product/getproductsmininfo', async (limit, thunkAPI) => {
  try {
    const res = await getMinInfo(limit)
    return res
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.name)
  }
})

export const getAllCategories = createAsyncThunk('product/getcategories', async (data, thunkAPI) => {
  try {
    const res = await getCategories()
    return res
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.name)
  }
})

export const getSomeDiscountProducts = createAsyncThunk('product/discountproducts', async (limit, thunkAPI) => {
  try {
    const res = await getDiscountProducts(limit)
    return res
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.name)
  }
})

export const getSomeBestSellerProduct = createAsyncThunk('product/bestsellerproducts', async (limit, thunkAPI) => {
  try {
    const res = await getBestSellerProducts(limit)
    return res
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.name)
  }
})

export const findProductBySearch = createAsyncThunk('product/searchproduct', async (searchData, thunkAPI) => {
  try {
    const res = await findProduct(searchData)
    return res
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.name)
  }
})

export const getProductById = createAsyncThunk('product/productbyid', async (id, thunkAPI) => {
  try {
    const res = await getProduct(id)
    return res
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.name)
  }
})

export const getProductByCategory = createAsyncThunk('product/productbycategory', async (id, thunkAPI) => {
  try {
    const res = await getByCategory(id)
    return res
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.name)
  }
})

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProdFound: (state) => {
      state.listProdFound = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsMinInfo.fulfilled, (state, action) => {
        state.products = action.payload.data
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data
      })
      .addCase(getSomeDiscountProducts.fulfilled, (state, action) => {
        state.saleproduct = action.payload.data
      })
      .addCase(getSomeBestSellerProduct.fulfilled, (state, action) => {
        state.bestseller = action.payload.data
      })
      .addCase(findProductBySearch.fulfilled, (state, action) => {
        state.listProdFound = action.payload.data
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.productInfo = action.payload.data
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        state.listProdFound = action.payload.data
      })
  }
})

export const { clearProdFound } = productSlice.actions
export default productSlice.reducer

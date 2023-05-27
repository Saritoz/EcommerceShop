import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login, logout, register } from '../apis/auth'
import { saveMessage } from './messageSlice'
import {
  addProd2Cart,
  addProd2Wishlist,
  getProductInCart,
  getProductInWishList,
  removeProd2Cart,
  removeProd2Wishlist
} from '../apis/user'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  cart: [],
  wishList: []
}

export const loginUser = createAsyncThunk('user/login', async (data, thunkAPI) => {
  try {
    const res = await login(data)
    thunkAPI.dispatch(saveMessage({ message: res.message, error: false }))
    return res
  } catch (error) {
    thunkAPI.dispatch(saveMessage({ error: true, message: error.response.data.message }))
    return thunkAPI.rejectWithValue(error.response.data.name)
  }
})

export const logoutUser = createAsyncThunk('user/logout', async (data, thunkAPI) => {
  try {
    const res = await logout()
    thunkAPI.dispatch(saveMessage({ message: res.message, error: false }))
    return res.name
  } catch (error) {
    thunkAPI.dispatch(saveMessage({ error: true, message: error.response.data.message }))
    return thunkAPI.rejectWithValue(error.response.data.name)
  }
})

export const registerUSer = createAsyncThunk('user/register', async (data, thunkAPI) => {
  try {
    const res = await register(data)
    thunkAPI.dispatch(saveMessage({ message: res.message, error: false }))
    return res.name
  } catch (error) {
    thunkAPI.dispatch(saveMessage({ message: error.response.data.message, error: true }))
    return thunkAPI.rejectWithValue(error.response.data.name)
  }
})

export const addProdToCart = createAsyncThunk('user/addproduct2cart', async (data, thunkAPI) => {
  try {
    const res = await addProd2Cart(data)
    thunkAPI.dispatch(saveMessage({ message: res.message, error: false }))
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.name)
  }
})

export const removeProdToCart = createAsyncThunk('user/removeproduct2cart', async (id, thunkAPI) => {
  try {
    const res = await removeProd2Cart(id)
    thunkAPI.dispatch(saveMessage({ message: res.message, error: false }))
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.name)
  }
})

export const addProdToWishlist = createAsyncThunk('user/addproduct2wishlist', async (id, thunkAPI) => {
  try {
    const res = await addProd2Wishlist(id)
    thunkAPI.dispatch(saveMessage({ message: res.message, error: false }))
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.name)
  }
})

export const removeProdToWishlist = createAsyncThunk('user/removeproduct2wishlist', async (id, thunkAPI) => {
  try {
    const res = await removeProd2Wishlist(id)
    thunkAPI.dispatch(saveMessage({ message: res.message, error: false }))
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.name)
  }
})

export const getCartData = createAsyncThunk('user/getcartdata', async (data, thunkAPI) => {
  try {
    const res = await getProductInCart()
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.name)
  }
})

export const getWishlistData = createAsyncThunk('user/getwishlistdata', async (data, thunkAPI) => {
  try {
    const res = await getProductInWishList()
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.name)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const { accessToken, ...data } = action.payload.data
        state.user = data
        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('user', JSON.stringify(data))
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null
      })
      .addCase(addProdToCart.fulfilled, (state, action) => {
        state.user && (state.user.cart = action.payload.cart)
        localStorage.setItem('user', JSON.stringify(state.user))
      })
      .addCase(removeProdToCart.fulfilled, (state, action) => {
        state.user && (state.user.cart = action.payload.cart)
        localStorage.setItem('user', JSON.stringify(state.user))
      })
      .addCase(addProdToWishlist.fulfilled, (state, action) => {
        state.user && (state.user.wishList = action.payload.wishList)
        localStorage.setItem('user', JSON.stringify(state.user))
      })
      .addCase(removeProdToWishlist.fulfilled, (state, action) => {
        state.user && (state.user.wishList = action.payload.wishList)
        localStorage.setItem('user', JSON.stringify(state.user))
      })
      .addCase(getCartData.fulfilled, (state, action) => {
        state.cart = action.payload.cart || []
      })
      .addCase(getWishlistData.fulfilled, (state, action) => {
        state.wishList = action.payload || []
      })
  }
})

export const { clearCart } = userSlice.actions
export default userSlice.reducer

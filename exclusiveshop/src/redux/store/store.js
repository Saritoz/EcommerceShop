import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../slices/userSlice'
import messageSlice from '../slices/messageSlice'
import productSlice from '../slices/productSlice'

export default configureStore({
  reducer: {
    messageStore: messageSlice,
    userStore: userSlice,
    productStore: productSlice
  }
})

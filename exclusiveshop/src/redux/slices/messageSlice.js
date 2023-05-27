import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  error: false,
  message: ''
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    saveMessage: (state, action) => {
      state.message = action.payload.message
      state.error = action.payload?.error
    },
    clearMessage: (state) => {
      state.message = ''
    }
  }
})

export const { saveMessage, clearMessage } = messageSlice.actions
export default messageSlice.reducer

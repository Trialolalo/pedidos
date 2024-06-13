import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: []
  },
  reducers: {
    updateCart: (state, action) => {

    },
    removeCart: (state, action) => {
      state.cartProducts = []
    }
  }
})

export const { updateCart, removeCart } = cartSlice.actions

export default cartSlice.reducer

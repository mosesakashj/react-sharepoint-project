import { configureStore } from '@reduxjs/toolkit'
import userDetailsSlice from './userDetailsSlice'

export const store = configureStore({
  reducer: {
    userDetailsSlice
  },
})
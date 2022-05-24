import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  userDetails: null
}

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1
    // },
    updateUserDetails: (state, action) => {
      console.log(state, action)
      state.userDetails = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateUserDetails } = userDetailsSlice.actions

export default userDetailsSlice.reducer
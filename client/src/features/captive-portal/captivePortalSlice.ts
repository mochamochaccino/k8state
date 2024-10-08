import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

interface initial {
  address: string
  key: string
  init: boolean
}

const initialState: initial = {
  address: "",
  key: "",
  init: false,
}
//Creates a slice in global state for address, key, and init
export const portalSlice = createSlice({
  name: "portalSlice",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload
    },
    setKey: (state, action: PayloadAction<string>) => {
      state.key = action.payload
    },
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload
    },
  },
})
export const { setAddress, setKey, setInit } = portalSlice.actions

export default portalSlice.reducer

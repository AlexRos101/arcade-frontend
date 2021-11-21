import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import BigNumber from "bignumber.js"
import { SwapState } from "global/interface"
import { useSwap } from "hooks/useContract"


const initialState: SwapState = {
  arcadeDogeRate: new BigNumber(NaN),
  gamePointRate: new BigNumber(NaN),
}


export const fetchArcadeDogeRate = createAsyncThunk<BigNumber>(
  'swap/fetchArcadeDogeRate',
  async () => {
    const swap = useSwap()
    const result = await swap.methods.getArcadeDogeRate().call()
    return new BigNumber(result).div(10 ** 18)
  }
)

const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: { },
  extraReducers: builder => {
    builder.addCase(
      fetchArcadeDogeRate.fulfilled,
      (state, action: PayloadAction<BigNumber>) => {
        state.arcadeDogeRate = action.payload
      }
    )
  }
})


export default swapSlice.reducer
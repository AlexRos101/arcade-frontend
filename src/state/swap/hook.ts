import BigNumber from "bignumber.js"
import { State, SwapState } from "global/interface"
import { useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "state"
import { fetchArcadeDogeRate } from "."

export const useSwap = () => {
  const swap: SwapState = useSelector((state: State) => state.swap)
  return swap
}

export const useGetArcadeDogeRate = (): BigNumber => {
  const rate =  useSelector(
    (state: State) => {
      return state.swap.arcadeDogeRate
    }
  )

  return useMemo(() => {
    return rate
  }, [rate])
}


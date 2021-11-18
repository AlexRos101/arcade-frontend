import { State, ShowState } from "global/interface"
import { useSelector } from "react-redux"

export const useShow = () => {
  const shows: ShowState = useSelector((state: State) => state.show)
  return shows
}
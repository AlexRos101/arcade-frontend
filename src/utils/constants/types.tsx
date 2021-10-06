export interface SkinProps {
  item: string // current is background color
  category: string
  name: string
  description?: string
  priceArc: number
  priceArcPerUsd: number
  priceBnb: number
  priceBnbPerUsd: number
  visible: boolean
}

export interface SkinsProps {
  skins: SkinProps[]
}

export interface MapProps {
  item: string // current is background color
  category: string
  name: string
  description?: string
  priceArc: number
  priceArcPerUsd: number
  priceBnb: number
  priceBnbPerUsd: number
  visible: boolean
}

 export interface MapsProps {
  skins: MapProps[]
}


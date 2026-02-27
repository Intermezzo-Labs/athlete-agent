declare module "react-simple-maps" {
  import type { CSSProperties, MouseEvent, ReactNode } from "react"

  interface GeographyStyle {
    fill?: string
    stroke?: string
    strokeWidth?: number
    outline?: string
    cursor?: string
    transition?: string
  }

  interface GeographyStyleSet {
    default?: GeographyStyle
    hover?: GeographyStyle
    pressed?: GeographyStyle
  }

  interface GeographyProps {
    geography: GeoFeature
    style?: GeographyStyleSet
    onClick?: (event: MouseEvent<SVGPathElement>) => void
    onMouseEnter?: (event: MouseEvent<SVGPathElement>) => void
    onMouseLeave?: (event: MouseEvent<SVGPathElement>) => void
    className?: string
  }

  interface GeoFeature {
    rsmKey: string
    id?: string | number
    properties?: Record<string, unknown>
    [key: string]: unknown
  }

  interface GeographiesChildrenProps {
    geographies: GeoFeature[]
  }

  interface GeographiesProps {
    geography: string | Record<string, unknown>
    children: (props: GeographiesChildrenProps) => ReactNode
  }

  interface ComposableMapProps {
    projection?: string
    width?: number
    height?: number
    style?: CSSProperties
    className?: string
    children?: ReactNode
  }

  export function ComposableMap(props: ComposableMapProps): JSX.Element
  export function Geographies(props: GeographiesProps): JSX.Element
  export function Geography(props: GeographyProps): JSX.Element
}

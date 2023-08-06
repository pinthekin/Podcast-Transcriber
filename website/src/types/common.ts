import React from 'react'

export type ReactChildren = React.ReactNode | React.ReactNode[]

export interface ReactPropChildren {
  children: ReactChildren
}

export type SvgElement = HTMLElement & SVGElement

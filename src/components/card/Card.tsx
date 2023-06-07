import React, { PropsWithChildren } from "react"

import "./card.scss"

type CardPropsType = {
  top?: number
  right?: number
  bottom?: number
  left?: number
  width?: string
}

export const Card: React.FC<PropsWithChildren<CardPropsType>> = ({
  top = 35,
  right = 33,
  bottom = 42,
  left = 33,
  width = "400px",
  children,
}) => {
  const styles = { padding: `${top}px ${right}px ${bottom}px ${left}px`, width }
  return (
    <div className="card" style={styles}>
      {children}
    </div>
  )
}

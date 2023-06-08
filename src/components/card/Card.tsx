import React, { PropsWithChildren } from "react"

import "./card.scss"

type CardPropsType = {
  top?: string
  right?: string
  bottom?: string
  left?: string
  width?: string
}

export const Card: React.FC<PropsWithChildren<CardPropsType>> = ({
  top = "35px",
  right = "33px",
  bottom = "42px",
  left = "33px",
  width = "400px",
  children,
}) => {
  const styles = { padding: `${top} ${right} ${bottom} ${left}`, width }
  return (
    <div className="card" style={styles}>
      {children}
    </div>
  )
}

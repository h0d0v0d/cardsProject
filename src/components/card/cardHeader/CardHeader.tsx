import React from "react"

import "./cardHeader.scss"

type CardHeaderType = {
  value: string
  fontWeight?: string
  fontSize?: string
  color?: string
  marginTop?: string
  marginBottom?: string
}

export const CardHeader: React.FC<CardHeaderType> = ({
  value,
  fontWeight = "600",
  fontSize = "22px",
  color = "#000000",
  marginTop = 0,
  marginBottom = 0,
}) => {
  const styles = {
    fontWeight,
    fontSize,
    color,
    marginTop,
    marginBottom,
  }
  return (
    <h2 className="cardHeader" style={styles}>
      {value}
    </h2>
  )
}

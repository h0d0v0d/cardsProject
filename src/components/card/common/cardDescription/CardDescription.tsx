import React from "react"

import "./cardDescription.scss"

type CardDescriptionType = {
  value: string
  marginTop?: string
  marginBottom?: string
  textAlign?: "center" | "right" | "left" | "justify"
}

export const CardDescription: React.FC<CardDescriptionType> = ({
  value,
  marginTop = "20px",
  marginBottom = "20px",
  textAlign = "center",
}) => {
  const styles = { marginTop, marginBottom, textAlign }
  return (
    <p className="value" style={styles}>
      {value}
    </p>
  )
}

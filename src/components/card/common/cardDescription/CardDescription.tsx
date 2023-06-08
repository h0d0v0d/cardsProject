import React from "react"

import "./cardDescription.scss"

type CardDescriptionType = {
  value: string
  marginTop?: string
  marginBottom?: string
}

export const CardDescription: React.FC<CardDescriptionType> = ({
  value,
  marginTop = "20px",
  marginBottom = "20px",
}) => {
  const styles = { marginTop, marginBottom }
  return (
    <p className="value" style={styles}>
      {value}
    </p>
  )
}

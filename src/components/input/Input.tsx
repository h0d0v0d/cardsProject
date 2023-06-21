import React from "react"
import "./input.scss"

type InputProps = {
  width?: string
  height?: string
  color?: string
  variant: "standard" | "oulined"
}

const Input: React.FC<InputProps> = ({ variant, ...restProps }) => {
  return (
    <input type="text" style={restProps} className={variant}>
      <label htmlFor="">njnjhb</label>
    </input>
  )
}

export default Input

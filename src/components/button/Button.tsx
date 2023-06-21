import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react"
import "./button.scss"

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type ButtonPropsType = {
  width?: string
  height?: string
  borderRadius?: string
  marginTop?: string
} & DefaultButtonPropsType

export const Button: React.FC<ButtonPropsType> = ({
  width = "347px",
  height = "36px",
  borderRadius = "30px",
  marginTop = 0,
  ...restProps
}) => {
  const styles = {
    backgroundColor: "#366EFF",
    width,
    height,
    borderRadius,
    marginTop,
  }
  return <button className="button" {...restProps} style={styles} />
}

import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react"

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type ButtonPropsType = {
  width?: string
  height?: string
  borderRadius?: string
} & DefaultButtonPropsType

export const Button: React.FC<ButtonPropsType> = ({
  width = "347px",
  height = "36px",
  borderRadius = "30px",
  ...restProps
}) => {
  const styles = {
    backgroundColor: "#366EFF",
    width,
    height,
    borderRadius,
    color: "white",
  }
  return <button {...restProps} style={styles} />
}

export default Button

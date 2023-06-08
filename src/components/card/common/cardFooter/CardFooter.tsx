import React from "react"
import { Link, NavLink } from "react-router-dom"

import "./cardFooter.scss"

type CardFooterType = {
  text: string
  linkText: string
  path: string
}

export const CardFooter: React.FC<CardFooterType> = ({
  text,
  linkText,
  path,
}) => {
  return (
    <div className="cardFooter">
      <h2 className="text">{text}</h2>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        {linkText}
      </NavLink>
    </div>
  )
}

import React from "react"
import { NavLink } from "react-router-dom"

import { Card } from "@/components/card/Card"
import { CardHeader } from "@/components/card/common/cardHeader/CardHeader"
import { CardDescription } from "@/components/card/common/cardDescription/CardDescription"
import { Button } from "@/components/button/Button"

import "./checkEmail.scss"

export const CheckEmail = () => {
  return (
    <div className="check-email-page">
      <Card width="413px">
        <CardHeader value="Check Email" marginBottom="29px" />
        <div className="check-email-icon"></div>
        <CardDescription value="We’ve sent an Email with instructions to example@mail.com" />
        <NavLink to="/login">
          <Button>Back to login</Button>
        </NavLink>
      </Card>
    </div>
  )
}

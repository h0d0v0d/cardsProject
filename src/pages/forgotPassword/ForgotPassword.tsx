import React from "react"
import { FormGroup, TextField } from "@mui/material"
import { useForm } from "react-hook-form"

import { emailValidate } from "@/common/utilis/validate"
import { useAppDispatch } from "@/common/hooks"
import { authThunks } from "@/features/auth/auth.slice"

import { Card } from "@/components/card/Card"
import { CardHeader } from "@/components/card/common/cardHeader/CardHeader"
import { CardDescription } from "@/components/card/common/cardDescription/CardDescription"
import { CardFooter } from "@/components/card/common/cardFooter/CardFooter"
import { Button } from "@/components/button/Button"

import "./forgotPassword.scss"
import { Navigate, useNavigate } from "react-router-dom"

export const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  })
  const onSubmit = (values: { email: string }) => {
    console.log("submit")
    dispatch(authThunks.forgotPassword({ email: values.email }))
      .unwrap()
      .then(() => {
        navigate("/forgot-password/check-email")
        reset()
      })
  }
  return (
    <div className="forgot-password-page">
      <Card width="413px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <CardHeader value="Forgot your password?" />
            <TextField
              error={!!errors.email?.message}
              margin="dense"
              variant="standard"
              label={"Email"}
              helperText={errors.email?.message || " "}
              {...register("email", { validate: emailValidate })}
            />
            <CardDescription
              value="Enter your email address and we will send you further instructions"
              textAlign="left"
            />
            <Button type="submit" disabled={!isValid}>
              Send Instructions
            </Button>
            <CardFooter
              text="Did you remember your password?"
              linkText="Try logging in"
              path="/login"
            />
          </FormGroup>
        </form>
      </Card>
    </div>
  )
}

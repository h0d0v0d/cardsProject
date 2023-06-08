import { FormGroup, TextField } from "@mui/material"
import React from "react"
import { useForm } from "react-hook-form"

import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { authThunks } from "@/features/auth/auth.slice"
import {
  confirmPasswordValidate,
  emailValidate,
  passwordValidate,
} from "@/common/utilis/validate"

import { Card } from "@/components/card/Card"
import { CardHeader } from "@/components/card/common/cardHeader/CardHeader"
import { CardFooter } from "@/components/card/common/cardFooter/CardFooter"

import "./registrationPage.scss"
import { Navigate } from "react-router-dom"
import { CardDescription } from "@/components/card/common/cardDescription/CardDescription"

export const RegistrationPage = () => {
  const dispatch = useAppDispatch()
  const regiter = useAppSelector((state) => state.auth.register)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  })
  const onSubmit = (values: {
    email: string
    password: string
    confirmPassword: string
  }) => {
    const { email, password } = values
    dispatch(authThunks.register({ email, password }))
    reset()
  }
  const confirmPasswordValidateHandler = (confirmPassword: string) => {
    return confirmPasswordValidate(confirmPassword, watch().password)
  }
  if (regiter === "succes") {
    return <Navigate to="/profile" />
  }
  return (
    <div className="registrationPage">
      <Card width="520px">
        <CardHeader value={"Sign up"} marginBottom="41" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <TextField
              error={!!errors.email?.message}
              margin="dense"
              variant="standard"
              label={"Email"}
              helperText={errors.email?.message || " "}
              {...register("email", { validate: emailValidate })}
            />
            <TextField
              margin="dense"
              variant="standard"
              label="Password"
              type="password"
              error={!!errors.password?.message}
              helperText={errors.password?.message || " "}
              id="demo-helper-text-aligned"
              {...register("password", { validate: passwordValidate })}
            />
            <TextField
              margin="dense"
              variant="standard"
              label="Confirm password"
              type="password"
              error={!!errors.confirmPassword?.message}
              helperText={errors.confirmPassword?.message || " "}
              id="demo-helper-text-aligned"
              {...register("confirmPassword", {
                validate: confirmPasswordValidateHandler,
              })}
            />
          </FormGroup>
          <CardDescription value="Create new password and we will send you further instructions to email" />
          <button type="submit" disabled={!isValid}>
            Sign up
          </button>
          <CardFooter
            text="Already have an account?"
            linkText="Sign In"
            path="/login"
          />
        </form>
      </Card>
    </div>
  )
}

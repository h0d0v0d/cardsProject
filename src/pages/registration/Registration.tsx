import React from "react"
import { FormGroup, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { useAppDispatch } from "@/common/hooks"
import { authThunks } from "@/features/auth/auth.slice"
import {
  confirmPasswordValidate,
  emailValidate,
  passwordValidate,
} from "@/common/utilis/validate"

import { Card } from "@/components/card/Card"
import { CardHeader } from "@/components/card/common/cardHeader/CardHeader"
import { CardFooter } from "@/components/card/common/cardFooter/CardFooter"

import { Button } from "@/components/button/Button"

import "./registration.scss"

export const Registration = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
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
  const onSubmit = (data: {
    email: string
    password: string
    confirmPassword: string
  }) => {
    const { email, password } = data
    dispatch(authThunks.register({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/login")
        console.log("good")
      })
    reset()
  }
  const confirmPasswordValidateHandler = (confirmPassword: string) => {
    return confirmPasswordValidate(confirmPassword, watch().password)
  }
  return (
    <div className="registration-page">
      <Card width="413px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <CardHeader value={"Sign up"} marginBottom="41" />
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
              id="demo-helper-text-aligned_1"
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
            <Button type="submit" disabled={!isValid}>
              Sign up
            </Button>
            <CardFooter
              text="Already have an account?"
              linkText="Sign In"
              path="/login"
            />
          </FormGroup>
        </form>
      </Card>
    </div>
  )
}

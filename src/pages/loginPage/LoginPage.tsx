import React from "react"
import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom"
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material"

import { authThunks } from "../../features/auth/auth.slice"
import { emailValidate, passwordValidate } from "@/common/utilis/validate"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { LoginArgs } from "@/features/auth/auth.api"

import { Card } from "@/components/card/Card"
import { CardHeader } from "@/components/card/common/cardHeader/CardHeader"
import { CardFooter } from "@/components/card/common/cardFooter/CardFooter"

import "./loginPage.scss"

export const LoginPage = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      email: "maksimmarck@gmail.com",
      password: "gfhn-56hrSk-2vrt6",
      rememberMe: false,
    },
    mode: "onBlur",
  })
  const onSubmit = (data: LoginArgs) => {
    dispatch(authThunks.login(data))
    reset()
  }
  if (isAuth) {
    return <Navigate to={"/"} />
  }
  return (
    <div className="loginPage">
      <Card width="520px">
        <CardHeader value="Sign in" />
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
              error={!!errors.password?.message}
              margin="dense"
              variant="standard"
              label="Password"
              type="password"
              helperText={errors.password?.message || " "}
              {...register("password", { validate: passwordValidate })}
            />
            <FormControlLabel
              label={"Remember me"}
              control={<Checkbox {...register("rememberMe")} />}
            />
          </FormGroup>
          <button type="submit" disabled={!isValid}>
            Sign in
          </button>
        </form>
        <CardFooter
          text="Don't have an account?"
          linkText="Sign Up"
          path="/registration"
        />
      </Card>
    </div>
  )
}

import React from "react"
import { useForm } from "react-hook-form"
import { NavLink, Navigate } from "react-router-dom"
import { Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material"

import { authThunks } from "../../features/auth/auth.slice"
import { emailValidate, passwordValidate } from "@/common/utilis/validate"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { LoginArgs } from "@/features/auth/auth.api"

import { Card } from "@/components/card/Card"
import { CardHeader } from "@/components/card/common/cardHeader/CardHeader"
import { CardFooter } from "@/components/card/common/cardFooter/CardFooter"
import { Button } from "@/components/button/Button"

import "./loginPage.scss"

export const LoginPage = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      email: "maksimmarck@gmail.com",
      password: "gfhn-56hrSk-2vr9",
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
    <div className="login-page">
      <Card width="413px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <CardHeader value="Sign in" />
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
            <div className="forgot-password-wrapp">
              <NavLink
                to={"/forgot-password"}
                className={({ isActive }) =>
                  isActive ? "forgot-password active" : "forgot-password"
                }
              >
                Forgot Password?
              </NavLink>
            </div>
            <Button type="submit" disabled={!isValid}>
              Sign in
            </Button>
            <CardFooter
              text="Don't have an account?"
              linkText="Sign Up"
              path="/registration"
            />
          </FormGroup>
        </form>
      </Card>
    </div>
  )
}

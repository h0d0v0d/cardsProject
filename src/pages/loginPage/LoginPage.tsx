import React from "react"

import { Card } from "@/components/card/Card"
import { CardHeader } from "@/components/card/cardHeader/CardHeader"
import { authThunks } from "../../features/auth/auth.slice"

import "./lofinPage.scss"

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
} from "@mui/material"
import { useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { LoginArgs } from "@/features/auth/auth.api"
import { Navigate } from "react-router-dom"

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
      <Card width="600px">
        <CardHeader value="Log in" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <TextField
              error={!!errors.email?.message}
              margin="dense"
              variant="standard"
              label={"Email"}
              helperText={errors.email?.message}
              {...register("email", {
                required: true,
                minLength: {
                  message: "Min length its 10",
                  value: 10,
                },
                pattern:
                  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
              })}
            />
            <TextField
              margin="dense"
              variant="standard"
              label="Password"
              type="password"
              {...register("password", {
                required: true,
                minLength: {
                  message: "Min length its 10",
                  value: 10,
                },
              })}
            />
            <FormControlLabel
              label={"Remember me"}
              control={<Checkbox {...register("rememberMe")} />}
            />
            <input type="submit" disabled={!isValid} />
          </FormControl>
        </form>
      </Card>
    </div>
  )
}

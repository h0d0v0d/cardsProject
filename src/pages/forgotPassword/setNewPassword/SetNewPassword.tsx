import React from "react"
import { useForm } from "react-hook-form"
import { FormGroup, TextField } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"

import { passwordValidate } from "@/common/utilis/validate"
import { useAppDispatch } from "@/common/hooks"
import { authThunks } from "@/features/auth/auth.slice"

import { Card } from "@/components/card/Card"
import { CardHeader } from "@/components/card/common/cardHeader/CardHeader"
import { CardDescription } from "@/components/card/common/cardDescription/CardDescription"
import { Button } from "@/components/button/Button"

import "./setNewPassword.scss"

export const SetNewPassword = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      password: "",
    },
    mode: "onBlur",
  })
  const onSubmit = (data: { password: string }) => {
    if (params.token) {
      dispatch(
        authThunks.setNewPassword({
          password: data.password,
          resetPasswordToken: params.token,
        }),
      )
        .unwrap()
        .then(() => {
          navigate("/login")
          reset()
        })
    }
  }

  console.log(params)
  return (
    <div className="set-new-password-page">
      <Card width="413px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <CardHeader value="Create new password" />
            <TextField
              error={!!errors.password?.message}
              margin="dense"
              variant="standard"
              label="Password"
              type="password"
              helperText={errors.password?.message || " "}
              {...register("password", { validate: passwordValidate })}
            />
            <CardDescription
              value="Create new password and we will send you further instructions to email"
              textAlign="left"
            />
            <Button type="submit" disabled={!isValid}>
              Create new password
            </Button>
          </FormGroup>
        </form>
      </Card>
    </div>
  )
}

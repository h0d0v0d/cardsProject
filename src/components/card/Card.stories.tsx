import {
  Checkbox,
  FormGroup,
  TextField,
  FormControl,
  FormControlLabel,
} from "@mui/material"
import { Card } from "./Card"
import { CardHeader } from "./common/cardHeader/CardHeader"
import { useForm } from "react-hook-form"
import {
  confirmPasswordValidate,
  emailValidate,
  passwordValidate,
} from "@/common/utilis/validate"
import { CardFooter } from "./common/cardFooter/CardFooter"

export default {
  component: Card,
  title: "Card",
}

export const LoginCard = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      checkbox: false,
    },
    mode: "onBlur",
  })
  const onSubmit = (data: any) => console.log(data)
  return (
    <Card>
      <CardHeader value={"Sign in"} marginBottom="41" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
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
            variant="standard"
            label="password"
            margin="normal"
            type="password"
            {...register("password")}
          />
          <FormControlLabel
            label={"Remember me"}
            control={<Checkbox {...register("checkbox")} />}
          />
        </FormGroup>
        <button type="submit">Sign in</button>
      </form>
    </Card>
  )
}

export const RegistrationCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
  const onSubmit = (values: any) => console.log(values)
  const confirmPasswordValidateHandler = (confirmPassword: string) => {
    return confirmPasswordValidate(confirmPassword, watch().password)
  }

  return (
    <Card>
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
        <button type="submit">Sign up</button>
      </form>
    </Card>
  )
}

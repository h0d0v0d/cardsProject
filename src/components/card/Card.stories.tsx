import {
  Button,
  Checkbox,
  FormGroup,
  TextField,
  FormControl,
  FormControlLabel,
} from "@mui/material"
import { Card } from "./Card"
import { CardHeader } from "./cardHeader/CardHeader"
import { useForm } from "react-hook-form"

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
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      checkbox: false,
    },
  })
  const onSubmit = (data: any) => console.log(data)
  return (
    <Card>
      <CardHeader value={"Log in"} marginBottom="41" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <TextField
            label="email"
            variant="standard"
            margin="normal"
            {...register("email")}
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
        <input type="submit" />
      </form>
    </Card>
  )
}

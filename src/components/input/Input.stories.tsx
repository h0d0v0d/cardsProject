import Input from "./Input"

export default {
  component: Input,
  title: "Input",
}

export const StandartInput = () => {
  return <Input variant="standard" />
}

export const OulinedInput = () => {
  return <Input variant="oulined" />
}

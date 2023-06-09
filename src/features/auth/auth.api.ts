import { authInstance } from "./auth.instance"

const message = `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://127.0.0.1:5173/forgot-password/set-new-password/$token$'>
link</a>
</div>`

// const message = `<div style={"box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1);\\n" +    "border-radius: 2px; background-color: lime; padding: 15px; width: 300px;"}>password recovery link: <a href='http://localhost:3000/forgotPassword/setNewPassword/$token$'>link</a>`

export const authAPI = {
  registration: (params: RegisterArgs) =>
    authInstance.post<RegisterResponse>("register", params),
  login: (params: LoginArgs) => authInstance.post<User>("login", params),
  logout: () => authInstance.delete<LogoutResponse>("me"),
  me: () => authInstance.post<MeResponse>("me"),
  forgotPassword: (params: ForgotArgs) =>
    authInstance.post<ForgotResonse>("forgot", {
      email: params.email,
      message,
    }),
  setNewPassword: (params: SetNewPasswordArgs) =>
    authInstance.post<SetNewPasswordResponse>("set-new-password", params),
}

// Login
export type User = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
}
export type LoginArgs = {
  email: string
  password: string
  rememberMe: boolean
}

// Register
export type RegisterArgs = Pick<LoginArgs, "email" | "password">
export type RegisterResponse = {
  addedUser: AddedUser
}
export type AddedUser = Omit<User, "token" | "tokenDeathTime">

// Forgot
export type ForgotArgs = {
  email: string
}

export type ForgotResonse = {
  info: string
  error: string
}

// Logout
export type LogoutResponse = {
  info: string
  error: string
}

// Me
export type MeResponse = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number // количество колод
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean
  error?: string
}

// SetNewPassword
export type SetNewPasswordArgs = {
  password: string
  resetPasswordToken: string
}

type SetNewPasswordResponse = {
  info: string
  error?: string
}

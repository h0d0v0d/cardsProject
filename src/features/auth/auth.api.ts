import { authInstance } from "./auth.instance"

const message = `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='127.0.0.1:5173/set-new-password/$token$'>
link</a>
</div>`

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

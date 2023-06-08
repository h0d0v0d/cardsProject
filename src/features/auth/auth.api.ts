import { authInstance } from "./auth.instance"

export const authAPI = {
  registration: (params: RegisterArgs) =>
    authInstance.post<RegisterResponse>("register", params),
  login: (params: LoginArgs) => authInstance.post<User>("login", params),
  logout: () => authInstance.delete("me"),
  forgotPassword: (params: ForgotArgs) =>
    authInstance.post<ForgotResonse>("forgot", params),
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
  message: string
  from?: string
}

export type ForgotResonse = {
  info: string
  error: string
}

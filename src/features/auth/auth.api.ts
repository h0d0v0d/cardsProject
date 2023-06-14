import { authInstance } from "./auth.instance"

const message = `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://127.0.0.1:5173/forgot-password/set-new-password/$token$'>
link</a>
</div>`

export const authAPI = {
  registration: (params: RegisterArgs) => {
    return authInstance.post<RegisterResponse>("register", params)
  },
  login: (params: LoginArgs) => {
    return authInstance.post<User>("login", params)
  },
  logout: () => {
    return authInstance.delete<LogoutResponse>("me")
  },
  me: () => {
    return authInstance.post<MeResponse>("me")
  },
  forgotPassword: (params: ForgotArgs) => {
    const { email } = params
    return authInstance.post<ForgotResonse>("forgot", { email, message })
  },
  newPassword: (params: SetNewPasswordArgs) => {
    return authInstance.post<SetNewPasswordResponse>("set-new-password", params)
  },
  setUserData: (params: SetUserDataArgs) => {
    return authInstance.put<SetUserDataResponse>("me", params)
  },
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
  __v?: number
  token?: string
  tokenDeathTime?: number
  avatar?: string
}

export type LoginArgs = {
  email: string
  password: string
  rememberMe: boolean
}

// Register
export type RegisterArgs = Pick<LoginArgs, "email" | "password">
export type AddedUser = Omit<User, "token" | "tokenDeathTime">
export type RegisterResponse = {
  addedUser: AddedUser
}

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

export type MeResponse = Omit<User, "__v" | "token" | "tokenDeathTime"> & {
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

// SetNewName
export type SetUserDataArgs = {
  name?: string
  avatar?: string
}

export type SetUserDataResponse = {
  updatedUser: User
  error?: string
}

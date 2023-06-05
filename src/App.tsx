import { LinearProgress, ThemeProvider, createTheme } from "@material-ui/core"
import { ToastContainer } from "react-toastify"
import { useEffect } from "react"

import { Counter } from "./features/counter/Counter"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { ProfilePage } from "./features/profilePage/ProfilePage"
import { ErrorPage } from "./features/errorPage/ErrorPage"
import { LoginPage } from "./features/loginPage/LoginPage"
import { RecoveryAccountPage } from "./features/recoveryAccountPage/RecoveryAccountPage"
import { NewPasswordPage } from "./features/newPasswordPage/NewPasswordPage"
import { RegistrationPage } from "./features/registrationPage/RegistrationPage"
import { TestPage } from "./features/testPage/TestPage"

import { useAppDispatch, useAppSelector } from "./app/hooks"
import { appActions } from "./features/app/app.slice"
import { authThunks } from "./features/auth/auth.slice"

import "./App.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Counter />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/recovery",
    element: <RecoveryAccountPage />,
  },
  {
    path: "/new-password",
    element: <NewPasswordPage />,
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
  },
  {
    path: "/test",
    element: <TestPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
  {
    path: "*",
    element: <Navigate to="/error" />,
  },
])

const theme = createTheme()

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading)
  const user = useAppSelector((state) => state.auth.user._id)
  const dispatch = useAppDispatch()

  const login = () => {
    dispatch(
      authThunks.login({
        email: "maksimmarck@gmail.com",
        password: "gfhn-56hrSk-2vrt6",
        rememberMe: false,
      }),
    )
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setIsLoading({ isLoading: false }))
    }, 3000)
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <button onClick={login}>Login</button>
      {!user || <h2>Залогинен</h2>}
      {isLoading && <LinearProgress />}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App

import { LinearProgress, ThemeProvider, createTheme } from "@material-ui/core"
import { ToastContainer } from "react-toastify"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "./hooks/hooks"

import { Header } from "./components/header/Header"
import { ProfilePage } from "./pages/profilePage/ProfilePage"
import { ErrorPage } from "./pages/errorPage/ErrorPage"
import { LoginPage } from "./pages/loginPage/LoginPage"
import { ForgotPasswordPage } from "./pages/forgotPasswordPage/ForgotPasswordPage"
import { NewPasswordPage } from "./pages/newPasswordPage/NewPasswordPage"
import { RegistrationPage } from "./pages/registrationPage/RegistrationPage"
import { TestPage } from "./pages/testPage/TestPage"

import "./common/styles/null.css"
import "./App.css"
import { useEffect } from "react"
import { authThunks } from "./features/auth/auth.slice"

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProfilePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/recovery",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/set-new-password",
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
  const dispatch = useAppDispatch()
  const mess: string = `<div style="background-color: lime; padding: 15px">
  password recovery link: 
  <a href='http://localhost:3000/#/set-new-password/$token$'>
  link</a>
  </div>`
  useEffect(() => {
    console.log("app tsx useEffect")
    dispatch(authThunks.me({}))
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <Header />
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

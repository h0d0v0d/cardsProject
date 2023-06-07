import { LinearProgress, ThemeProvider, createTheme } from "@material-ui/core"
import { ToastContainer } from "react-toastify"
import { useEffect } from "react"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"

import { Header } from "./components/header/Header"
import { Counter } from "./features/counter/Counter"
import { ProfilePage } from "./pages/profilePage/ProfilePage"
import { ErrorPage } from "./pages/errorPage/ErrorPage"
import { LoginPage } from "./pages/loginPage/LoginPage"
import { RecoveryAccountPage } from "./pages/recoveryAccountPage/RecoveryAccountPage"
import { NewPasswordPage } from "./pages/newPasswordPage/NewPasswordPage"
import { RegistrationPage } from "./pages/registrationPage/RegistrationPage"
import { TestPage } from "./pages/testPage/TestPage"

import { useAppDispatch, useAppSelector } from "./hooks/hooks"
import { appActions } from "./features/app/app.slice"
import { authThunks } from "./features/auth/auth.slice"

import "./App.css"

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

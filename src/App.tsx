import { useEffect } from "react"
import { LinearProgress, ThemeProvider, createTheme } from "@material-ui/core"
import { ToastContainer } from "react-toastify"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"

import { authThunks } from "./features/auth/auth.slice"
import { useAppDispatch, useAppSelector } from "./hooks/hooks"

import { Header } from "./components/header/Header"
import { ProfilePage } from "./pages/profilePage/ProfilePage"
import { ErrorPage } from "./pages/errorPage/ErrorPage"
import { LoginPage } from "./pages/loginPage/LoginPage"
import { ForgotPasswordPage } from "./pages/forgotPasswordPage/ForgotPasswordPage"
import { SetNewPasswordPage } from "./pages/forgotPasswordPage/setNewPasswordPage/SetNewPasswordPage"
import { CheckEmailPage } from "./pages/forgotPasswordPage/checkEmailPage/CheckEmailPage"
import { RegistrationPage } from "./pages/registrationPage/RegistrationPage"
import { TestPage } from "./pages/testPage/TestPage"

import "./common/styles/null.css"
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
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/forgot-password/set-new-password/:token",
    element: <SetNewPasswordPage />,
  },
  {
    path: "/forgot-password/check-email",
    element: <CheckEmailPage />,
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
  useEffect(() => {
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

/* const routerr = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="profile" />,
      },
      { path: "register", element: <Register /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "forgotPassword/setNewPassword/:token",
        element: <SetNewPassword />,
      },
      {
        path: "forgotPassword/checkEmail",
        element: <CheckEmail />,
      },
      {
        path: "cards",
        element: <Cards />,
      },
      {
        path: "learn",
        element: <Learn />,
      },
      {
        path: "packs",
        element: <Packs />,
      },
      {
        path: "404",
        element: <Error404 />,
      },
      {
        path: "*",
        element: <Navigate to="404" />,
      },
    ],
  },
]) */

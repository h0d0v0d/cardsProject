import { ThemeProvider, createTheme } from "@material-ui/core"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"

import { store } from "./app/store"
import { Profile } from "./pages/profile/Profile"
import { Error } from "./pages/error/Error"
import { Login } from "./pages/login/Login"
import { ForgotPassword } from "./pages/forgotPassword/ForgotPassword"
import { SetNewPassword } from "./pages/forgotPassword/setNewPassword/SetNewPassword"
import { CheckEmail } from "./pages/forgotPassword/checkEmail/CheckEmail"
import { Registration } from "./pages/registration/Registration"
import { Layout } from "./components/layout/Layout"

import "react-toastify/dist/ReactToastify.css"
import "./common/styles/null.css"
import "./App.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Navigate to={"profile"} />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "forgot-password/set-new-password/:token",
        element: <SetNewPassword />,
      },
      {
        path: "forgot-password/check-email",
        element: <CheckEmail />,
      },
      {
        path: "registration",
        element: <Registration />,
      },
      {
        path: "error",
        element: <Error />,
      },
      {
        path: "*",
        element: <Navigate to="/error" />,
      },
    ],
  },
])

const theme = createTheme()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  )
}

export default App

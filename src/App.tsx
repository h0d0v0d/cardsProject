import { Counter } from "./features/counter/Counter"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { ProfilePage } from "./features/profilePage/ProfilePage"
import { ErrorPage } from "./features/errorPage/ErrorPage"

import "./App.css"
import { LoginPage } from "./features/loginPage/LoginPage"
import { RecoveryAccountPage } from "./features/recoveryAccountPage/RecoveryAccountPage"
import { NewPasswordPage } from "./features/newPasswordPage/NewPasswordPage"
import { RegistrationPage } from "./features/registrationPage/RegistrationPage"
import { TestPage } from "./features/testPage/TestPage"

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

function App() {
  return <RouterProvider router={router} />
}

export default App

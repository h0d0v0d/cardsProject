import React, { useEffect } from "react"
import { Header } from "../header/Header"
import { Outlet } from "react-router-dom"
import LinearProgress from "@mui/material/LinearProgress"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { authThunks } from "@/features/auth/auth.slice"
import { Toast } from "../toast/Toast"

export const Layout: React.FC = () => {
  const loading = useAppSelector((state) => state.app.isLoading)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(authThunks.me({}))
  }, [])
  return (
    <div>
      {loading && <LinearProgress />}
      <Header />
      <div className="main-content">
        <Outlet />
      </div>
      <Toast />
    </div>
  )
}

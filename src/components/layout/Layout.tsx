import React, { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Toast } from "../toast/Toast"
import LinearProgress from "@mui/material/LinearProgress"

import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { authThunks } from "@/features/auth/auth.slice"

import { Header } from "../header/Header"

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

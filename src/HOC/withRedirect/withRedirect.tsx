import { useAppSelector } from "@/hooks/hooks"
import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Loader from "../../components/loader/Loader"

export function withRedirect<T>(BaseComponent: FC<T>): FC<T> {
  return (props: any) => {
    const isAuth = useAppSelector((state) => state.auth.isAuth)
    const navigate = useNavigate()
    useEffect(() => {
      if (isAuth === false) {
        navigate("/login")
      }
    }, [isAuth, navigate])

    if (isAuth === null) {
      return <Loader />
    }
    return <BaseComponent {...props} />
  }
}

import axios from "axios"

export const packsInstanse = axios.create({
  baseURL: "https://neko-back.herokuapp.com/2.0/cards/pack",
  withCredentials: true,
})

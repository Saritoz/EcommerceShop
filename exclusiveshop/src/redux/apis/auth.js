import { axiosInstance } from './axiosinstance'

const axios = axiosInstance()

// login api
export const login = async (datalogin) => {
  const data = await axios.post('auth/login', datalogin)
  return data
}

// logout api
export const logout = async () => {
  const data = await axios.post('auth/logout')
  return data
}

// register api
export const register = async (registerData) => {
  const data = await axios.post('auth/register', registerData)
  return data
}

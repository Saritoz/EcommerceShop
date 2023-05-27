import axios from 'axios'

export const axiosInstance = () => {
  const newInstance = axios.create({
    baseURL: 'http://localhost:7777/v1/',
    timeout: 10000,
    withCredentials: true
  })

  newInstance.interceptors.request.use(
    (config) => {
      const access_token = localStorage.getItem('access_token')
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  newInstance.interceptors.response.use(
    (config) => {
      return config.data
    },
    async (error) => {
      if (error.response.status === 401 && error.response.data.name === 'EXPRIED_TOKEN') {
        await refreshToken()
        return newInstance(error.response.config)
      }
      return Promise.reject(error)
    }
  )

  return newInstance
}

const refreshToken = async () => {
  try {
    const res = await axiosInstance().post('auth/refresh')
    const { accessToken } = res
    localStorage.setItem('access_token', accessToken)
  } catch (error) {
    localStorage.clear()
    document.cookie = 'refreshToken' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    throw error.response
  }
}

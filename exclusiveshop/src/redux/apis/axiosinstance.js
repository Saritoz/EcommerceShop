import axios from 'axios'

export const axiosInstance = () => {
  const newInstance = axios.create({
    baseURL: 'https://exclusiveshop-be.vercel.app/v1/',
    timeout: 10000
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
    const refresh_token = localStorage.getItem('refresh_token')
    const res = await axiosInstance().post('auth/refresh', { refreshToken: refresh_token })
    const { accessToken } = res
    localStorage.setItem('access_token', accessToken)
  } catch (error) {
    localStorage.clear()
    throw error.response
  }
}

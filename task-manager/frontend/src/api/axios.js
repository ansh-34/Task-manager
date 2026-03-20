import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV
  ? '/api'
  : 'https://task-manager-1-8u9e.onrender.com/api')

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})

// Request interceptor to attach JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default axiosInstance

import axios from "axios"

const axiosInstance = axios.create({
  // baseURL: 'https://beautybytas.sytes.net',
  baseURL: 'beauty.soaroreality.com',
  // baseURL: 'https://c92109da85c626a82626328ae52584a0.serveo.net',
  // baseURL: "http://95.169.205.185:3200",
})

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from sessionStorage
    const userDetails = sessionStorage.getItem("userDetails")
    if (userDetails) {
      try {
        const parsedUserDetails = JSON.parse(userDetails)
        const token = parsedUserDetails.token || parsedUserDetails.accessToken || parsedUserDetails.access_token

        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      } catch (error) {
        console.error("Error parsing user details:", error)
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      sessionStorage.removeItem("userDetails")
      window.location.href = "/auth/login"
    }
    return Promise.reject(error)
  },
)

export default axiosInstance

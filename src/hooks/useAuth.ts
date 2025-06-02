import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import axiosInstance from "../services/axiosInstance"

interface LoginData {
  email: string
  password: string
}

interface SignUpData {
  name: string
  email: string
  address: string
  phonenumber: string
  password: string
  confirmPassword: string
}

interface UserDetails {
  user?: {
    email: string
    name: string
    id?: string
    userId?: string
  }
  token?: string
  accessToken?: string
  access_token?: string
}

// Get user details from session storage
const getUserDetails = (): UserDetails | null => {
  try {
    const userDetails = sessionStorage.getItem("userDetails")
    return userDetails ? JSON.parse(userDetails) : null
  } catch {
    return null
  }
}

export const useAuth = () => {
  const queryClient = useQueryClient()

  // Query for current user
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserDetails,
    staleTime: Number.POSITIVE_INFINITY,
  })

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await axiosInstance.post("/auth/login", data)
      return response.data
    },
    onSuccess: (data) => {
      toast.success(data.message || "Logged in successfully", {
        className: "text-green-500 font-semibold",
      })
      sessionStorage.setItem("userDetails", JSON.stringify(data))
      queryClient.setQueryData(["user"], data)

      // Invalidate cart to fetch user's cart after login
      queryClient.invalidateQueries({ queryKey: ["cart"] })

      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
      if (cartItems && cartItems.length > 0) {
        // Clear localStorage cart since we'll use server cart now
        localStorage.removeItem("cartItems")
        window.location.assign("/cart")
      } else {
        window.location.assign("/")
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.response?.data?.msg || "Failed to login user"
      toast.error(errorMessage, {
        className: "text-red-600",
      })
    },
  })

  // Sign up mutation
  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpData) => {
      const response = await axiosInstance.post("/auth/signup", data)
      return response.data
    },
    onSuccess: (data) => {
      toast.success(data.message || "Signed up successfully", {
        className: "text-green-500 font-semibold",
      })
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.response?.data?.msg || "Failed to sign up user"
      toast.error(errorMessage, {
        className: "text-red-600",
      })
    },
  })

  // Logout function
  const logout = () => {
    sessionStorage.removeItem("userDetails")
    localStorage.removeItem("cartItems") // Clear any local cart data
    queryClient.setQueryData(["user"], null)
    queryClient.clear()
    window.location.assign("/")
  }

  // Check if user is authenticated
  const isAuthenticated = !!(user?.token || user?.accessToken || user?.access_token)

  return {
    user,
    isUserLoading,
    isAuthenticated,
    login: loginMutation.mutate,
    signUp: signUpMutation.mutate,
    logout,
    isLoginLoading: loginMutation.isPending,
    isSignUpLoading: signUpMutation.isPending,
    loginError: loginMutation.error,
    signUpError: signUpMutation.error,
  }
}

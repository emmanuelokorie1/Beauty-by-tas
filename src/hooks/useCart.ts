import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import axiosInstance from "../services/axiosInstance"
import type { ProductType } from "../types/commonTypes"

interface CartItem extends ProductType {
  quantity?: number
}

interface AddToCartData {
  productId: string
  quantity: number
}

interface CartResponse {
  success: boolean
  data: {
    items: CartItem[]
  }
  message?: string
}

interface CheckoutData {
  email: string
  addressId?: string
  items?: any[]
  totalAmount?: number
}

// Get cart items from server - return the full response, not just the items
const getCartData = async (): Promise<CartResponse | null> => {
  try {
    // Check if user is authenticated
    const userDetails = sessionStorage.getItem("userDetails")
    if (!userDetails) {
      return null
    }

    const response = await axiosInstance.get<CartResponse>("/cart")
    return response.data
  } catch (error: any) {
    // If unauthorized, return null
    if (error.response?.status === 401) {
      return null
    }
    console.error("Failed to fetch cart items:", error)
    return null
  }
}

export const useCart = () => {
  const queryClient = useQueryClient()

  // Query for cart data from server
  const {
    data: cartData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartData,
    staleTime: 1000 * 60 * 2, // 2 minutes
    retry: (failureCount, error: any) => {
      // Don't retry if unauthorized
      if (error?.response?.status === 401) {
        return false
      }
      return failureCount < 2
    },
  })

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async (data: AddToCartData) => {
      // Check if user is authenticated
      const userDetails = sessionStorage.getItem("userDetails")
      if (!userDetails) {
        throw new Error("Please login to add items to cart")
      }

      const response = await axiosInstance.post("/cart/add", data)
      return response.data
    },
    onSuccess: (data) => {
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      toast.success(data.message || "Item added to cart successfully")
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        toast.error("Please login to add items to cart")
        return
      }
      const errorMessage = error.response?.data?.message || error.message || "Failed to add item to cart"
      toast.error(errorMessage)
    },
  })

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      const response = await axiosInstance.delete(`/cart/${productId}`)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      toast.success(data.message || "Item removed from cart")
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to remove item from cart"
      toast.error(errorMessage)
    },
  })

  // Update quantity mutation
  const updateQuantityMutation = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string
      quantity: number
    }) => {
      const response = await axiosInstance.put(`/cart/${productId}`, {
        quantity,
      })
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      toast.success(data.message || "Cart updated successfully")
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to update cart"
      toast.error(errorMessage)
    },
  })

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete("/cart/clear")
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      toast.success(data.message || "Cart cleared successfully")
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to clear cart"
      toast.error(errorMessage)
    },
  })

  // Checkout mutation - Updated to support addressId
  const checkoutMutation = useMutation({
    mutationFn: async (data: CheckoutData) => {
      // Prepare checkout data
      const checkoutData: CheckoutData = {
        email: data.email,
        // Only include addressId if provided
        ...(data.addressId && { addressId: data.addressId }),
      }

      // Include items and totalAmount if provided
      if (data.items) {
        checkoutData.items = data.items
        checkoutData.totalAmount = data.totalAmount
      }

      const response = await axiosInstance.post("/cart/checkout", checkoutData)
      return response.data
    },
    onSuccess: (data) => {
      toast.success(data.message || "Checkout initiated successfully", {
        className: "text-green-500 font-semibold",
      })
      if (data?.data?.authorization_url) {
        window.location.assign(data.data.authorization_url)
      }
      // Clear cart after successful checkout
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.response?.data?.msg || "Failed to process checkout"
      toast.error(errorMessage, {
        className: "text-red-600",
      })
    },
  })

  // Helper function to add item to cart with just productId
  const addToCart = (productId: string, quantity = 1) => {
    addToCartMutation.mutate({ productId, quantity })
  }

  // Extract cart items from the response data
  const cartItems = cartData?.data?.items || []

  // Helper function to get cart count
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0)

  return {
    cartItems,
    cartCount,
    isLoading,
    error,
    addToCart,
    removeFromCart: removeFromCartMutation.mutate,
    updateQuantity: updateQuantityMutation.mutate,
    clearCart: clearCartMutation.mutate,
    checkout: checkoutMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
    isRemovingFromCart: removeFromCartMutation.isPending,
    isUpdatingQuantity: updateQuantityMutation.isPending,
    isCheckingOut: checkoutMutation.isPending,
    checkoutError: checkoutMutation.error,
  }
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import axiosInstance from "../services/axiosInstance"

// Update the Address interface to use isDefaultAddress instead of isDefault
export interface Address {
  id?: string
  address: string
  city: string
  state: string
  country: string
  isDefaultAddress?: boolean
}

export const useAddresses = () => {
  const queryClient = useQueryClient()

  // Fetch all addresses
  const {
    data: addresses = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const response = await axiosInstance.get("/customers/addresses")
      // Change from response.data.addresses to response.data.data
      return response.data.data || []
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  // Add a new address
  const addAddressMutation = useMutation({
    mutationFn: async (addressData: Address) => {
      const response = await axiosInstance.post("/customers/address", addressData)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] })
      toast.success(data.message || "Address added successfully")
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to add address"
      toast.error(errorMessage)
    },
  })

  // Update an existing address
  const updateAddressMutation = useMutation({
    mutationFn: async ({ id, ...addressData }: Address & { id: string }) => {
      const response = await axiosInstance.put(`/customers/address/${id}`, addressData)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] })
      toast.success(data.message || "Address updated successfully")
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to update address"
      toast.error(errorMessage)
    },
  })

  // Delete an address
  const deleteAddressMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/customers/address/${id}`)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] })
      toast.success(data.message || "Address deleted successfully")
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to delete address"
      toast.error(errorMessage)
    },
  })

  // Update the getDefaultAddress function to use isDefaultAddress
  const getDefaultAddress = () => {
    return addresses.find((address: Address) => address.isDefaultAddress === true)
  }

  return {
    addresses,
    isLoading,
    error,
    refetch,
    addAddress: addAddressMutation.mutate,
    updateAddress: updateAddressMutation.mutate,
    deleteAddress: deleteAddressMutation.mutate,
    isAddingAddress: addAddressMutation.isPending,
    isUpdatingAddress: updateAddressMutation.isPending,
    isDeletingAddress: deleteAddressMutation.isPending,
    getDefaultAddress,
  }
}

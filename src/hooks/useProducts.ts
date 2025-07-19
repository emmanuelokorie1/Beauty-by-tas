import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../services/axiosInstance"
import type { ProductType } from "../types/commonTypes"

export const useProducts = (categoryId?: string) => {
  return useQuery({
    queryKey: ["products", categoryId],
    queryFn: async (): Promise<ProductType[]> => {
      if (!categoryId) return []
      const response = await axiosInstance.get(`/category/${categoryId}/products/`)
      return response.data?.data || []
    },
    enabled: !!categoryId,
  })
}

export const useProduct = (productId?: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (!productId) return null
      const response = await axiosInstance.get(`product/details/${productId}`)
      return response.data?.results
    },
    enabled: !!productId,
  })
}

// export const useProduct = (productId?: string) => {
//   return useQuery({
//     queryKey: ["product", productId],
//     queryFn: async () => {
//       if (!productId) return null
//       const response = await axiosInstance.get(`product/details/${productId}`)
//       return response.data?.results
//     },
//     enabled: !!productId,
//   })
// }
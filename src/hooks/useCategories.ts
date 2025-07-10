import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../services/axiosInstance"
import type { CategoryType } from "../types/commonTypes"

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<CategoryType[]> => {
      const response = await axiosInstance.get("/category/client?type=all")
      return response.data.categories || []
    },
  })
}

export const useBestSeller = () => {
  return useQuery({
    queryKey: ["best-selling"],
    queryFn: async (): Promise<any> => {
      const response = await axiosInstance.get("/product/best-selling")
      return response.data || []
    },
  })
}

export const useAlmostSoldOut = () => {
  return useQuery({
    queryKey: ["almost-sold-out"],
    queryFn: async (): Promise<any> => {
      const response = await axiosInstance.get("/product/almost-sold-out")
      return response.data || []
    },
  })
}

export const useNewProduct = () => {
  return useQuery({
    queryKey: ["new-product"],
    queryFn: async (): Promise<any> => {
      const response = await axiosInstance.get("/product/new")
      return response.data || []
    },
  })
}

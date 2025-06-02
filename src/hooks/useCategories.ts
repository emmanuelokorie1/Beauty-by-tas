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

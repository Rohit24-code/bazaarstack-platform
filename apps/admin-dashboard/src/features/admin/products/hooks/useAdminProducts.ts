import { useEffect } from "react"
import { useProductStore } from "../store"

export function useAdminProducts() {
  const { search, fetchCategories, fetchProducts } = useProductStore()

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(search)
    }, 250)

    return () => clearTimeout(timer)
  }, [search, fetchProducts])
}

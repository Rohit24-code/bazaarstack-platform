import { useEffect, useMemo } from "react"
import { useAdminPromoStore } from "./useAdminPromStore"

export const useAdminPromoManager = () => {
  const { refreshAll, search, promos } = useAdminPromoStore()

  useEffect(() => {
    refreshAll()
  }, [])

  const filteredPromos = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return promos
    return promos.filter((promo) => promo.code.toLowerCase().includes(query))
  }, [])

  return {
    filteredPromos,
  }
}

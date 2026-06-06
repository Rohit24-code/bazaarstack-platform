import type { PromoFormValues } from "@/features/admin/Promo/types"

export const defaultForm: PromoFormValues = {
  code: "",
  percentage: "",
  count: "",
  minimumOrderValue: "",
  startsAt: "",
  endsAt: "",
}

import type { PromoFormValues } from "@/features/admin/Promo/types"
import React, { useEffect, useState } from "react"
import { defaultForm } from "./constants"
import { useAdminPromoStore } from "@/features/admin/Promo/useAdminPromStore"
import { toDateTimeLocal } from "@/lib/functions"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { promoDialogStyles } from "@/pages/admin/constants"

const PromoDialog = () => {
  const {
    editingPromo: promo,
    savePromo: onSaved,
    promoDialogOpen: open,
    setPromoDialogToggle: onPromoToogle,
    saving,
  } = useAdminPromoStore()
  const [form, setForm] = useState<PromoFormValues>(defaultForm)
  const [errors, setErrors] = useState<Partial<Record<keyof PromoFormValues, string>>>({})
  const isEditMode = !!promo

  useEffect(() => {
    if (!open) {
      setForm(defaultForm)
      setErrors({})
      return
    }

    if (promo) {
      setForm({
        code: promo.code,
        percentage: String(promo.percentage),
        count: String(promo.count),
        minimumOrderValue: String(promo.minimumOrderValue),
        startsAt: toDateTimeLocal(promo.startsAt),
        endsAt: toDateTimeLocal(promo.endsAt),
      })
      setErrors({})
      return
    }

    setForm(defaultForm)
    setErrors({})
  }, [open, promo])

  function updateField<K extends keyof PromoFormValues>(
    key: K,
    value: PromoFormValues[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }))
    }
  }

  async function submit() {
    const newErrors: Partial<Record<keyof PromoFormValues, string>> = {}

    if (!form.code.trim()) {
      newErrors.code = "Promo code is required"
    }

    const percentage = Number(form.percentage)
    if (Number.isNaN(percentage) || percentage < 1 || percentage > 100) {
      newErrors.percentage = "Percentage must be between 1 and 100"
    }

    const count = Number(form.count)
    if (!Number.isInteger(count) || count < 1) {
      newErrors.count = "Promo count must be at least 1"
    }

    const minimumOrderValue = Number(form.minimumOrderValue)
    if (Number.isNaN(minimumOrderValue) || minimumOrderValue < 0) {
      newErrors.minimumOrderValue = "Minimum order value must be 0 or more"
    }

    const startsAtDate = new Date(form.startsAt)
    const endsAtDate = new Date(form.endsAt)

    if (Number.isNaN(startsAtDate.getTime())) {
      newErrors.startsAt = "Valid start time is required"
    }
    if (Number.isNaN(endsAtDate.getTime())) {
      newErrors.endsAt = "Valid end time is required"
    }
    
    if (
      !Number.isNaN(startsAtDate.getTime()) && 
      !Number.isNaN(endsAtDate.getTime()) && 
      endsAtDate <= startsAtDate
    ) {
      newErrors.endsAt = "End time should be after start time"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await onSaved({
        code: form.code.trim().toUpperCase(),
        percentage: form.percentage,
        count: form.count,
        minimumOrderValue: form.minimumOrderValue,
        startsAt: startsAtDate.toISOString(),
        endsAt: endsAtDate.toISOString(),
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => onPromoToogle(!open)}>
      <DialogContent className={promoDialogStyles.dialogContentClass}>
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Promo" : "Add Promo"}</DialogTitle>
        </DialogHeader>
        <div className={promoDialogStyles.layoutClass}>
          <div className={promoDialogStyles.firstRowClass}>
            <div className={promoDialogStyles.fieldWrapClass}>
              <Label>Promo Code</Label>
              <Input
                className={`${promoDialogStyles.inputClass} ${errors.code ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                type="text"
                value={form.code}
                placeholder="SUMMARY10"
                onChange={(e) => updateField("code", e.target.value)}
              />
              {errors.code && <span className="text-sm text-red-500 mt-1">{errors.code}</span>}
            </div>

            <div className={promoDialogStyles.fieldWrapClass}>
              <Label>Discount Percentage</Label>
              <Input
                className={`${promoDialogStyles.inputClass} ${errors.percentage ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                type="number"
                min={"1"}
                max={"100"}
                value={form.percentage}
                placeholder="10"
                onChange={(e) => updateField("percentage", e.target.value)}
              />
              {errors.percentage && <span className="text-sm text-red-500 mt-1">{errors.percentage}</span>}
            </div>
          </div>

          <div className={promoDialogStyles.secondRowClass}>
            <div className={promoDialogStyles.fieldWrapClass}>
              <Label>Promo Count</Label>
              <Input
                className={`${promoDialogStyles.inputClass} ${errors.count ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                type="number"
                min={"1"}
                value={form.count}
                placeholder="100"
                onChange={(e) => updateField("count", e.target.value)}
              />
              {errors.count && <span className="text-sm text-red-500 mt-1">{errors.count}</span>}
            </div>

            <div className={promoDialogStyles.fieldWrapClass}>
              <Label>Minimum Order Value</Label>
              <Input
                className={`${promoDialogStyles.inputClass} ${errors.minimumOrderValue ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                type="number"
                min={"0"}
                value={form.minimumOrderValue}
                placeholder="999"
                onChange={(e) =>
                  updateField("minimumOrderValue", e.target.value)
                }
              />
              {errors.minimumOrderValue && <span className="text-sm text-red-500 mt-1">{errors.minimumOrderValue}</span>}
            </div>
          </div>

          <div className={promoDialogStyles.thirdRowClass}>
            <div className={promoDialogStyles.fieldWrapClass}>
              <Label>Valid From</Label>
              <Input
                className={`${promoDialogStyles.inputClass} ${errors.startsAt ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                type="datetime-local"
                value={form.startsAt}
                onChange={(e) => updateField("startsAt", e.target.value)}
              />
              {errors.startsAt && <span className="text-sm text-red-500 mt-1">{errors.startsAt}</span>}
            </div>

            <div className={promoDialogStyles.fieldWrapClass}>
              <Label>Valid Till</Label>
              <Input
                className={`${promoDialogStyles.inputClass} ${errors.endsAt ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                type="datetime-local"
                value={form.endsAt}
                onChange={(e) => updateField("endsAt", e.target.value)}
              />
              {errors.endsAt && <span className="text-sm text-red-500 mt-1">{errors.endsAt}</span>}
            </div>
          </div>

          <div className={promoDialogStyles.footerClass}>
            <Button
              className={promoDialogStyles.outlineButtonClass}
              variant={"secondary"}
              onClick={() => onPromoToogle(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={submit}
              disabled={saving}
              className={promoDialogStyles.primaryButtonClass}
            >
              {saving
                ? "Saving..."
                : isEditMode
                  ? "Update Promo"
                  : "Create Promo"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PromoDialog

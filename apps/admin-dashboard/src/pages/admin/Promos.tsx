import React from "react"
import { promoStyles } from "./constants"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PromoToolbar from "@/components/promos/PromoToolbar"
import PromoTable from "@/components/promos/PromoTable"
import PromoDialog from "@/components/promos/PromoDilog"
import { useAdminPromoManager } from "@/features/admin/Promo/useAdminPromoManager"

function AdminPromos() {
  useAdminPromoManager()
  return (
    <div className={promoStyles.pageWrapClass}>
      <Card className={promoStyles.cardClass}>
        <CardHeader className={promoStyles.cardHeaderClass}>
          <CardTitle className={promoStyles.cardTitleClass}>Promos</CardTitle>
          <PromoToolbar
          />
        </CardHeader>

        <CardContent>
          <PromoTable
          />
        </CardContent>
      </Card>

      <PromoDialog />
    </div>
  )
}

export default AdminPromos

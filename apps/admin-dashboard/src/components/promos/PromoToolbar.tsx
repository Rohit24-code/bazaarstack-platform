import { useAdminPromoUiStore } from "@/features/admin/Promo/useAdminPromStore";
import { promoToolbarStyles } from "@/pages/admin/constants";
import { Button } from "@ecom/ui-core";
import { Input } from "@ecom/ui-core";
import { Plus, Search } from "lucide-react";

const PromoToolbar = () => {
  const { search, setSearch, onAddPromo } = useAdminPromoUiStore();
  return (
    <div className={promoToolbarStyles.wrapClass}>
      <div className={promoToolbarStyles.searchWrapClass}>
        <Search className={promoToolbarStyles.searchIconClass} />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search Promos"
          className={promoToolbarStyles.searchInputClass}
        />
      </div>

      <Button
        onClick={onAddPromo}
        className={promoToolbarStyles.addButtonClass}
      >
        <Plus className={promoToolbarStyles.addButtonIconClass} />
        Add promo
      </Button>
    </div>
  );
};

export default PromoToolbar;

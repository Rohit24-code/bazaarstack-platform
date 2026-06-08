import { Button } from "@ecom/ui-core";
import { SIZE_OPTIONS } from "@/features/admin/products/constants";
import { sizeStyles } from "./constants";

type SizeSelectorProps = {
  selectedSizes: string[];
  onToggle: (size: string) => void;
};

export function SizeSelector({ onToggle, selectedSizes }: SizeSelectorProps) {
  return (
    <div className={sizeStyles?.wrapperClass}>
      <div className={sizeStyles?.headerClass}>
        <h3 className={sizeStyles?.titleClass}>Sizes</h3>
      </div>
      <div className={sizeStyles?.gridClass}>
        {SIZE_OPTIONS.map((sizeItem) => {
          const active = selectedSizes.includes(sizeItem);

          return (
            <Button
              className={sizeStyles?.sizeButtonClass}
              onClick={() => onToggle(sizeItem)}
              key={sizeItem}
              type="button"
              variant={active ? "default" : "outline"}
            >
              {sizeItem}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

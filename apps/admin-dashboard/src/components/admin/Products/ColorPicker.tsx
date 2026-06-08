import { Button } from "@ecom/ui-core";
import { Input } from "@ecom/ui-core";
import { X } from "lucide-react";
import { useState } from "react";
import { colorStyles } from "./constants";

type ColorPickerProps = {
  colors: string[];
  onAdd: (color: string) => void;
  onRemove: (color: string) => void;
};

export function ColorPicker({ colors, onAdd, onRemove }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState("#111111");

  return (
    <div className={colorStyles?.wrapperClass}>
      <div className={colorStyles?.headerClass}>
        <h3 className={colorStyles.titleClass}>Colors</h3>
      </div>

      <div className={colorStyles.actionsRowClass}>
        <Input
          value={selectedColor}
          onChange={(event) => setSelectedColor(event.target.value)}
          type="color"
          className={colorStyles.colorInputClass}
        />

        <Button
          onClick={() => onAdd(selectedColor)}
          type="button"
          variant="secondary"
        >
          Add Color
        </Button>
      </div>

      <div className={colorStyles.colorsListClass}>
        {colors.map((colorItem) => (
          <button
            key={colorItem}
            type="button"
            onClick={() => onRemove(colorItem)}
            className={colorStyles.colorChipClass}
          >
            <span
              className={colorStyles.colorDotClass}
              style={{ backgroundColor: colorItem }}
            />
            <X className={colorStyles.removeIconClass} />
          </button>
        ))}
      </div>
    </div>
  );
}

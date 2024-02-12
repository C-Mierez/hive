import { Button } from "~/components/ui/button";
import { UserColors, colorToRGBA } from "~/lib/utils";
import { Color } from "~/types/canvas";

interface ColorPickerParams {
  onChange: (color: Color) => void;
}

export default function ColorPicker({ onChange }: ColorPickerParams) {
  return (
    <div className="flex gap-2">
      {/* TODO: Create an rgb picker */}
      {UserColors.map((color, index) => {
        return (
          <ColorButton
            key={index}
            color={{
              r: parseInt(color.slice(1, 3), 16),
              g: parseInt(color.slice(3, 5), 16),
              b: parseInt(color.slice(5, 7), 16),
              a: 1,
            }}
            onClick={onChange}
          />
        );
      })}
    </div>
  );
}

interface ColorButtonParams {
  color: Color;
  onClick: (color: Color) => void;
}

function ColorButton({ color, onClick }: ColorButtonParams) {
  return (
    <Button
      size={"icon"}
      style={{
        backgroundColor: colorToRGBA(color),
      }}
      onClick={() => {
        onClick(color);
      }}
    ></Button>
  );
}

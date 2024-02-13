import Hint from "~/components/hint";
import { Button } from "~/components/ui/button";

interface ToolButtonParams {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
  isActive?: boolean;
}

export default function ToolButton({
  label,
  children,
  onClick,
  isDisabled,
  isActive,
}: ToolButtonParams) {
  return (
    <Hint label={label} side="right">
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size={"icon"}
        variant={isActive ? "darkColored" : "secondary"}
      >
        {children}
      </Button>
    </Hint>
  );
}

import { cn } from "~/lib/utils";
import css from "./loaders.module.scss";

export default function SquareLoader({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = size === "sm" ? css.sm : size === "md" ? css.md : css.lg;

  return (
    <div className={cn(css.squareWrapper, sizeClass)}>
      <div className={css.squareLoader}></div>
    </div>
  );
}

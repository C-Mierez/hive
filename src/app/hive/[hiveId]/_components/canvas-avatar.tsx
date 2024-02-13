import Hint from "~/components/hint";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

interface CanvasAvatarParams {
  src?: string;
  name?: string;
  fallback?: string;
  color?: string;
}

export default function CanvasAvatar({
  src,
  name,
  fallback,
}: CanvasAvatarParams) {
  return (
    <Hint label={name ?? "Fellow Bee"} side="bottom">
      <Avatar className="h-8 w-8 rounded-sm">
        <AvatarImage src={src} />
        <AvatarFallback className="text-sm font-medium">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
}

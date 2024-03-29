import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";
import Hint from "~/components/hint";
import { cn } from "~/lib/utils";

interface ItemParams {
  id: string;
  name: string;
  imageUrl: string;
}

export default function ColonyItem({ id, name, imageUrl }: ItemParams) {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;

    void setActive({ organization: id });
  };

  return (
    <div className="relative aspect-square">
      <Hint label={name} side="right" align="start">
        <Image
          alt={name}
          src={imageUrl}
          onClick={onClick}
          fill
          className={cn(
            "brutalHover_sm cursor-pointer rounded-sm border-global_sm opacity-75 transition hover:opacity-100",
            isActive && "opacity-100",
          )}
        />
      </Hint>
    </div>
  );
}

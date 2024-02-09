"use client";

import { useAuth } from "@clerk/nextjs";
import {
  DotsVerticalIcon,
  StarFilledIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { api } from "~/../convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import HiveActions from "~/components/hive-actions";
import handleConvexPending from "~/lib/handle-convex-pending";
import { cn } from "~/lib/utils";

interface HiveCardParams {
  id: string;
  title: string;
  colonyId: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  imageUrl: string;
  isFavourite: boolean;
}

export default function HiveCard({
  id,
  title,
  colonyId,
  authorId,
  authorName,
  createdAt,
  imageUrl,
  isFavourite,
}: HiveCardParams) {
  const { userId } = useAuth();
  const [pendingFavourite, setPendingFavourite] = useState(false);
  const [pendingUnfavourite, setPendingUnfavourite] = useState(false);
  const mFavourite = useMutation(api.hive.favourite);
  const mUnfavourite = useMutation(api.hive.unfavourite);

  const toggleFavourite = async () => {
    if (isFavourite) {
      toast.promise(
        handleConvexPending(
          mUnfavourite({ hiveId: id as Id<"hive"> }),
          setPendingUnfavourite,
        ),
        {
          loading: "Removing from favourites...",
          success: "Removed from favourites.",
          error: "Failed to remove from favourites.",
        },
      );
    } else {
      toast.promise(
        handleConvexPending(
          mFavourite({ hiveId: id as Id<"hive">, colonyId }),
          setPendingFavourite,
        ),
        {
          loading: "Adding to favourites...",
          success: "Added to favourites!",
          error: "Failed to add to favourites.",
        },
      );
    }
  };

  const authorLabel = userId === authorId ? "You" : authorName;

  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  return (
    <div className="brutalHover group relative flex aspect-video flex-col items-center justify-end gap-4  overflow-clip rounded-sm border-global_sm">
      <button
        onClick={toggleFavourite}
        disabled={pendingFavourite || pendingUnfavourite}
        className={cn(
          "group/favourite absolute left-0 top-0 z-[1] rounded-br-sm border-b-global_sm border-r-global_sm bg-foreground p-3 transition",
          !isFavourite && "-translate-x-full group-hover:translate-x-0",
        )}
      >
        {!isFavourite && (
          <StarIcon className="h-6 w-6 text-background group-hover/favourite:text-primary" />
        )}
        {isFavourite && (
          <StarFilledIcon className="h-6 w-6 text-background group-hover/favourite:text-primary" />
        )}
      </button>
      <Link href={`/hive/${id}`}>
        <div className="absolute left-0 top-0 z-0 h-full w-full">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            className="rounded-sm object-cover transition group-hover:scale-[1.1]"
          />
        </div>
      </Link>
      <div className="z-[1] w-full cursor-default border-t-global_sm bg-background">
        <div className="flex items-center p-4">
          <div className="flex flex-1 flex-col justify-center">
            <h1 className="w-fit text-lg font-bold">{title}</h1>
            <p className="w-fit text-sm text-muted-foreground">
              {authorLabel}, {createdAtLabel}
            </p>
          </div>
          <HiveActions id={id} title={title} side="right">
            <button className="px-4 text-muted-foreground hover:text-foreground">
              <DotsVerticalIcon className="h-5 w-5 translate-x-4" />
            </button>
          </HiveActions>
        </div>
      </div>
    </div>
  );
}

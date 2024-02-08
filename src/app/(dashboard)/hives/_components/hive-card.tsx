"use client";

import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  DotsVerticalIcon,
  StarFilledIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import HiveActions from "~/components/hive-actions";
import { Button } from "~/components/ui/button";

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

  const authorLabel = userId === authorId ? "You" : authorName;

  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  return (
    <Link
      href={`/hives/${id}`}
      className="border-global_sm group relative flex aspect-video flex-col items-center justify-end gap-4  overflow-clip rounded-sm hover:shadow-brutal_sm"
    >
      <button className="border-l-global_sm border-b-global_sm group/favourite absolute right-0 top-0 translate-x-full rounded-bl-sm bg-foreground p-3 transition  group-hover:translate-x-0">
        {!isFavourite && (
          <StarIcon className="h-6 w-6 text-background group-hover/favourite:text-primary" />
        )}
        {isFavourite && (
          <StarFilledIcon className="h-6 w-6 text-background group-hover/favourite:text-primary" />
        )}
      </button>
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          className="rounded-sm object-cover transition group-hover:scale-[1.1]"
        />
      </div>
      <div className="z-1 border-t-global_sm w-full bg-background">
        <div className="flex items-center p-4">
          <div className="flex flex-1 flex-col justify-center">
            <h1 className="text-lg font-bold">{title}</h1>
            <p className="text-sm text-muted-foreground">
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
    </Link>
  );
}

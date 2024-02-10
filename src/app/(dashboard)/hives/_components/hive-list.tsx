"use client";

import { useQuery } from "convex/react";
import EmptyFavourites from "./empty-favourites";
import EmptyHives from "./empty-hives";
import EmptySearch from "./empty-search";
import { api } from "@/convex/_generated/api";
import SquareLoader from "~/components/loaders/square-loader";
import HiveCard from "./hive-card";
import NewHiveCard from "./new-hive-card";

interface HiveListParams {
  colonyId: string;
  query: {
    search?: string;
    favourites?: string;
  };
}

export default function HiveList({ colonyId, query }: HiveListParams) {
  const data = useQuery(api.hives.get, { colonyId, ...query });

  if (data === undefined) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <SquareLoader />
        <h1 className="font-regular text-xl text-muted-foreground">
          Looking for Hives
        </h1>
      </div>
    );
  }

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favourites) {
    return <EmptyFavourites />;
  }

  if (!data?.length) {
    return <EmptyHives />;
  }

  return (
    <div className="h-full  px-4 py-2">
      <h1 className="py-6 text-3xl">
        {query.favourites ? "Favourite Hives" : "Your Hives"}
      </h1>
      <ul className="grid grid-cols-3 gap-6">
        <NewHiveCard colonyId={colonyId} />
        {data.map((hive) => {
          return (
            <li key={hive._id}>
              <HiveCard
                id={hive._id}
                title={hive.title}
                colonyId={hive.colonyId}
                authorId={hive.authorId}
                authorName={hive.authorName}
                createdAt={hive._creationTime}
                imageUrl={hive.imageUrl}
                isFavourite={hive.isFavourite}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

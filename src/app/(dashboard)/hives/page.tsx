"use client";

import { useOrganization } from "@clerk/nextjs";
import EmptyColony from "./_components/empty-colony";
import HiveList from "./_components/hive-list";

interface FilesPageParams {
  searchParams: {
    search: string;
    favourites: string;
  };
}

export default function FilesPage({ searchParams }: FilesPageParams) {
  const { organization } = useOrganization();

  return (
    <main className="flex-1">
      {organization ? (
        <HiveList colonyId={organization.id} query={searchParams} />
      ) : (
        <EmptyColony />
      )}
    </main>
  );
}

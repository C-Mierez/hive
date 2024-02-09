"use client";

import { useOrganizationList } from "@clerk/nextjs";
import ColonyItem from "./colony-item";

export default function ColonyList() {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (userMemberships.isError || userMemberships.data?.length === 0)
    return null;

  return (
    <ul className="flex flex-col gap-2">
      {userMemberships.data?.map((membership) => (
        <ColonyItem
          key={membership.id}
          id={membership.organization.id}
          name={membership.organization.name}
          imageUrl={membership.organization.imageUrl}
        />
      ))}
    </ul>
  );
}

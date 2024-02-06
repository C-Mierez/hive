"use client";

import { useOrganizationList } from "@clerk/nextjs";
import OrganizationItem from "./org-item";

export default function OrganizationList() {
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
        <OrganizationItem
          key={membership.id}
          id={membership.organization.id}
          name={membership.organization.name}
          imageUrl={membership.organization.imageUrl}
        />
      ))}
    </ul>
  );
}

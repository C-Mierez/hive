"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { DashboardIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function SubSidebar() {
  const searchParams = useSearchParams();

  const favourites = searchParams.get("favourites");

  return (
    <div className="bg-muted/50 flex h-screen flex-col gap-2 p-4">
      <h1 className="font-black">HIVE</h1>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              paddingBlock: "0.5rem",
              paddingInline: "1rem",
              width: "100%",
              border: "1px solid #000",
              borderRadius: "0.5rem",
              display: "flex",
              justifyContent: "space-between",
            },
          },
        }}
      />
      <div className="w-full space-y-2">
        <Button
          asChild
          size={"lg"}
          variant={!favourites ? "default" : "outline"}
          className="flex  w-full justify-start gap-[1ch] px-4"
        >
          <Link href={"/files"}>
            <DashboardIcon className="h-4 w-4" />
            Team Boards
          </Link>
        </Button>
        <Button
          asChild
          size={"lg"}
          variant={favourites ? "default" : "outline"}
          className="flex  w-full justify-start gap-[1ch] px-4"
        >
          <Link
            href={{
              pathname: "/files",
              query: { favourites: true },
            }}
          >
            <DashboardIcon className="h-4 w-4" />
            Favourite Boards
          </Link>
        </Button>
      </div>
    </div>
  );
}

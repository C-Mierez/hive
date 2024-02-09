"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { DashboardIcon, StarIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function SubSidebar() {
  const searchParams = useSearchParams();

  const favourites = searchParams.get("favourites");

  return (
    <div className="sticky top-0 h-screen border-r-global_sm bg-muted px-4">
      <div className="h-navbar grid place-items-center border-b-global_sm border-background">
        {/* <div className="px.4 flex w-full justify-between rounded-sm border-global_sm py-2"></div> */}
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox:
                "w-full brutalHover_sm rounded-sm border-global_sm border-transparent hover:border-foreground bg-background ",
              organizationSwitcherTrigger:
                "w-full border-global_sm rounded-sm flex rounded-sm p-2 justify-between",
            },
          }}
        />
      </div>
      <div className="flex flex-col gap-2 py-4">
        <div className="w-full space-y-2">
          <Button
            asChild
            size={"lg"}
            variant={!favourites ? "darkColored" : "outline"}
            className="flex  w-full justify-start gap-[1ch] px-4"
          >
            <Link href={"/hives"}>
              <DashboardIcon className="h-4 w-4" />
              Hives
            </Link>
          </Button>
          <Button
            asChild
            size={"lg"}
            variant={favourites ? "darkColored" : "outline"}
            className="flex  w-full justify-start gap-[1ch] px-4"
          >
            <Link
              href={{
                pathname: "/hives",
                query: { favourites: true },
              }}
            >
              <StarIcon className="h-4 w-4" />
              Favourite Hives
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

import { UserButton } from "@clerk/nextjs";

import SearchInput from "./search-input";

export default function Navbar() {
  return (
    <div className="flex h-16 w-full justify-between bg-muted/75 p-4">
      <div className="flex flex-1 gap-6">
        {/* <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "200px",
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
        /> */}
        <SearchInput />
      </div>
      <UserButton />
    </div>
  );
}

import { UserButton } from "@clerk/nextjs";

import SearchInput from "./search-input";

export default function Navbar() {
  return (
    <div className="h-navbar flex w-full items-center justify-between bg-background p-4">
      <div className="flex flex-1 gap-6">
        <SearchInput />
      </div>
      <UserButton
        appearance={{
          elements: {
            avatarBox: "rounded-sm",
          },
        }}
      />
    </div>
  );
}

import { UserButton } from "@clerk/nextjs";
import SearchInput from "./search-input";

export default function Navbar() {
  return (
    <div className="flex h-16 w-full justify-between bg-muted/75 p-4">
      <SearchInput />
      <UserButton />
    </div>
  );
}

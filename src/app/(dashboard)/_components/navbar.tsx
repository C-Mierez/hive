import { UserButton } from "@clerk/nextjs";
import SearchInput from "./search-input";

export default function Navbar() {
  return (
    <div className="bg-muted/75 flex h-16 w-full justify-between p-4">
      <SearchInput />
      <UserButton />
    </div>
  );
}

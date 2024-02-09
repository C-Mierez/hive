"use client";
import Link from "next/link";
import AddButton from "./add-button";
import ColonyList from "./colony-list";

export default function Sidebar() {
  return (
    <aside className="sticky left-0 top-0 z-50  h-screen  border-r-global_sm bg-muted">
      <Link
        href="/"
        className="h-navbar grid w-full place-items-center border-b-global_sm border-background px-4 font-black transition-colors hover:border-foreground hover:bg-primary"
      >
        HIVE
      </Link>
      <div className="flex flex-col items-center gap-4 px-4 py-4">
        <ColonyList />
        <AddButton />
      </div>
    </aside>
  );
}

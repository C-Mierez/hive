"use client";
import Link from "next/link";
import AddButton from "./add-button";
import ColonyList from "./colony-list";

export default function Sidebar() {
  return (
    <aside className="border-r-global_sm flex h-screen flex-col items-center gap-4 bg-muted p-4">
      <Link href="/" className="font-black">
        HIVE
      </Link>
      <ColonyList />
      <AddButton />
    </aside>
  );
}

"use client";
import AddButton from "./add-button";
import ColonyList from "./colony-list";

export default function Sidebar() {
  return (
    <aside className="border-r-global_sm flex h-screen flex-col gap-4 bg-muted p-4 ">
      <ColonyList />
      <AddButton />
    </aside>
  );
}

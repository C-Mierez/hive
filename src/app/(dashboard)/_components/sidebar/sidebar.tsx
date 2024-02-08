"use client";
import AddButton from "./add-button";
import OrganizationList from "./org-list";

export default function Sidebar() {
  return (
    <aside className="border-r-global_sm flex h-screen flex-col gap-4 bg-muted p-4 ">
      <OrganizationList />
      <AddButton />
    </aside>
  );
}

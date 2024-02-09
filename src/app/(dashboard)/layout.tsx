import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar/sidebar";
import SubSidebar from "./_components/sub-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex">
      <Sidebar />
      <SubSidebar />
      <div className="flex flex-1 flex-col bg-muted">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

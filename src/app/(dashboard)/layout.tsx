import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar/sidebar";
import SubSidebar from "./_components/sub-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <SubSidebar />
      <div className="flex h-screen flex-1 flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

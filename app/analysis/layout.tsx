import Sidebar from "../components/Sidebar";

export default function AnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto ml-64 p-6">
        {children}
      </main>
    </div>
  );
}
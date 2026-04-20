import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function AppLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="ml-60">
        <TopBar title={title} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

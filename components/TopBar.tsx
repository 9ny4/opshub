'use client';

export default function TopBar({ title }: { title: string }) {
  return (
    <header className="h-16 bg-white border-b border-border px-6 flex items-center justify-between">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold text-text-primary">{title}</h2>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 h-10 pl-10 pr-4 bg-background-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
            🔍
          </span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-background-secondary rounded-lg transition-colors">
          <span className="text-xl">🔔</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Avatar */}
        <button className="flex items-center gap-2 hover:bg-background-secondary px-3 py-2 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
            A
          </div>
          <span className="text-sm font-medium text-text-primary">Admin</span>
        </button>
      </div>
    </header>
  );
}

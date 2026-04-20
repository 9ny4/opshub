'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  { name: 'Leads', href: '/leads', icon: '👥' },
  { name: 'Orders', href: '/orders', icon: '📦' },
  { name: 'Support', href: '/support', icon: '💬' },
  { name: 'Automations', href: '/automations', icon: '⚡' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-border flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-border">
        <h1 className="text-2xl font-bold text-primary">OpsHub</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${
                  isActive
                    ? 'bg-primary-light text-primary'
                    : 'text-text-secondary hover:bg-background-tertiary'
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-border p-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:bg-background-tertiary rounded-lg transition-colors">
          <span className="text-lg">❓</span>
          <span>Help & Support</span>
        </button>
      </div>
    </aside>
  );
}

'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/AppLayout';
import KPICard from '@/components/KPICard';
import type { DashboardSummary, ActivityDataPoint } from '@/lib/schema';

export default function HomePage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [activity, setActivity] = useState<ActivityDataPoint[]>([]);

  useEffect(() => {
    fetch('/api/dashboard/summary')
      .then((res) => res.json())
      .then(setSummary);

    fetch('/api/dashboard/activity')
      .then((res) => res.json())
      .then(setActivity);
  }, []);

  if (!summary) {
    return (
      <AppLayout title="Dashboard">
        <div className="text-center py-12">Loading...</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Dashboard">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          label="Leads"
          value={summary.leads.total}
          change={summary.leads.changePercent}
          icon="👥"
        />
        <KPICard
          label="Orders"
          value={summary.orders.total}
          change={summary.orders.changePercent}
          icon="📦"
        />
        <KPICard
          label="Support Tickets"
          value={summary.tickets.total}
          change={summary.tickets.changePercent}
          icon="💬"
        />
        <KPICard
          label="Automations"
          value={summary.automations.runsToday}
          change={summary.automations.changePercent}
          icon="⚡"
        />
      </div>

      {/* Activity Chart Section */}
      <div className="bg-white border border-border rounded-lg p-6 shadow-card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-text-primary">Activity Overview</h3>
          <select className="px-3 py-2 border border-border rounded-lg text-sm bg-white">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
        
        {/* Simple bar chart visualization */}
        <div className="h-64 flex items-end gap-2">
          {activity.map((day, i) => {
            const total = day.leads + day.orders + day.tickets + day.automations;
            const maxTotal = Math.max(...activity.map(d => d.leads + d.orders + d.tickets + d.automations));
            const height = (total / maxTotal) * 100;
            
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-primary rounded-t transition-all hover:bg-primary-hover cursor-pointer"
                  style={{ height: `${height}%` }}
                  title={`${day.date}: ${total} events`}
                />
                <span className="text-xs text-text-tertiary">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <div className="bg-white border border-border rounded-lg p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-text-primary">Recent Events</h3>
            <a href="#" className="text-sm text-primary hover:underline">View All</a>
          </div>
          
          <div className="space-y-3">
            {[
              { icon: '👥', text: 'New lead: Sara Berg from Kite Studio', time: '2 hours ago', color: 'bg-blue-100' },
              { icon: '📦', text: 'Order O-2001 marked as processing', time: '5 hours ago', color: 'bg-green-100' },
              { icon: '💬', text: 'Ticket T-3002 assigned to Anna', time: '1 day ago', color: 'bg-amber-100' },
              { icon: '⚡', text: 'Automation "New lead alert" executed', time: '2 days ago', color: 'bg-purple-100' },
            ].map((event, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-border-light last:border-0">
                <div className={`w-8 h-8 rounded-full ${event.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-sm">{event.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary">{event.text}</p>
                  <p className="text-xs text-text-tertiary">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-border rounded-lg p-6 shadow-card">
          <h3 className="text-xl font-semibold text-text-primary mb-4">Quick Actions</h3>
          
          <div className="space-y-2">
            <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-hover transition-colors text-sm font-medium">
              + Add New Lead
            </button>
            <button className="w-full bg-white text-primary border border-primary py-3 rounded-lg hover:bg-primary-light transition-colors text-sm font-medium">
              + Create Order
            </button>
            <button className="w-full bg-white text-primary border border-primary py-3 rounded-lg hover:bg-primary-light transition-colors text-sm font-medium">
              + New Support Ticket
            </button>
            <button className="w-full bg-white text-text-primary border border-border py-3 rounded-lg hover:bg-background-tertiary transition-colors text-sm font-medium">
              ⚙️ Settings
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

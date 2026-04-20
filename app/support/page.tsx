'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import type { Ticket } from '@/lib/schema';

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [tab, setTab] = useState<'open' | 'in_progress' | 'resolved'>('open');

  useEffect(() => {
    fetch(`/api/tickets?status=${tab}`)
      .then((res) => res.json())
      .then(setTickets);
  }, [tab]);

  const getStatusVariant = (status: string) => {
    const map: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
      open: 'danger',
      in_progress: 'warning',
      resolved: 'success',
      closed: 'info',
    };
    return map[status] || 'info';
  };

  const getPriorityVariant = (priority: string) => {
    const map: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
      low: 'info',
      medium: 'warning',
      high: 'danger',
    };
    return map[priority] || 'info';
  };

  return (
    <AppLayout title="Support">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setTab('open')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'open' ? 'bg-primary text-white' : 'bg-white border border-border text-text-secondary hover:bg-background-tertiary'
            }`}
          >
            Open
          </button>
          <button
            onClick={() => setTab('in_progress')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'in_progress' ? 'bg-primary text-white' : 'bg-white border border-border text-text-secondary hover:bg-background-tertiary'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setTab('resolved')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'resolved' ? 'bg-primary text-white' : 'bg-white border border-border text-text-secondary hover:bg-background-tertiary'
            }`}
          >
            Resolved
          </button>
        </div>
        <Button variant="primary">+ Create Ticket</Button>
      </div>

      {/* Table */}
      <div className="bg-white border border-border rounded-lg shadow-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-background-tertiary border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Ticket ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-background-secondary transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-primary">{ticket.id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-text-primary">{ticket.subject}</div>
                  <div className="text-xs text-text-tertiary line-clamp-1">{ticket.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                  {ticket.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getPriorityVariant(ticket.priority)}>
                    {ticket.priority}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getStatusVariant(ticket.status)}>
                    {ticket.status.replace('_', ' ')}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {ticket.assignedTo ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary-light text-primary flex items-center justify-center text-xs font-medium">
                        {ticket.assignedTo[0]}
                      </div>
                      <span>{ticket.assignedTo}</span>
                    </div>
                  ) : (
                    <span className="text-text-tertiary">Unassigned</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {new Date(ticket.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <Button variant="ghost" size="sm">View</Button>
                  <Button variant="ghost" size="sm">Close</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}

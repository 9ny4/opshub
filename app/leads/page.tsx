'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import type { Lead } from '@/lib/schema';

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const url = filter === 'all' ? '/api/leads' : `/api/leads?status=${filter}`;
    fetch(url)
      .then((res) => res.json())
      .then(setLeads);
  }, [filter]);

  const getStatusVariant = (status: string) => {
    const map: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
      new: 'info',
      contacted: 'warning',
      qualified: 'warning',
      won: 'success',
      lost: 'danger',
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
    <AppLayout title="Leads">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-primary text-white' : 'bg-white border border-border text-text-secondary hover:bg-background-tertiary'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('new')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'new' ? 'bg-primary text-white' : 'bg-white border border-border text-text-secondary hover:bg-background-tertiary'
            }`}
          >
            New
          </button>
          <button
            onClick={() => setFilter('qualified')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'qualified' ? 'bg-primary text-white' : 'bg-white border border-border text-text-secondary hover:bg-background-tertiary'
            }`}
          >
            Qualified
          </button>
        </div>
        <Button variant="primary">+ Add Lead</Button>
      </div>

      {/* Table */}
      <div className="bg-white border border-border rounded-lg shadow-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-background-tertiary border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-background-secondary transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center text-sm font-medium">
                      {lead.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">{lead.name}</div>
                      <div className="text-xs text-text-tertiary">{lead.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                  {lead.company}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {lead.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getStatusVariant(lead.status)}>
                    {lead.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getPriorityVariant(lead.priority)}>
                    {lead.priority}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {lead.source}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}

'use client';

import { useEffect, useMemo, useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import type { Lead } from '@/lib/schema';

type LeadFormState = {
  name: string;
  email: string;
  company: string;
  status: Lead['status'];
  source: string;
  priority: Lead['priority'];
};

const initialFormState: LeadFormState = {
  name: '',
  email: '',
  company: '',
  status: 'new',
  source: 'Manual',
  priority: 'medium',
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<LeadFormState>(initialFormState);

  const url = useMemo(() => filter === 'all' ? '/api/leads' : `/api/leads?status=${filter}`, [filter]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setLeads);
  }, [url]);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      setError(payload.error || 'Failed to create lead');
      return;
    }

    const createdLead: Lead = await response.json();
    setLeads((current) => [createdLead, ...current]);
    setForm(initialFormState);
    setIsFormOpen(false);
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
        <Button variant="primary" onClick={() => setIsFormOpen(true)}>+ Add Lead</Button>
      </div>

      {isFormOpen && (
        <div className="mb-6 bg-white border border-border rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Add New Entry</h3>
            <button className="text-sm text-text-secondary" onClick={() => setIsFormOpen(false)}>Close</button>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <input className="px-4 py-2 border border-border rounded-lg" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="px-4 py-2 border border-border rounded-lg" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="px-4 py-2 border border-border rounded-lg" placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            <select className="px-4 py-2 border border-border rounded-lg bg-white" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Lead['status'] })}>
              <option value="new">new</option>
              <option value="contacted">contacted</option>
              <option value="qualified">qualified</option>
              <option value="won">won</option>
              <option value="lost">lost</option>
            </select>
            <input className="px-4 py-2 border border-border rounded-lg" placeholder="Source" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} />
            <select className="px-4 py-2 border border-border rounded-lg bg-white" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as Lead['priority'] })}>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>

            {error && <p className="md:col-span-2 text-sm text-red-600">{error}</p>}

            <div className="md:col-span-2 flex justify-end gap-3">
              <Button variant="ghost" type="button" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Entry'}</Button>
            </div>
          </form>
        </div>
      )}

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

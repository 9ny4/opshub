'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import type { AutomationRule } from '@/lib/schema';

export default function AutomationsPage() {
  const [rules, setRules] = useState<AutomationRule[]>([]);

  useEffect(() => {
    fetch('/api/automations')
      .then((res) => res.json())
      .then(setRules);
  }, []);

  const toggleStatus = async (ruleId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    
    await fetch(`/api/automations/${ruleId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    setRules(rules.map(r => r.id === ruleId ? { ...r, status: newStatus as 'active' | 'paused' } : r));
  };

  return (
    <AppLayout title="Automations">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-text-secondary">
          Manage automation rules and view execution history
        </p>
        <Button variant="primary">+ Create Automation</Button>
      </div>

      {/* Automation Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="bg-white border border-border rounded-lg p-6 shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  {rule.name}
                </h3>
                <p className="text-sm text-text-secondary">{rule.description}</p>
              </div>
              <Badge variant={rule.status === 'active' ? 'success' : 'info'}>
                {rule.status}
              </Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2">
                <span className="text-sm font-medium text-text-secondary min-w-20">Trigger:</span>
                <span className="text-sm text-text-primary">{rule.trigger}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-sm font-medium text-text-secondary min-w-20">Action:</span>
                <span className="text-sm text-text-primary">{rule.action}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-sm font-medium text-text-secondary min-w-20">Created:</span>
                <span className="text-sm text-text-tertiary">
                  {new Date(rule.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-border-light">
              <button
                onClick={() => toggleStatus(rule.id, rule.status)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  rule.status === 'active'
                    ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {rule.status === 'active' ? 'Pause' : 'Activate'}
              </button>
              <Button variant="ghost" size="sm">Edit</Button>
              <Button variant="ghost" size="sm">Delete</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Execution History Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Recent Execution History</h2>
        <div className="bg-white border border-border rounded-lg shadow-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-background-tertiary border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Rule
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Triggered By
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Executed At
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {/* Placeholder - will fetch from /api/automations/runs */}
              <tr className="hover:bg-background-secondary">
                <td className="px-6 py-4 text-sm text-text-primary" colSpan={5}>
                  <div className="text-center text-text-tertiary py-4">
                    No recent executions
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}

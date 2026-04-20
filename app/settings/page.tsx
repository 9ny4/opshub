'use client';

import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <AppLayout title="Settings">
      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            {[
              { id: 'general', name: 'General', icon: '⚙️' },
              { id: 'team', name: 'Team', icon: '👥' },
              { id: 'integrations', name: 'Integrations', icon: '🔗' },
              { id: 'billing', name: 'Billing', icon: '💳' },
              { id: 'security', name: 'Security', icon: '🔒' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-light text-primary'
                    : 'text-text-secondary hover:bg-background-tertiary'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="bg-white border border-border rounded-lg p-6 shadow-card">
                <h3 className="text-lg font-semibold text-text-primary mb-4">General Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="OpsHub Inc."
                      className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="admin@opshub.com"
                      className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Timezone
                    </label>
                    <select className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>UTC</option>
                      <option>Europe/Oslo</option>
                      <option>America/New_York</option>
                      <option>Asia/Tokyo</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button variant="primary">Save Changes</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="bg-white border border-border rounded-lg p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">Team Members</h3>
                <Button variant="primary" size="sm">+ Invite Member</Button>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: 'Admin User', email: 'admin@opshub.com', role: 'Admin' },
                  { name: 'Anna Berg', email: 'anna@opshub.com', role: 'Member' },
                  { name: 'Mikael Strand', email: 'mikael@opshub.com', role: 'Member' },
                ].map((member, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-border-light last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center text-sm font-medium">
                        {member.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-text-primary">{member.name}</div>
                        <div className="text-xs text-text-tertiary">{member.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-text-secondary">{member.role}</span>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-4">
              {[
                { name: 'Telegram', icon: '📱', connected: true },
                { name: 'Email (SMTP)', icon: '📧', connected: false },
                { name: 'Webhooks', icon: '🔗', connected: false },
                { name: 'Slack', icon: '💬', connected: false },
              ].map((integration, i) => (
                <div
                  key={i}
                  className="bg-white border border-border rounded-lg p-6 shadow-card flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-background-tertiary flex items-center justify-center text-2xl">
                      {integration.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-text-primary">{integration.name}</h4>
                      <p className="text-sm text-text-secondary">
                        {integration.connected ? 'Connected and active' : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  <Button variant={integration.connected ? 'secondary' : 'primary'}>
                    {integration.connected ? 'Configure' : 'Connect'}
                  </Button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="bg-white border border-border rounded-lg p-6 shadow-card">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Billing & Subscription</h3>
              <p className="text-sm text-text-secondary mb-6">
                Manage your subscription plan and billing information
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-primary-light border border-primary rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-primary">Pro Plan</span>
                    <span className="text-2xl font-bold text-primary">$49/mo</span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Unlimited leads, orders, and automations
                  </p>
                </div>
                <Button variant="secondary" size="sm">Change Plan</Button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white border border-border rounded-lg p-6 shadow-card">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Security Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Change Password
                  </label>
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                  />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-t border-border">
                  <div>
                    <div className="text-sm font-medium text-text-primary">Two-Factor Authentication</div>
                    <div className="text-xs text-text-tertiary">Add an extra layer of security</div>
                  </div>
                  <Button variant="secondary" size="sm">Enable</Button>
                </div>

                <div className="mt-6">
                  <Button variant="primary">Update Security Settings</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

// Mock database for development
import type { 
  User, 
  Lead, 
  Order, 
  Ticket, 
  AutomationRule, 
  AutomationRun, 
  Notification,
  AuditEvent,
  DashboardSummary,
  ActivityDataPoint
} from './schema';

export const users: User[] = [
  { 
    id: 'U-1001', 
    email: 'admin@opshub.com', 
    name: 'Admin User', 
    role: 'admin',
    createdAt: '2026-01-15T10:00:00Z'
  },
  { 
    id: 'U-1002', 
    email: 'anna@opshub.com', 
    name: 'Anna Berg', 
    role: 'member',
    createdAt: '2026-02-01T10:00:00Z'
  },
  { 
    id: 'U-1003', 
    email: 'mikael@opshub.com', 
    name: 'Mikael Strand', 
    role: 'member',
    createdAt: '2026-02-01T10:00:00Z'
  },
];

export const leads: Lead[] = [
  { 
    id: 'L-1001', 
    name: 'Mia Jensen', 
    email: 'mia@northwind.no',
    company: 'Northwind', 
    status: 'qualified', 
    source: 'Website', 
    priority: 'high',
    assignedTo: 'U-1002',
    createdAt: '2026-04-18T09:30:00Z',
    updatedAt: '2026-04-19T14:20:00Z'
  },
  { 
    id: 'L-1002', 
    name: 'Oliver Hansen', 
    email: 'oliver@bluepeak.no',
    company: 'BluePeak', 
    status: 'contacted', 
    source: 'Referral', 
    priority: 'medium',
    assignedTo: 'U-1002',
    createdAt: '2026-04-17T11:15:00Z',
    updatedAt: '2026-04-18T16:45:00Z'
  },
  { 
    id: 'L-1003', 
    name: 'Sara Berg', 
    email: 'sara@kitestudio.no',
    company: 'Kite Studio', 
    status: 'new', 
    source: 'LinkedIn', 
    priority: 'low',
    createdAt: '2026-04-20T08:00:00Z',
    updatedAt: '2026-04-20T08:00:00Z'
  },
  { 
    id: 'L-1004', 
    name: 'Erik Nilsen', 
    email: 'erik@techcorp.no',
    company: 'TechCorp', 
    status: 'new', 
    source: 'Cold Email', 
    priority: 'medium',
    createdAt: '2026-04-19T15:30:00Z',
    updatedAt: '2026-04-19T15:30:00Z'
  },
  { 
    id: 'L-1005', 
    name: 'Linda Johansen', 
    email: 'linda@greenleaf.no',
    company: 'GreenLeaf', 
    status: 'won', 
    source: 'Website', 
    priority: 'high',
    assignedTo: 'U-1003',
    createdAt: '2026-04-10T10:00:00Z',
    updatedAt: '2026-04-16T12:00:00Z'
  },
];

export const orders: Order[] = [
  { 
    id: 'O-2001', 
    customerId: 'C-5001',
    customerName: 'Northwind', 
    status: 'processing', 
    total: 2450, 
    currency: 'USD',
    source: 'Shopify',
    items: [
      { id: 'I-1', productName: 'Product A', quantity: 2, price: 1000 },
      { id: 'I-2', productName: 'Product B', quantity: 1, price: 450 }
    ],
    createdAt: '2026-04-19T13:20:00Z',
    updatedAt: '2026-04-20T09:00:00Z'
  },
  { 
    id: 'O-2002', 
    customerId: 'C-5002',
    customerName: 'BluePeak', 
    status: 'shipped', 
    total: 1180, 
    currency: 'USD',
    source: 'Manual',
    items: [
      { id: 'I-3', productName: 'Product C', quantity: 1, price: 1180 }
    ],
    createdAt: '2026-04-18T10:30:00Z',
    updatedAt: '2026-04-19T14:00:00Z'
  },
  { 
    id: 'O-2003', 
    customerId: 'C-5003',
    customerName: 'Kite Studio', 
    status: 'pending', 
    total: 860, 
    currency: 'USD',
    source: 'Webhook',
    items: [
      { id: 'I-4', productName: 'Product D', quantity: 4, price: 215 }
    ],
    createdAt: '2026-04-20T11:00:00Z',
    updatedAt: '2026-04-20T11:00:00Z'
  },
  { 
    id: 'O-2004', 
    customerId: 'C-5004',
    customerName: 'GreenLeaf', 
    status: 'completed', 
    total: 3200, 
    currency: 'USD',
    source: 'Shopify',
    items: [
      { id: 'I-5', productName: 'Product E', quantity: 1, price: 3200 }
    ],
    createdAt: '2026-04-15T09:00:00Z',
    updatedAt: '2026-04-17T16:00:00Z'
  },
];

export const tickets: Ticket[] = [
  { 
    id: 'T-3001', 
    subject: 'Billing follow-up', 
    description: 'Customer asking about invoice details',
    status: 'open', 
    priority: 'high',
    customerId: 'C-5001',
    customerName: 'Northwind',
    assignedTo: 'U-1001',
    createdAt: '2026-04-20T08:30:00Z',
    updatedAt: '2026-04-20T08:30:00Z'
  },
  { 
    id: 'T-3002', 
    subject: 'Order status question', 
    description: 'Where is my shipment?',
    status: 'in_progress', 
    priority: 'medium',
    customerId: 'C-5002',
    customerName: 'BluePeak',
    assignedTo: 'U-1002',
    createdAt: '2026-04-19T14:00:00Z',
    updatedAt: '2026-04-20T10:15:00Z'
  },
  { 
    id: 'T-3003', 
    subject: 'Change shipping address', 
    description: 'Need to update delivery address before shipping',
    status: 'resolved', 
    priority: 'low',
    customerId: 'C-5003',
    customerName: 'Kite Studio',
    assignedTo: 'U-1003',
    createdAt: '2026-04-18T12:00:00Z',
    updatedAt: '2026-04-19T09:00:00Z',
    resolvedAt: '2026-04-19T09:00:00Z'
  },
  { 
    id: 'T-3004', 
    subject: 'Product inquiry', 
    description: 'Questions about product specifications',
    status: 'open', 
    priority: 'low',
    customerId: 'C-5005',
    customerName: 'TechCorp',
    createdAt: '2026-04-20T09:45:00Z',
    updatedAt: '2026-04-20T09:45:00Z'
  },
];

export const automationRules: AutomationRule[] = [
  { 
    id: 'A-4001', 
    name: 'New lead alert', 
    description: 'Send Telegram notification when a new lead is created',
    trigger: 'lead.created', 
    triggerConfig: {},
    action: 'telegram.send', 
    actionConfig: { channel: 'ops-alerts' },
    status: 'active',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  { 
    id: 'A-4002', 
    name: 'High value order', 
    description: 'Tag and notify team when order exceeds $1000',
    trigger: 'order.created', 
    triggerConfig: { minValue: 1000 },
    action: 'team.notify', 
    actionConfig: { tag: 'high-value' },
    status: 'active',
    createdAt: '2026-03-05T10:00:00Z',
    updatedAt: '2026-03-05T10:00:00Z'
  },
  { 
    id: 'A-4003', 
    name: 'Stale ticket reminder', 
    description: 'Send email reminder for tickets idle for 48 hours',
    trigger: 'ticket.idle', 
    triggerConfig: { idleHours: 48 },
    action: 'email.send', 
    actionConfig: { template: 'ticket-reminder' },
    status: 'paused',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-04-01T10:00:00Z'
  },
  { 
    id: 'A-4004', 
    name: 'Lead qualification score', 
    description: 'Auto-qualify leads based on engagement score',
    trigger: 'lead.updated', 
    triggerConfig: { scoreThreshold: 80 },
    action: 'lead.qualify', 
    actionConfig: {},
    status: 'active',
    createdAt: '2026-03-15T10:00:00Z',
    updatedAt: '2026-03-15T10:00:00Z'
  },
];

export const automationRuns: AutomationRun[] = [
  { 
    id: 'R-5001', 
    ruleId: 'A-4001', 
    ruleName: 'New lead alert',
    status: 'success',
    triggeredBy: 'lead.created:L-1003',
    executedAt: '2026-04-20T08:00:30Z',
    duration: 120,
    logs: 'Telegram message sent successfully'
  },
  { 
    id: 'R-5002', 
    ruleId: 'A-4002', 
    ruleName: 'High value order',
    status: 'success',
    triggeredBy: 'order.created:O-2001',
    executedAt: '2026-04-19T13:20:15Z',
    duration: 95,
    logs: 'Order tagged as high-value, team notified'
  },
  { 
    id: 'R-5003', 
    ruleId: 'A-4001', 
    ruleName: 'New lead alert',
    status: 'failed',
    triggeredBy: 'lead.created:L-1004',
    executedAt: '2026-04-19T15:30:20Z',
    duration: 2000,
    error: 'Telegram API timeout'
  },
  { 
    id: 'R-5004', 
    ruleId: 'A-4004', 
    ruleName: 'Lead qualification score',
    status: 'success',
    triggeredBy: 'lead.updated:L-1001',
    executedAt: '2026-04-19T14:20:10Z',
    duration: 50,
    logs: 'Lead auto-qualified based on score'
  },
];

export const notifications: Notification[] = [
  { 
    id: 'N-6001', 
    userId: 'U-1001', 
    type: 'success',
    title: 'New lead created',
    message: 'Sara Berg from Kite Studio has been added',
    read: false,
    actionUrl: '/leads/L-1003',
    createdAt: '2026-04-20T08:00:00Z'
  },
  { 
    id: 'N-6002', 
    userId: 'U-1001', 
    type: 'warning',
    title: 'Automation failed',
    message: 'New lead alert failed due to Telegram timeout',
    read: false,
    actionUrl: '/automations/runs/R-5003',
    createdAt: '2026-04-19T15:30:20Z'
  },
  { 
    id: 'N-6003', 
    userId: 'U-1002', 
    type: 'info',
    title: 'New ticket assigned',
    message: 'Ticket T-3002 has been assigned to you',
    read: true,
    actionUrl: '/support/T-3002',
    createdAt: '2026-04-19T14:05:00Z'
  },
];

export const auditEvents: AuditEvent[] = [
  { 
    id: 'E-7001', 
    userId: 'U-1001', 
    userName: 'Admin User',
    action: 'lead.created',
    entityType: 'lead',
    entityId: 'L-1003',
    changes: { name: 'Sara Berg', company: 'Kite Studio' },
    ipAddress: '192.168.1.100',
    createdAt: '2026-04-20T08:00:00Z'
  },
  { 
    id: 'E-7002', 
    userId: 'U-1002', 
    userName: 'Anna Berg',
    action: 'ticket.updated',
    entityType: 'ticket',
    entityId: 'T-3002',
    changes: { status: 'in_progress' },
    ipAddress: '192.168.1.101',
    createdAt: '2026-04-20T10:15:00Z'
  },
  { 
    id: 'E-7003', 
    userId: 'U-1003', 
    userName: 'Mikael Strand',
    action: 'ticket.resolved',
    entityType: 'ticket',
    entityId: 'T-3003',
    ipAddress: '192.168.1.102',
    createdAt: '2026-04-19T09:00:00Z'
  },
];

export const dashboardSummary: DashboardSummary = {
  leads: {
    total: 142,
    new: 23,
    qualified: 45,
    changePercent: 12
  },
  orders: {
    total: 89,
    pending: 12,
    revenue: 245000,
    changePercent: 8
  },
  tickets: {
    total: 34,
    open: 8,
    resolved: 26,
    changePercent: -5
  },
  automations: {
    total: 4,
    active: 3,
    runsToday: 256,
    changePercent: 18
  }
};

export const activityData: ActivityDataPoint[] = [
  { date: '2026-04-14', leads: 18, orders: 12, tickets: 5, automations: 34 },
  { date: '2026-04-15', leads: 22, orders: 15, tickets: 6, automations: 42 },
  { date: '2026-04-16', leads: 19, orders: 14, tickets: 4, automations: 38 },
  { date: '2026-04-17', leads: 25, orders: 18, tickets: 7, automations: 51 },
  { date: '2026-04-18', leads: 21, orders: 13, tickets: 5, automations: 45 },
  { date: '2026-04-19', leads: 24, orders: 16, tickets: 6, automations: 48 },
  { date: '2026-04-20', leads: 13, orders: 11, tickets: 1, automations: 28 },
];

// Helper to get data by ID
export const getLeadById = (id: string) => leads.find(l => l.id === id);
export const getOrderById = (id: string) => orders.find(o => o.id === id);
export const getTicketById = (id: string) => tickets.find(t => t.id === id);
export const getAutomationRuleById = (id: string) => automationRules.find(a => a.id === id);
export const getUserById = (id: string) => users.find(u => u.id === id);

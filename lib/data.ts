export type Lead = {
  id: string;
  name: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'won' | 'lost';
  source: string;
  priority: 'low' | 'medium' | 'high';
};

export type Order = {
  id: string;
  customer: string;
  status: 'pending' | 'processing' | 'shipped' | 'completed';
  total: string;
  source: string;
};

export type Ticket = {
  id: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
};

export type AutomationRule = {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: 'active' | 'paused';
};

export const leads: Lead[] = [
  { id: 'L-1001', name: 'Mia Jensen', company: 'Northwind', status: 'qualified', source: 'Website', priority: 'high' },
  { id: 'L-1002', name: 'Oliver Hansen', company: 'BluePeak', status: 'contacted', source: 'Referral', priority: 'medium' },
  { id: 'L-1003', name: 'Sara Berg', company: 'Kite Studio', status: 'new', source: 'LinkedIn', priority: 'low' },
];

export const orders: Order[] = [
  { id: 'O-2001', customer: 'Northwind', status: 'processing', total: '$2,450', source: 'Shopify' },
  { id: 'O-2002', customer: 'BluePeak', status: 'shipped', total: '$1,180', source: 'Manual' },
  { id: 'O-2003', customer: 'Kite Studio', status: 'pending', total: '$860', source: 'Webhook' },
];

export const tickets: Ticket[] = [
  { id: 'T-3001', subject: 'Billing follow-up', status: 'open', priority: 'high', assignee: 'You' },
  { id: 'T-3002', subject: 'Order status question', status: 'in_progress', priority: 'medium', assignee: 'Anna' },
  { id: 'T-3003', subject: 'Change shipping address', status: 'resolved', priority: 'low', assignee: 'Mikael' },
];

export const automationRules: AutomationRule[] = [
  { id: 'A-4001', name: 'New lead alert', trigger: 'Lead created', action: 'Send Telegram alert', status: 'active' },
  { id: 'A-4002', name: 'High value order', trigger: 'Order > $1000', action: 'Tag and notify', status: 'active' },
  { id: 'A-4003', name: 'Stale ticket reminder', trigger: 'Ticket idle 48h', action: 'Send email reminder', status: 'paused' },
];

// Database schema types for OpsHub

export type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'member';
  avatar?: string;
  createdAt: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'won' | 'lost';
  source: string;
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  id: string;
  customerId: string;
  customerName: string;
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  total: number;
  currency: string;
  source: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
};

export type OrderItem = {
  id: string;
  productName: string;
  quantity: number;
  price: number;
};

export type Ticket = {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  customerId: string;
  customerName: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
};

export type AutomationRule = {
  id: string;
  name: string;
  description: string;
  trigger: string;
  triggerConfig: Record<string, any>;
  action: string;
  actionConfig: Record<string, any>;
  status: 'active' | 'paused';
  createdAt: string;
  updatedAt: string;
};

export type AutomationRun = {
  id: string;
  ruleId: string;
  ruleName: string;
  status: 'success' | 'failed' | 'running';
  triggeredBy: string;
  executedAt: string;
  duration: number; // milliseconds
  logs?: string;
  error?: string;
};

export type Notification = {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
};

export type AuditEvent = {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  changes?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
};

export type DashboardSummary = {
  leads: {
    total: number;
    new: number;
    qualified: number;
    changePercent: number;
  };
  orders: {
    total: number;
    pending: number;
    revenue: number;
    changePercent: number;
  };
  tickets: {
    total: number;
    open: number;
    resolved: number;
    changePercent: number;
  };
  automations: {
    total: number;
    active: number;
    runsToday: number;
    changePercent: number;
  };
};

export type ActivityDataPoint = {
  date: string;
  leads: number;
  orders: number;
  tickets: number;
  automations: number;
};

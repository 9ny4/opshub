'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import type { Order } from '@/lib/schema';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  const getStatusVariant = (status: string) => {
    const map: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
      pending: 'warning',
      processing: 'info',
      shipped: 'info',
      completed: 'success',
      cancelled: 'danger',
    };
    return map[status] || 'info';
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <AppLayout title="Orders">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search orders..."
            className="px-4 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select className="px-4 py-2 border border-border rounded-lg text-sm bg-white">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Completed</option>
          </select>
        </div>
        <Button variant="primary">+ New Order</Button>
      </div>

      {/* Table */}
      <div className="bg-white border border-border rounded-lg shadow-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-background-tertiary border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-background-secondary transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-primary">{order.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                  {formatCurrency(order.total, order.currency)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getStatusVariant(order.status)}>
                    {order.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {order.source}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <Button variant="ghost" size="sm">View</Button>
                  <Button variant="ghost" size="sm">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}

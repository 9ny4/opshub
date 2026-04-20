import { NextRequest, NextResponse } from 'next/server';
import { orders } from '@/lib/mock-data';
import type { Order } from '@/lib/schema';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  let filtered = orders;

  if (status) {
    filtered = filtered.filter(o => o.status === status);
  }

  return NextResponse.json(filtered);
}

export async function POST(request: NextRequest) {
  const body: Partial<Order> = await request.json();
  
  const newOrder: Order = {
    id: `O-${2000 + orders.length + 1}`,
    customerId: body.customerId || '',
    customerName: body.customerName || '',
    status: body.status || 'pending',
    total: body.total || 0,
    currency: body.currency || 'USD',
    source: body.source || 'Manual',
    items: body.items || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  orders.push(newOrder);

  return NextResponse.json(newOrder, { status: 201 });
}

import { NextRequest, NextResponse } from 'next/server';
import { orders, getOrderById } from '@/lib/mock-data';
import type { Order } from '@/lib/schema';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const order = getOrderById(params.id);

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json(order);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const order = getOrderById(params.id);

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const updates: Partial<Order> = await request.json();

  Object.assign(order, {
    ...updates,
    updatedAt: new Date().toISOString()
  });

  return NextResponse.json(order);
}

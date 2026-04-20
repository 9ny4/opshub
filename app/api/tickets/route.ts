import { NextRequest, NextResponse } from 'next/server';
import { tickets } from '@/lib/mock-data';
import type { Ticket } from '@/lib/schema';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const priority = searchParams.get('priority');

  let filtered = tickets;

  if (status) {
    filtered = filtered.filter(t => t.status === status);
  }

  if (priority) {
    filtered = filtered.filter(t => t.priority === priority);
  }

  return NextResponse.json(filtered);
}

export async function POST(request: NextRequest) {
  const body: Partial<Ticket> = await request.json();
  
  const newTicket: Ticket = {
    id: `T-${3000 + tickets.length + 1}`,
    subject: body.subject || '',
    description: body.description || '',
    status: body.status || 'open',
    priority: body.priority || 'medium',
    customerId: body.customerId || '',
    customerName: body.customerName || '',
    assignedTo: body.assignedTo,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tickets.push(newTicket);

  return NextResponse.json(newTicket, { status: 201 });
}

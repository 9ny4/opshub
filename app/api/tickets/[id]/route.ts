import { NextRequest, NextResponse } from 'next/server';
import { tickets, getTicketById } from '@/lib/mock-data';
import type { Ticket } from '@/lib/schema';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const ticket = getTicketById(params.id);

  if (!ticket) {
    return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
  }

  const updates: Partial<Ticket> = await request.json();

  Object.assign(ticket, {
    ...updates,
    updatedAt: new Date().toISOString(),
    resolvedAt: updates.status === 'resolved' || updates.status === 'closed' 
      ? new Date().toISOString() 
      : ticket.resolvedAt
  });

  return NextResponse.json(ticket);
}

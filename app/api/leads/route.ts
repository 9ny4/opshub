import { NextRequest, NextResponse } from 'next/server';
import { addLead, getNextLeadId, leads } from '@/lib/mock-data';
import type { Lead } from '@/lib/schema';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const priority = searchParams.get('priority');

  let filtered = leads;

  if (status) {
    filtered = filtered.filter(l => l.status === status);
  }

  if (priority) {
    filtered = filtered.filter(l => l.priority === priority);
  }

  return NextResponse.json(filtered);
}

export async function POST(request: NextRequest) {
  const body: Partial<Lead> = await request.json();

  if (!body.name || !body.email || !body.company) {
    return NextResponse.json(
      { error: 'name, email, and company are required' },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  const newLead: Lead = {
    id: getNextLeadId(),
    name: body.name,
    email: body.email,
    company: body.company,
    status: body.status || 'new',
    source: body.source || 'Manual',
    priority: body.priority || 'medium',
    assignedTo: body.assignedTo,
    createdAt: now,
    updatedAt: now,
  };

  addLead(newLead);

  return NextResponse.json(newLead, { status: 201 });
}

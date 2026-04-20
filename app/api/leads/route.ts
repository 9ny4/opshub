import { NextRequest, NextResponse } from 'next/server';
import { leads } from '@/lib/mock-data';
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
  
  const newLead: Lead = {
    id: `L-${1000 + leads.length + 1}`,
    name: body.name || '',
    email: body.email || '',
    company: body.company || '',
    status: body.status || 'new',
    source: body.source || 'Manual',
    priority: body.priority || 'medium',
    assignedTo: body.assignedTo,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  leads.push(newLead);

  return NextResponse.json(newLead, { status: 201 });
}

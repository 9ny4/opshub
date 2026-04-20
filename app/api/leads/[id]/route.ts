import { NextRequest, NextResponse } from 'next/server';
import { leads, getLeadById } from '@/lib/mock-data';
import type { Lead } from '@/lib/schema';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const lead = getLeadById(params.id);

  if (!lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }

  return NextResponse.json(lead);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const lead = getLeadById(params.id);

  if (!lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }

  const updates: Partial<Lead> = await request.json();

  Object.assign(lead, {
    ...updates,
    updatedAt: new Date().toISOString()
  });

  return NextResponse.json(lead);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const index = leads.findIndex(l => l.id === params.id);

  if (index === -1) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }

  leads.splice(index, 1);

  return NextResponse.json({ success: true });
}

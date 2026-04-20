import { NextRequest, NextResponse } from 'next/server';
import { automationRules } from '@/lib/mock-data';
import type { AutomationRule } from '@/lib/schema';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  let filtered = automationRules;

  if (status) {
    filtered = filtered.filter(a => a.status === status);
  }

  return NextResponse.json(filtered);
}

export async function POST(request: NextRequest) {
  const body: Partial<AutomationRule> = await request.json();
  
  const newRule: AutomationRule = {
    id: `A-${4000 + automationRules.length + 1}`,
    name: body.name || '',
    description: body.description || '',
    trigger: body.trigger || '',
    triggerConfig: body.triggerConfig || {},
    action: body.action || '',
    actionConfig: body.actionConfig || {},
    status: body.status || 'paused',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  automationRules.push(newRule);

  return NextResponse.json(newRule, { status: 201 });
}

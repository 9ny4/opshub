import { NextRequest, NextResponse } from 'next/server';
import { automationRules, getAutomationRuleById } from '@/lib/mock-data';
import type { AutomationRule } from '@/lib/schema';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const rule = getAutomationRuleById(params.id);

  if (!rule) {
    return NextResponse.json({ error: 'Automation rule not found' }, { status: 404 });
  }

  const updates: Partial<AutomationRule> = await request.json();

  Object.assign(rule, {
    ...updates,
    updatedAt: new Date().toISOString()
  });

  return NextResponse.json(rule);
}

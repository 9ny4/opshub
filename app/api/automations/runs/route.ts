import { NextRequest, NextResponse } from 'next/server';
import { automationRuns } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ruleId = searchParams.get('ruleId');
  const status = searchParams.get('status');

  let filtered = automationRuns;

  if (ruleId) {
    filtered = filtered.filter(r => r.ruleId === ruleId);
  }

  if (status) {
    filtered = filtered.filter(r => r.status === status);
  }

  return NextResponse.json(filtered);
}

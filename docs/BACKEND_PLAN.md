# OpsHub Backend Plan

## Purpose
Provide the data and workflow layer for the OpsHub dashboard.

## Core entities
- users
- leads
- orders
- tickets
- automation_rules
- automation_runs
- notifications
- audit_events

## API areas
- auth
- dashboard summary
- leads CRUD
- orders CRUD
- support tickets CRUD
- automation rules CRUD
- automation execution history
- settings

## Integration scaffolding
- Telegram notifications
- email notifications
- webhook triggers
- CSV import/export endpoints

## Implementation order
1. schema definitions
2. API routes
3. service layer
4. background jobs
5. integration adapters
6. logging and audit events
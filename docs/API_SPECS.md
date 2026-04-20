# OpsHub API Specs

## Dashboard
- `GET /api/dashboard/summary`
- `GET /api/dashboard/activity`

## Leads
- `GET /api/leads`
- `POST /api/leads`
- `GET /api/leads/:id`
- `PATCH /api/leads/:id`
- `DELETE /api/leads/:id`

## Orders
- `GET /api/orders`
- `POST /api/orders`
- `GET /api/orders/:id`
- `PATCH /api/orders/:id`

## Support
- `GET /api/tickets`
- `POST /api/tickets`
- `PATCH /api/tickets/:id`

## Automations
- `GET /api/automations`
- `POST /api/automations`
- `PATCH /api/automations/:id`
- `GET /api/automations/runs`

## Settings
- `GET /api/settings`
- `PATCH /api/settings`

## Integration endpoints
- `POST /api/webhooks/telegram`
- `POST /api/webhooks/email`
- `POST /api/import/csv`
- `GET /api/export/csv`

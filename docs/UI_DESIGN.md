# OpsHub UI Design

## Design System

### Colors
```
Primary (Accent): #3B82F6 (blue-500)
Primary Hover: #2563EB (blue-600)
Primary Light: #DBEAFE (blue-100)

Background: #FFFFFF
Background Secondary: #F9FAFB (gray-50)
Background Tertiary: #F3F4F6 (gray-100)

Border: #E5E7EB (gray-200)
Border Light: #F3F4F6 (gray-100)

Text Primary: #111827 (gray-900)
Text Secondary: #6B7280 (gray-500)
Text Tertiary: #9CA3AF (gray-400)

Success: #10B981 (green-500)
Warning: #F59E0B (amber-500)
Danger: #EF4444 (red-500)
Info: #3B82F6 (blue-500)
```

### Typography
```
Font Family: Inter, system-ui, sans-serif

Headings:
- H1: 30px/36px, font-weight 700
- H2: 24px/32px, font-weight 600
- H3: 20px/28px, font-weight 600
- H4: 16px/24px, font-weight 600

Body:
- Large: 16px/24px, font-weight 400
- Base: 14px/20px, font-weight 400
- Small: 12px/16px, font-weight 400
- Tiny: 11px/16px, font-weight 400
```

### Spacing Scale
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

### Shadows
```
Card: 0 1px 3px rgba(0,0,0,0.1)
Card Hover: 0 4px 6px rgba(0,0,0,0.1)
Dropdown: 0 10px 15px rgba(0,0,0,0.1)
Modal: 0 20px 25px rgba(0,0,0,0.1)
```

### Border Radius
```
sm: 4px
md: 6px
lg: 8px
xl: 12px
full: 9999px
```

---

## Layout Structure

### App Shell
```
┌─────────────────────────────────────────────────┐
│ Sidebar (240px)    │ Main Content Area          │
│                    │                             │
│ [Logo]             │ ┌─────────────────────────┐│
│                    │ │ Top Bar (64px)          ││
│ Navigation         │ │ Search | Notif | Avatar ││
│ • Dashboard        │ └─────────────────────────┘│
│ • Leads            │                             │
│ • Orders           │ ┌─────────────────────────┐│
│ • Support          │ │                         ││
│ • Automations      │ │   Page Content          ││
│ • Settings         │ │                         ││
│                    │ │                         ││
│ [Bottom Section]   │ └─────────────────────────┘│
│ • Help             │                             │
│ • User Profile     │                             │
└─────────────────────────────────────────────────┘
```

**Sidebar**
- Fixed width: 240px
- Background: white
- Border right: 1px solid Border
- Logo at top (48px height, centered)
- Navigation items:
  - Height: 40px
  - Padding: 12px 16px
  - Border radius: 6px (when active/hover)
  - Icon + Label layout
  - Active state: Primary Light background, Primary text
  - Hover state: Background Tertiary
  - Default: Text Secondary
- Bottom section pinned to bottom
- Collapsible on mobile (hamburger menu)

**Top Bar**
- Height: 64px
- Background: white
- Border bottom: 1px solid Border
- Padding: 0 24px
- Flex layout: left-aligned content, right-aligned actions
- Contains:
  - Page title (H2)
  - Search input (max-width: 400px, grows on focus)
  - Notification bell icon (with badge for unread count)
  - User avatar dropdown (32px circle)

**Main Content**
- Padding: 24px
- Background: Background Secondary
- Min-height: calc(100vh - 64px)
- Responsive: reduces to 16px padding on mobile

---

## Dashboard Overview Page

### Layout
```
┌─────────────────────────────────────────────────┐
│ Dashboard                        🔍 🔔 👤       │ <- Top Bar
├─────────────────────────────────────────────────┤
│                                                  │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────┐│
│ │ Leads    │ │ Orders   │ │ Support  │ │ Auto││ <- KPI Cards
│ │ 142      │ │ 89       │ │ 34       │ │ 256 ││
│ │ +12%     │ │ +8%      │ │ -5%      │ │ +18%││
│ └──────────┘ └──────────┘ └──────────┘ └─────┘│
│                                                  │
│ ┌────────────────────────────────────────────┐  │
│ │ Activity Chart                             │  │ <- Chart Section
│ │ [Line/Bar chart showing trends over time]  │  │
│ └────────────────────────────────────────────┘  │
│                                                  │
│ ┌────────────────────┐ ┌────────────────────┐  │
│ │ Recent Events      │ │ Quick Actions      │  │ <- Split Section
│ │ • New lead         │ │ [Button] Add Lead  │  │
│ │ • Order completed  │ │ [Button] New Order │  │
│ │ • Ticket closed    │ │ [Button] Settings  │  │
│ └────────────────────┘ └────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### KPI Cards
**Component Structure:**
- Grid: 4 columns on desktop, 2 on tablet, 1 on mobile
- Gap: 16px
- Card dimensions: flexible width, 120px height
- Background: white
- Border: 1px solid Border
- Border radius: 8px
- Padding: 20px
- Shadow: Card shadow
- Hover: Card Hover shadow + slight scale (1.02)

**Content Layout:**
- Icon (top-left, 40px circle, Primary Light background, Primary icon)
- Label (Text Secondary, Small size)
- Value (H2, Text Primary, bold)
- Change indicator (Small, Success/Danger color with arrow icon)
  - Positive: green text, ↑ arrow
  - Negative: red text, ↓ arrow

### Activity Chart Section
**Component:**
- Background: white
- Border: 1px solid Border
- Border radius: 8px
- Padding: 24px
- Height: 320px
- Shadow: Card shadow

**Header:**
- Title: "Activity Overview" (H3)
- Time range selector (dropdown): "Last 7 days", "Last 30 days", "Last 3 months"
- Right-aligned

**Chart:**
- Library: Chart.js or Recharts recommended
- Type: Line chart (default) or Bar chart toggle
- Data: Leads, Orders, Support, Automations as separate lines/bars
- Colors match KPI card icons
- Grid lines: light gray, horizontal only
- Axes: labeled, Text Secondary
- Tooltip on hover
- Legend at bottom

### Recent Events Feed
**Component:**
- Background: white
- Border: 1px solid Border
- Border radius: 8px
- Padding: 24px
- Max height: 400px
- Overflow: auto
- Shadow: Card shadow

**Header:**
- Title: "Recent Events" (H3)
- "View All" link (Primary color, Small)

**Event Item:**
- Height: auto (min 48px)
- Padding: 12px 0
- Border bottom: 1px solid Border Light (except last)
- Layout:
  - Left: Icon (24px, colored background circle)
  - Middle: Event text (Base size) + timestamp (Small, Text Tertiary)
  - Right: Status badge (optional)

**Event Types:**
- Lead created: blue icon
- Order placed: green icon
- Support ticket: amber icon
- Automation run: purple icon

### Quick Actions Section
**Component:**
- Background: white
- Border: 1px solid Border
- Border radius: 8px
- Padding: 24px
- Shadow: Card shadow

**Header:**
- Title: "Quick Actions" (H3)

**Buttons:**
- Full width
- Height: 40px
- Margin: 8px 0
- Primary button style: Primary background, white text
- Secondary button style: white background, Primary text, Primary border

---

## Component Library

### Button
**Primary:**
- Background: Primary
- Color: white
- Padding: 10px 20px
- Border radius: md
- Font: Base, weight 500
- Hover: Primary Hover background
- Active: darker shade, slight press effect
- Disabled: opacity 0.5, cursor not-allowed

**Secondary:**
- Background: white
- Color: Primary
- Border: 1px solid Primary
- Same padding/radius as Primary
- Hover: Primary Light background

**Ghost:**
- Background: transparent
- Color: Text Primary
- Hover: Background Tertiary

### Input
- Height: 40px
- Padding: 10px 12px
- Border: 1px solid Border
- Border radius: md
- Background: white
- Font: Base
- Placeholder: Text Tertiary
- Focus: Primary border, subtle shadow
- Error: Danger border, Danger text helper below

### Badge
- Padding: 4px 8px
- Border radius: full
- Font: Small, weight 500
- Variants:
  - Success: Success background (light), Success text (dark)
  - Warning: Warning background (light), Warning text (dark)
  - Danger: Danger background (light), Danger text (dark)
  - Info: Info background (light), Info text (dark)

### Avatar
- Circle: border-radius full
- Sizes: 24px, 32px, 40px, 64px
- Background: gradient or image
- Border: 2px solid white (for overlays)
- Fallback: initials, centered

### Table
- Background: white
- Border: 1px solid Border
- Border radius: lg
- Shadow: Card shadow

**Header:**
- Background: Background Tertiary
- Text: Small, weight 600, uppercase, Text Secondary
- Padding: 12px 16px
- Border bottom: 1px solid Border

**Row:**
- Padding: 16px
- Border bottom: 1px solid Border Light
- Hover: Background Secondary
- Font: Base

**Actions:**
- Right-aligned icon buttons (edit, delete, view)
- Ghost button style
- 32px size

### Modal
- Overlay: rgba(0,0,0,0.5)
- Container: white background, border-radius lg, shadow Modal
- Max width: 600px (default), centered
- Padding: 24px
- Header: H3 + close icon (top right)
- Footer: buttons right-aligned

### Dropdown
- Background: white
- Border: 1px solid Border
- Border radius: md
- Shadow: Dropdown
- Max height: 320px, overflow auto
- Items:
  - Padding: 10px 12px
  - Hover: Background Secondary
  - Active: Primary Light background

---

## Page Layouts

### Leads Page
**Header:**
- Title: "Leads" (H2)
- Action: "Add Lead" button (Primary)
- Search + Filter bar below

**Content:**
- Data table with columns:
  - Name (with avatar)
  - Email
  - Status (badge)
  - Source
  - Created date
  - Actions (edit, delete)
- Pagination at bottom

### Orders Page
**Header:**
- Title: "Orders" (H2)
- Action: "New Order" button (Primary)
- Filters: Status, Date range

**Content:**
- Data table with columns:
  - Order ID
  - Customer
  - Total amount
  - Status (badge: pending, completed, cancelled)
  - Date
  - Actions (view, edit)
- Summary cards at top (Total Revenue, Avg Order Value, etc.)

### Support Page
**Header:**
- Title: "Support" (H2)
- Action: "Create Ticket" button (Primary)
- Tabs: Open, In Progress, Closed

**Content:**
- Ticket list (card-based or table)
- Columns:
  - Ticket ID
  - Subject
  - Customer
  - Priority (badge: high, medium, low)
  - Status
  - Assigned to (avatar)
  - Last updated
  - Actions (view, assign, close)

### Automations Page
**Header:**
- Title: "Automations" (H2)
- Action: "Create Automation" button (Primary)

**Content:**
- Card grid (2 columns on desktop)
- Each card:
  - Automation name
  - Description
  - Status toggle (active/inactive)
  - Last run timestamp
  - Run count badge
  - Edit/Delete actions

### Settings Page
**Layout:**
- Sidebar tabs (left, 200px):
  - General
  - Team
  - Integrations
  - Billing
  - Security
- Content area (right):
  - Form sections with labels, inputs, and save button
  - White card containers for each section

---

## Responsive Breakpoints

```
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
```

**Mobile:**
- Sidebar collapses to hamburger menu
- KPI cards stack (1 column)
- Tables become card lists (vertical stack)
- Top bar: icon-only actions, search expands on tap

**Tablet:**
- Sidebar visible but can collapse
- KPI cards: 2 columns
- Tables: horizontal scroll if needed

---

## UI States

### Loading
- Skeleton screens for cards/tables
- Spinner for buttons/actions
- Shimmer effect on placeholders

### Empty States
- Icon + message + CTA button
- Examples:
  - "No leads yet. Add your first lead to get started."
  - "No orders found. Create a new order."

### Error States
- Inline error messages (red text below input)
- Toast notifications for global errors (top-right, auto-dismiss)
- Full-page error for critical failures (500, network down)

### Success States
- Toast notifications (green, checkmark icon)
- Inline success messages (green text)

---

## Interactions

### Hover
- Cards: shadow elevation + scale
- Buttons: background color change
- Table rows: background highlight
- Links: underline + color shift

### Focus
- Keyboard navigation: visible outline (Primary color, 2px)
- Inputs: border highlight + shadow

### Transitions
- All: 150ms ease-in-out
- Hover/focus: 100ms
- Modals/dropdowns: 200ms

---

## Accessibility

- Semantic HTML (header, nav, main, section)
- ARIA labels for icons/buttons
- Keyboard navigable (tab order)
- Focus indicators
- Color contrast: WCAG AA minimum
- Alt text for images
- Screen reader friendly

---

## Implementation Notes

- Use Tailwind CSS or similar utility framework for rapid styling
- Component library: Shadcn/ui, Radix, or Headless UI for accessible base components
- Icons: Lucide, Heroicons, or Feather
- Charts: Chart.js or Recharts
- State management: React Context or Zustand for UI state
- Forms: React Hook Form + Zod validation
- Responsive: mobile-first approach
- Dark mode: consider adding later (not in v1)

---

## Next Steps for Implementation

1. Set up design tokens (colors, spacing, typography) in Tailwind config
2. Build app shell (sidebar + top bar + main layout)
3. Create component library (button, input, card, badge, table)
4. Build dashboard overview page with KPI cards + chart
5. Implement Leads page (table + form modal)
6. Implement Orders page
7. Implement Support page
8. Implement Automations page
9. Implement Settings page
10. Add responsive breakpoints
11. Test accessibility
12. Polish animations/transitions

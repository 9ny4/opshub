import { describe, it, expect } from 'vitest'
import { GET as getSummary } from '../app/api/dashboard/summary/route'
import { GET as getLeads, POST as postLead } from '../app/api/leads/route'
import { GET as getOrders } from '../app/api/orders/route'
import { NextRequest } from 'next/server'

function createMockRequest(url: string = 'http://localhost:3000/') {
  return new NextRequest(url)
}

describe('API Routes', () => {
  describe('GET /api/dashboard/summary', () => {
    it('should return 200 with valid summary data', async () => {
      const response = await getSummary()
      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data).toHaveProperty('leads')
      expect(data).toHaveProperty('orders')
      expect(data).toHaveProperty('tickets')
      expect(data.leads).toHaveProperty('total')
      expect(data.orders).toHaveProperty('total')
      expect(typeof data.leads.total).toBe('number')
      expect(typeof data.orders.total).toBe('number')
    })
  })

  describe('GET /api/leads', () => {
    it('should return 200 with array of leads', async () => {
      const mockReq = createMockRequest('http://localhost:3000/api/leads')
      const response = await getLeads(mockReq)
      expect(response.status).toBe(200)

      const data = await response.json()
      expect(Array.isArray(data)).toBe(true)

      if (data.length > 0) {
        const lead = data[0]
        expect(lead).toHaveProperty('id')
        expect(lead).toHaveProperty('name')
        expect(lead).toHaveProperty('email')
        expect(lead).toHaveProperty('status')
        expect(lead).toHaveProperty('source')
        expect(lead).toHaveProperty('priority')
        expect(lead).toHaveProperty('createdAt')
      }
    })

    it('should create a lead', async () => {
      const request = new NextRequest('http://localhost:3000/api/leads', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Test Lead',
          email: 'test@example.com',
          company: 'Test Co',
          status: 'new',
          source: 'Manual',
          priority: 'medium',
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await postLead(request)
      expect(response.status).toBe(201)
      const data = await response.json()
      expect(data.name).toBe('Test Lead')
      expect(data.id).toMatch(/^L-/)
    })
  })

  describe('GET /api/orders', () => {
    it('should return 200 with array of orders', async () => {
      const mockReq = createMockRequest('http://localhost:3000/api/orders')
      const response = await getOrders(mockReq)
      expect(response.status).toBe(200)

      const data = await response.json()
      expect(Array.isArray(data)).toBe(true)

      if (data.length > 0) {
        const order = data[0]
        expect(order).toHaveProperty('id')
        expect(order).toHaveProperty('customerName')
        expect(order).toHaveProperty('total')
        expect(order).toHaveProperty('status')
        expect(order).toHaveProperty('createdAt')
        expect(typeof order.total).toBe('number')
      }
    })
  })
})

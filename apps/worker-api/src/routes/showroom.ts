import { Hono } from 'hono';
import { getDatabase } from '../db/db-client.ts';
import type { ShowroomProduct, ShowroomEnquiry } from '@combo/shared-types';

export const showroomRouter = new Hono<{ Bindings: { COMBO_DB?: any } }>();

const HERO_PRODUCT: ShowroomProduct = {
  id: 'chair-aero-01',
  name: 'Signhify Kinetic Ergonomic Chair',
  basePrice: 599,
  description: 'Precision-engineered mesh ergonomic seating with dynamic lumbar support and machined aluminum frame.',
  finishes: [
    { id: 'matte-black', name: 'Stealth Matte Black', colorHex: '#181b16', roughness: 0.6, metalness: 0.2, priceDelta: 0 },
    { id: 'walnut-wood', name: 'Natural Walnut Grain', colorHex: '#5c3a21', roughness: 0.4, metalness: 0.05, priceDelta: 120 },
    { id: 'brushed-chrome', name: 'Brushed Aerospace Aluminum', colorHex: '#d8dad6', roughness: 0.2, metalness: 0.85, priceDelta: 180 },
    { id: 'forest-emerald', name: 'Signhify Forest Green', colorHex: '#17603a', roughness: 0.5, metalness: 0.1, priceDelta: 50 }
  ],
  dimensions: { width: '68 cm', height: '112-124 cm', depth: '64 cm' },
  features: [
    'Sub-20ms 60 FPS WebGL Rendering Engine',
    'Interactive Real-Time Finish & Material Switching',
    'Dynamic Pricing Recalculation',
    '3D Camera Orbital Preset Hotspots'
  ]
};

// Get hero 3D product scene metadata
showroomRouter.get('/product', (c) => {
  return c.json({ success: true, product: HERO_PRODUCT });
});

// Submit quote or enquiry
showroomRouter.post('/enquiries', async (c) => {
  const body = await c.req.json();
  const { product_id, variant_finish, calculated_price, customer_name, customer_email, notes } = body;

  if (!customer_name || !customer_email) {
    return c.json({ success: false, error: 'Name and email are required' }, 400);
  }

  const enquiry: ShowroomEnquiry = {
    id: `enq-${Date.now()}`,
    product_id: product_id || HERO_PRODUCT.id,
    variant_finish: variant_finish || 'matte-black',
    calculated_price: Number(calculated_price) || HERO_PRODUCT.basePrice,
    customer_name,
    customer_email,
    notes: notes || '',
    created_at: new Date().toISOString()
  };

  return c.json({ success: true, enquiry }, 201);
});

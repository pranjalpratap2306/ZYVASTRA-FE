import { http } from './http';

export interface EnquiryPayload {
  companyName?: string;
  name: string;
  email: string;
  phone: string;
  quantity: string;
  productService: string;
  orderNotes?: string;
}

export interface EnquiryResponse {
  id?: string;
  message?: string;
  [key: string]: any;
}

export function sendEnquiry(payload: EnquiryPayload): Promise<EnquiryResponse> {
  // Map FE payload to BE schema
  // BE expects: { name, email, phone, message, companyName, quantity, product, description }
  const originalQuantity = String(payload.quantity || '').trim();
  const numericQuantity = (() => {
    const match = originalQuantity.match(/\d+/g);
    if (!match) return undefined;
    const num = parseInt(match.join(''), 10);
    return isNaN(num) ? undefined : num;
  })();

  const beBody: Record<string, any> = {
    name: (payload.name || '').trim(),
    email: (payload.email || '').trim(),
    phone: (payload.phone || '').trim(),
    companyName: (payload.companyName || '').trim(),
    message: (payload.productService || 'Enquiry').trim(),
    product: (payload.productService || 'General').trim(),
    description: (payload.orderNotes || `Enquiry for ${payload.productService || 'product'}. Qty: ${originalQuantity || 'N/A'}`).trim(),
  };

  if (typeof numericQuantity === 'number') {
    beBody.quantity = numericQuantity;
  }

  return http<EnquiryResponse>('enquiries', {
    method: 'POST',
    body: beBody,
  });
}






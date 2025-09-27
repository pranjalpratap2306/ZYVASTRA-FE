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
  return http<EnquiryResponse>('enquiries', {
    method: 'POST',
    body: payload,
  });
}






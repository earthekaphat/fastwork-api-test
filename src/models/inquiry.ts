export interface InquiryRequest {
  email: string;
  message: string;
  product_id: number;
  name: string;
  subscribe_to_newsletter?: boolean;
}

export interface InquiryResponse {
  inquiry_id: number;
  status: string;
  newsletter_subscription?: boolean;
  message: string;
  name: string;
}

export interface ApiError {
  error_code: string;
  message?: string;
}
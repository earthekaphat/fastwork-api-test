import axios, { AxiosResponse } from 'axios';
import { InquiryRequest, InquiryResponse } from '../models/inquiry';

const BASE_URL = 'https://your-api.com';

class FastworkAPI {
  private axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_TOKEN_HERE', 
    },
  });

  async inquiry(
    sellerId: string,
    email: string,
    message: string,
    productId: number,
    name: string,
    subscribe_to_newsletter?: boolean
  ): Promise<AxiosResponse<InquiryResponse>> {
    const payload: InquiryRequest = {
      email,
      message,
      product_id: productId,
      name,
      ...(subscribe_to_newsletter !== undefined && { subscribe_to_newsletter })
    };

    try {
      return await this.axiosInstance.post<InquiryResponse>(`/api/v1/${sellerId}/inquiries`, payload);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error; // Re-throw axios error with response
      }
      throw new Error('Network error occurred');
    }
  }
}

export const fastworkAPI = new FastworkAPI();
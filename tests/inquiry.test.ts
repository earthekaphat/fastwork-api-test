import { fastworkAPI } from '../src/api/api';
import { InquiryResponse } from '../src/models/inquiry';
import { TEST_DATA } from './inquiry.testData';
import axios from 'axios';

// Mock axios for auth/server error tests
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Inquiry API - Full Coverage', () => {

  describe('Valid Requests', () => {

    it('TC1 - valid request with all fields', async () => {
      const res = await fastworkAPI.inquiry(
        TEST_DATA.SELLER_ID,
        TEST_DATA.EMAIL,
        TEST_DATA.MESSAGE,
        TEST_DATA.PRODUCT_ID,
        TEST_DATA.NAME,
        true
      );

      expect(res.status).toBe(201);
      expect(res.data).toMatchObject<InquiryResponse>({
        inquiry_id: expect.any(Number),
        status: 'received',
        newsletter_subscription: true,
        message: 'Your inquiry has been submitted successfully.',
        name: TEST_DATA.NAME
      });
    });

    it('TC2 - valid request without optional field', async () => {
      const res = await fastworkAPI.inquiry(
        TEST_DATA.SELLER_ID,
        TEST_DATA.EMAIL,
        TEST_DATA.MESSAGE,
        TEST_DATA.PRODUCT_ID,
        TEST_DATA.NAME
      );

      expect(res.status).toBe(201);
      expect(res.data).toMatchObject<InquiryResponse>({
        inquiry_id: expect.any(Number),
        status: 'received',
        message: 'Your inquiry has been submitted successfully.',
        name: TEST_DATA.NAME
      });
      expect(res.data).not.toHaveProperty('newsletter_subscription');
    });

    it('TC3 - special characters in message', async () => {
      const res = await fastworkAPI.inquiry(
        TEST_DATA.SELLER_ID,
        TEST_DATA.EMAIL,
        TEST_DATA.SPECIAL_CHARS_MESSAGE,
        TEST_DATA.PRODUCT_ID,
        TEST_DATA.NAME
      );

      expect(res.status).toBe(201);
    });

    it('TC27 - subscribe false', async () => {
      const res = await fastworkAPI.inquiry(
        TEST_DATA.SELLER_ID,
        TEST_DATA.EMAIL,
        TEST_DATA.MESSAGE,
        TEST_DATA.PRODUCT_ID,
        TEST_DATA.NAME,
        false
      );

      expect(res.status).toBe(201);
      expect(res.data.newsletter_subscription).toBe(false);
    });

  });

  describe('Seller Validation', () => {

    it('TC4 - invalid sellerId format', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.EMPTY_SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.MESSAGE, TEST_DATA.PRODUCT_ID, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'INVALID_FORMAT' } }
      });
    });

    it('TC5 - sellerId not found', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.INVALID_SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.MESSAGE, TEST_DATA.PRODUCT_ID, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 404, data: { error_code: 'NOT_FOUND' } }
      });
    });

  });

  describe('Message Validation', () => {

    it('TC6 - message too short <10', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.SHORT_MESSAGE, TEST_DATA.PRODUCT_ID, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'INVALID_FORMAT' } }
      });
    });

    it('TC7 - message length = 10', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.EQUAL_10_MESSAGE, TEST_DATA.PRODUCT_ID, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'INVALID_FORMAT' } }
      });
    });

    it('TC8 - message > 300 chars', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.LONG_MESSAGE, TEST_DATA.PRODUCT_ID, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'INVALID_FORMAT' } }
      });
    });

    it('TC9 - message not string', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, 123 as any, TEST_DATA.PRODUCT_ID, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'INVALID_FORMAT' } }
      });
    });

    it('TC10 - message empty', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.EMPTY_MESSAGE, TEST_DATA.PRODUCT_ID, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'BAD_REQUEST' } }
      });
    });

    it('TC11 - message missing', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, undefined as any, TEST_DATA.PRODUCT_ID, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'BAD_REQUEST' } }
      });
    });

    it('TC12 - message null', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, null as any, TEST_DATA.PRODUCT_ID, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'INVALID_FORMAT' } }
      });
    });

  });

  describe('Name Validation', () => {

    it('TC13 - name missing', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.MESSAGE, TEST_DATA.PRODUCT_ID, undefined as any)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'BAD_REQUEST' } }
      });
    });

    it('TC14 - name empty', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.MESSAGE, TEST_DATA.PRODUCT_ID, TEST_DATA.EMPTY_NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'BAD_REQUEST' } }
      });
    });

    it('TC15 - name not string', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.MESSAGE, TEST_DATA.PRODUCT_ID, 123 as any)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'INVALID_FORMAT' } }
      });
    });

    it('TC16 - name null', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.MESSAGE, TEST_DATA.PRODUCT_ID, null as any)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'INVALID_FORMAT' } }
      });
    });

    it('TC17 - name too long', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.MESSAGE, TEST_DATA.PRODUCT_ID, TEST_DATA.LONG_NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'INVALID_FORMAT' } }
      });
    });

  });

  describe('Email Validation', () => {

    it('TC18 - invalid email', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.INVALID_EMAIL, TEST_DATA.MESSAGE, TEST_DATA.PRODUCT_ID, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'INVALID_FORMAT' } }
      });
    });

    it('TC19 - email missing', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, undefined as any, TEST_DATA.MESSAGE, TEST_DATA.PRODUCT_ID, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'BAD_REQUEST' } }
      });
    });

    it('TC20 - email not string', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, 123 as any, TEST_DATA.MESSAGE, TEST_DATA.PRODUCT_ID, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'INVALID_FORMAT' } }
      });
    });

    it('TC21 - email empty', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMPTY_EMAIL, TEST_DATA.MESSAGE, TEST_DATA.PRODUCT_ID, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'BAD_REQUEST' } }
      });
    });

    it('TC22 - email null', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, null as any, TEST_DATA.MESSAGE, TEST_DATA.PRODUCT_ID, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'INVALID_FORMAT' } }
      });
    });

  });

  describe('Product Validation', () => {

    it('TC23 - product_id null', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.MESSAGE, null as any, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'INVALID_FORMAT' } }
      });
    });

    it('TC24 - product_id empty', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.MESSAGE, undefined as any, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'BAD_REQUEST' } }
      });
    });

    it('TC25 - product_id missing', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.MESSAGE, undefined as any, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'INVALID_FORMAT' } }
      });
    });

    it('TC26 - product_id string', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.MESSAGE, TEST_DATA.STRING_PRODUCT_ID as any, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'INVALID_FORMAT' } }
      });
    });

    it('TC27 - product_id negative', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.MESSAGE, TEST_DATA.NEGATIVE_PRODUCT_ID, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'INVALID_FORMAT' } }
      });
    });

    it('TC28 - product not exist', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.MESSAGE, TEST_DATA.INVALID_PRODUCT_ID, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 404, data: { error_code: 'NOT_FOUND' } }
      });
    });

  });

  describe('Subscribe Validation', () => {

      it('TC29 - valid request when subscribe is false', async () => {
      const res = await fastworkAPI.inquiry(
        TEST_DATA.SELLER_ID,
        TEST_DATA.EMAIL,
        TEST_DATA.MESSAGE,
        TEST_DATA.PRODUCT_ID,
        TEST_DATA.NAME,
        false
      );

      expect(res.status).toBe(201);
      expect(res.data).toMatchObject<InquiryResponse>({
        inquiry_id: expect.any(Number),
        status: 'received',
        newsletter_subscription: false,
        message: 'Your inquiry has been submitted successfully.',
        name: TEST_DATA.NAME
      });
    });

    it('TC30 - subscribe invalid type', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.MESSAGE, TEST_DATA.PRODUCT_ID, TEST_DATA.NAME, 'true' as any)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'INVALID_FORMAT' } }
      });
    });

  });

  describe('Edge Cases', () => {

    it('TC31 - multiple invalid fields', async () => {
      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.SHORT_MESSAGE, TEST_DATA.PRODUCT_ID, TEST_DATA.LONG_NAME, 'true' as any)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'INVALID_FORMAT' } }
      });
    });

    it('TC32 - empty payload', async () => {
      await expect(
        fastworkAPI.inquiry(undefined as any, undefined as any, undefined as any, undefined as any, undefined as any)
      ).rejects.toMatchObject({
        response: { status: 400, data: { error_code: 'BAD_REQUEST' } }
      });
    });

  });

  describe('Auth & Server', () => {

    beforeEach(() => {
      // Reset all mocks before each test
      jest.clearAllMocks();
    });

    it('TC33 - unauthorized no token', async () => {
      // Mock axios to return 401 unauthorized
      mockedAxios.create.mockReturnValueOnce({
        post: jest.fn().mockRejectedValueOnce({
          response: { status: 401 }
        })
      } as any);

      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.MESSAGE, TEST_DATA.PRODUCT_ID, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 401 }
      });
    });

    it('TC34 - token expired', async () => {
      // Mock axios to return 401 token expired
      mockedAxios.create.mockReturnValueOnce({
        post: jest.fn().mockRejectedValueOnce({
          response: { status: 401 }
        })
      } as any);

      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.MESSAGE, TEST_DATA.PRODUCT_ID, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 401 }
      });
    });

    it('TC35 - internal server error', async () => {
      // Mock axios to return 500 internal server error
      mockedAxios.create.mockReturnValueOnce({
        post: jest.fn().mockRejectedValueOnce({
          response: { status: 500 }
        })
      } as any);

      await expect(
        fastworkAPI.inquiry(TEST_DATA.SELLER_ID, TEST_DATA.EMAIL, TEST_DATA.MESSAGE, TEST_DATA.PRODUCT_ID, TEST_DATA.NAME)
      ).rejects.toMatchObject({
        response: { status: 500 }
      });
    });
  });
});
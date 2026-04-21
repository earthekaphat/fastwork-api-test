// ============ TEST DATA CONSTANTS ============
export const TEST_DATA = {
  // Valid data
  SELLER_ID: 'seller123',
  EMAIL: 'john@example.com',
  MESSAGE: 'Hello this is valid message',
  PRODUCT_ID: 1001,
  NAME: 'John',

  // Invalid sellers
  EMPTY_SELLER_ID: '',
  INVALID_SELLER_ID: 'invalidSeller',

  // Invalid messages
  SHORT_MESSAGE: 'Hi',
  EQUAL_10_MESSAGE: 'Hiiiiiiiii',
  LONG_MESSAGE: 'A'.repeat(301),
  EMPTY_MESSAGE: '',
  SPECIAL_CHARS_MESSAGE: '@@@ valid message ###',

  // Invalid emails
  INVALID_EMAIL: 'johnexample.com',
  EMPTY_EMAIL: '',

  // Invalid products
  INVALID_PRODUCT_ID: 32131,
  NEGATIVE_PRODUCT_ID: -1,
  STRING_PRODUCT_ID: 'abc',

  // Invalid names
  EMPTY_NAME: '',
  LONG_NAME: 'A'.repeat(120),
};
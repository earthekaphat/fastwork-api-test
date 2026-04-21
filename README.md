# 🚀 Jest Automate - Fastwork Inquiry API Testing

A comprehensive Jest testing suite for Fastwork's Inquiry API with TypeScript, featuring 35+ test cases covering all validation scenarios, authentication, and error handling.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Test Coverage](#test-coverage)
- [Development](#development)
- [Contributing](#contributing)

## ✨ Features

- **🔒 Type Safety**: Full TypeScript support with strict interfaces
- **🧪 Comprehensive Testing**: 35+ test cases covering all scenarios
- **🎯 API Validation**: Complete input validation testing
- **🔐 Authentication**: Bearer token support with error testing
- **📊 Mock Support**: Axios mocking for reliable testing
- **🏗️ Clean Architecture**: Separated concerns with models and API layers
- **📝 Well Documented**: Clear test cases with descriptive names
- **🔄 CI/CD Ready**: Jest configuration for automated testing

## 📁 Project Structure

```
jest-automate/
├── 📄 package.json          # Project dependencies & scripts
├── ⚙️ jest.config.js        # Jest testing configuration
├── 🔧 tsconfig.json         # TypeScript configuration
├── 📖 README.md             # This file
├── 📂 src/                  # Source code
│   ├── 🌐 api/
│   │   └── 📡 api.ts        # FastworkAPI class with Axios client
│   └── 📋 models/
│       └── 🔷 inquiry.ts    # TypeScript interfaces & types
└── 🧪 tests/                # Test suite
    ├── 📊 inquiry.test.ts   # Main test suite (35+ test cases)
    └── 📋 inquiry.testData.ts # Test data constants
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd jest-automate

# Install dependencies
npm install

# Verify installation
npm test
```

## ⚙️ Configuration

### Environment Setup
1. **API Token**: Update the Bearer token in `src/api/api.ts`
   ```typescript
   'Authorization': 'Bearer YOUR_ACTUAL_TOKEN_HERE'
   ```

2. **Base URL**: Modify the API endpoint if needed
   ```typescript
   const BASE_URL = 'https://your-api-endpoint.com';
   ```

### Jest Configuration (`jest.config.js`)
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: { esModuleInterop: true }
    }]
  }
};
```

## 💻 Usage

### Basic API Usage
```typescript
import { fastworkAPI } from './src/api/api';

// Submit an inquiry
const response = await fastworkAPI.inquiry(
  'seller123',                    // sellerId
  'john@example.com',            // email
  'Hello, interested in your product', // message
  1001,                          // productId
  'John Doe',                    // name
  true                           // subscribe_to_newsletter (optional)
);

console.log('Inquiry submitted:', response.data);
```

### Error Handling
```typescript
try {
  await fastworkAPI.inquiry(sellerId, email, message, productId, name);
} catch (error) {
  if (error.response) {
    // API error with response
    console.error('API Error:', error.response.status, error.response.data);
  } else {
    // Network or other error
    console.error('Network Error:', error.message);
  }
}
```

## 📚 API Documentation

### FastworkAPI Class

#### Constructor
```typescript
const api = new FastworkAPI(); // Uses configured token
```

#### Methods

##### `inquiry(sellerId, email, message, productId, name, subscribe_to_newsletter?)`
Submits an inquiry to a seller.

**Parameters:**
- `sellerId` (string): Seller identifier
- `email` (string): Customer email address
- `message` (string): Inquiry message (10-300 characters)
- `productId` (number): Product identifier
- `name` (string): Customer name (1-100 characters)
- `subscribe_to_newsletter` (boolean, optional): Newsletter subscription preference

**Returns:** `Promise<AxiosResponse<InquiryResponse>>`

**Throws:** `AxiosError` with response containing error details

### Data Models

#### InquiryRequest
```typescript
interface InquiryRequest {
  email: string;
  message: string;
  product_id: number;
  name: string;
  subscribe_to_newsletter?: boolean;
}
```

#### InquiryResponse
```typescript
interface InquiryResponse {
  inquiry_id: number;
  status: string;
  newsletter_subscription?: boolean;
  message: string;
  name: string;
}
```

#### ApiError
```typescript
interface ApiError {
  error_code: string;
  message?: string;
  [key: string]: any; // Additional error fields
}
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test
npm test -- --testNamePattern="TC1"

# Run in watch mode
npm test -- --watch
```

### Test Structure
Tests are organized into logical groups:

- **Valid Requests**: Successful API calls with various inputs
- **Seller Validation**: Seller ID validation (empty, not found)
- **Message Validation**: Message length and format validation
- **Name Validation**: Name requirements validation
- **Email Validation**: Email format validation
- **Product Validation**: Product ID validation
- **Subscribe Validation**: Newsletter preference validation
- **Edge Cases**: Multiple invalid fields, empty payloads
- **Auth & Server**: Authentication and server error testing

### Test Data
Test constants are centralized in `tests/inquiry.testData.ts` for easy maintenance and consistency.

### Mocking Strategy
- **Axios Mocking**: HTTP requests are mocked using `jest.mock('axios')`
- **Error Scenarios**: Auth failures (401) and server errors (500) are simulated
- **Response Control**: Tests control exact response data and status codes

## 📊 Test Coverage

### Test Cases Summary (35+ tests)

| Category | Test Cases | Description |
|----------|------------|-------------|
| **Valid Requests** | TC1-TC3, TC27 | Successful submissions with various inputs |
| **Seller Validation** | TC4-TC5 | Empty seller ID, seller not found |
| **Message Validation** | TC6-TC12 | Length limits, format validation |
| **Name Validation** | TC13-TC17 | Required field, length limits |
| **Email Validation** | TC18-TC22 | Format validation, required field |
| **Product Validation** | TC23-TC28 | Number validation, existence checks |
| **Subscribe Validation** | TC29-TC30 | Boolean validation |
| **Edge Cases** | TC31-TC32 | Multiple errors, empty payloads |
| **Auth & Server** | TC33-TC35 | 401/500 error handling |

### Coverage Areas
- ✅ **Input Validation**: All field types and constraints
- ✅ **HTTP Status Codes**: 201, 400, 401, 404, 500
- ✅ **Error Messages**: Proper error code validation
- ✅ **Edge Cases**: Boundary conditions and invalid combinations
- ✅ **Authentication**: Bearer token error scenarios
- ✅ **Server Errors**: 500 internal server error handling

## 🛠️ Development

### Development Workflow
```bash
# 1. Make changes to source code
# 2. Check TypeScript compilation
npx tsc --noEmit

# 3. Run tests
npm test

# 4. Add/update tests as needed
# 5. Commit changes
```

### Adding New Tests
1. **Add test data** to `tests/inquiry.testData.ts`
2. **Add test case** to `tests/inquiry.test.ts`
3. **Run tests** to verify: `npm test`
4. **Update documentation** if needed

### Code Quality
- **TypeScript Strict Mode**: Enabled for type safety
- **ESLint**: Recommended for code consistency
- **Prettier**: Recommended for code formatting
- **Jest Coverage**: Aim for high test coverage

### Scripts
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "type-check": "tsc --noEmit",
    "build": "tsc"
  }
}
```

## 🤝 Contributing

### Guidelines
1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Make changes** following the existing patterns
4. **Add tests** for new functionality
5. **Ensure** all tests pass: `npm test`
6. **Submit** a pull request

### Code Standards
- **TypeScript**: Use strict typing
- **Naming**: Descriptive variable/function names
- **Tests**: Add test cases for new features
- **Documentation**: Update README for significant changes
- **Commits**: Clear, descriptive commit messages

### Testing Standards
- **Test Coverage**: Maintain or improve coverage
- **Test Names**: Descriptive test case names (TC1, TC2, etc.)
- **Mock Usage**: Use mocks for external dependencies
- **Assertions**: Clear, specific assertions
- **Edge Cases**: Test boundary conditions

## 📄 License

ISC License - See package.json for details.

## 🆘 Troubleshooting

### Common Issues

**Tests Failing with 401:**
- Check Bearer token in `src/api/api.ts`
- Ensure token is valid and not expired

**TypeScript Errors:**
```bash
npx tsc --noEmit  # Check for compilation errors
```

**Mock Issues:**
- Clear Jest cache: `npx jest --clearCache`
- Restart test runner

**Network Issues:**
- Verify API endpoint URL
- Check network connectivity
- Review timeout settings (currently 10s)

### Getting Help
- Check existing test cases for patterns
- Review TypeScript interfaces for correct types
- Run individual tests for debugging: `npm test -- --testNamePattern="TC1"`

---

**Built with ❤️ using Jest, TypeScript, and Axios**

*Comprehensive API testing made simple and maintainable*

## Development

1. Add new models in `src/models/`
2. Implement services in `src/services/`
3. Create test fixtures in `tests/helpers/`
4. Write tests following the established patterns
# Jest Automate - Inquiry API Testing

A well-structured Jest testing project for API automation with TypeScript.

## Project Structure

```
src/
├── api/           # API layer (legacy compatibility)
├── models/        # TypeScript interfaces and types
├── services/      # Business logic and API services
└── index.ts       # Main exports

tests/
├── helpers/       # Test utilities and fixtures
└── *.test.ts      # Test files
```

## Key Features

- **Type Safety**: Full TypeScript support with proper interfaces
- **Modular Architecture**: Separated concerns with models, services, and API layers
- **Test Organization**: Grouped tests with fixtures and utilities
- **Error Handling**: Proper error handling and validation
- **Maintainable Tests**: DRY principles with reusable fixtures

## Models

- `InquiryRequest`: Interface for API request payload
- `InquiryResponse`: Interface for API response
- `ApiError`: Interface for error responses

## Services

- `ApiService`: Axios-based service with proper error handling
- `submitInquiry`: Main function for submitting inquiries

## Testing

Tests are organized with:
- **Fixtures**: Predefined test data in `tests/helpers/inquiryFixtures.ts`
- **Utilities**: Common test functions in `tests/helpers/testUtils.ts`
- **Structure**: Tests grouped by functionality (Valid Requests, Error Cases)

## Running Tests

```bash
npm test
```

## Development

1. Add new models in `src/models/`
2. Implement services in `src/services/`
3. Create test fixtures in `tests/helpers/`
4. Write tests following the established patterns
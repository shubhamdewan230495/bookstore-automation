# Bookstore API Automation Framework

## Overview
This project is an API automation framework for a FastAPI-based Bookstore application. It uses Playwright Test (TypeScript) for API automation, providing comprehensive coverage for all major CRUD operations, including positive and negative scenarios, request chaining, and robust assertions. The framework is designed for scalability, maintainability, and easy configuration for multiple environments.

---

## Features
- **Comprehensive API Test Coverage**: All major CRUD operations for the Books API are automated, including status code, payload, header, and error validation.
- **Scenarios**: Both valid and invalid requests are tested to ensure robustness.
- **Request Chaining**: Output from one API call (e.g., book ID) is used as input for subsequent calls.
- **Reusable Helpers**: Utility classes for API requests, authentication, and book operations.
- **Configurable Environments**: Environment variables and config files for dev, stage, and prod.
- **Detailed Reporting**: Playwright's built-in HTML report, with easy integration for Allure if needed.
- **CI/CD Integration**: GitHub Actions pipeline for automated test execution on every push.

---

## Project Structure
```
helpers/           # API utilities, book and user helpers
response-contracts/ # Response validation contracts
 test-data/         # Test payloads and endpoint data
 tests/             # Main test suite
 types/             # TypeScript types and enums
 environment/       # Environment variable files
 playwright.config.ts # Playwright configuration
```

---

## How to Run the Tests
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Set up the API server:**
   - Follow the FastAPI project's README to start the API locally (default: `http://localhost:8000`).
3. **Configure environment:**
   - Edit or add `.env` files in the `environment/` folder as needed (e.g., `stage.env`, `prod.env`).
4. **Run the tests:**
   ```sh
   npm run test:stage or test:prod
   # or for a specific environment
   ENV=stage npx playwright test
   ```
5. **View the report:**
   ```sh
   npx playwright show-report
   ```
6. **Allure reports are integrated**
   ```
   bash generate-report.sh
   ```
   will open the report refering the results generated for allure. to generate allure results we need to run our test passing argument --reporter=line,allure-playwright
---

## Testing Strategy
- **Test Flows:**
  - Each test suite covers a full CRUD cycle: create, read, update, delete.
  - Request chaining is used (e.g., create a book, then update/delete it).
- **Reliability & Maintainability:**
  - All API calls are abstracted in helper classes for reuse.
  - Payloads and contracts are centralized for easy updates.
  - Environment config is externalized.
- **Challenges & Solutions:**
  - **Token management:** Automated login and token injection in helpers.
  - **Fixture reuse:** Dedicated APIRequestContext is created/disposed per suite to avoid Playwright fixture errors.
  - **Negative scenarios:** Custom payloads and assertions for error cases.

---

## CI/CD Pipeline
- **GitHub Actions** is configured to:
  - Set up Node.js and dependencies
  - Start the FastAPI server (if needed)
  - Run Playwright tests
  - Upload the HTML report as an artifact

---

## Sample Test Report
After running the suite, open the HTML report with:
```
npx playwright show-report
```
And allure report with: 
```
bash generate-report.sh
```
---

## Contribution
- Fork the repo, create a branch, and submit a PR for review.

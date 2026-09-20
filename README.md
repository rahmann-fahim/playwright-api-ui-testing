# Playwright UI & API Test Automation

End-to-end UI and API test automation for a registration web application using Playwright and TypeScript.

## Project Overview

This project focuses on automated testing of a registration and authentication web application.

The application includes:

- User Registration
- OTP Verification
- User Login
- JWT-based Authentication
- Protected Dashboard
- Registered Users Management
- User Search
- Logout
- Protected API Endpoints

Playwright is used to automate both UI and API test scenarios and verify the expected application behavior.

## Technology Stack

| Technology | Purpose |
|------------|---------|
| Playwright | UI and API test automation |
| TypeScript | Test development |
| Angular | Frontend application |
| Spring Boot | Backend REST API |
| MySQL | Database |
| JWT | Authentication |
| Git & GitHub | Version control |

## Project Structure

```text
Web app/
│
├── registration-app/
│   ├── src/
│   │   └── app/
│   │       ├── dashboard/
│   │       ├── login/
│   │       ├── register/
│   │       ├── users/
│   │       └── verify-otp/
│   │
│   ├── tests/
│   │   ├── UI/
│   │   │   ├── TC-01-successful-registration.spec.ts
│   │   │   ├── TC-02-wrong-otp.spec.ts
│   │   │   ├── TC-03-duplicate-email.spec.ts
│   │   │   ├── TC-04-empty-name.spec.ts
│   │   │   ├── TC-05-empty-email.spec.ts
│   │   │   ├── TC-06-empty-password.spec.ts
│   │   │   ├── TC-07-existing-user-login.spec.ts
│   │   │   ├── TC-08-dashboard-user-name.spec.ts
│   │   │   ├── TC-09-dashboard-total-users.spec.ts
│   │   │   ├── TC-10-user-search.spec.ts
│   │   │   ├── TC-11-logout.spec.ts
│   │   │   └── TC-12-protected-users-page.spec.ts
│   │   │
│   │   └── API/
│   │       ├── API-01-successful-registration.spec.ts
│   │       ├── API-02-duplicate-email.spec.ts
│   │       ├── API-03-empty-fields.spec.ts
│   │       ├── API-04-correct-otp.spec.ts
│   │       ├── API-05-wrong-otp.spec.ts
│   │       ├── API-06-get-users.spec.ts
│   │       ├── API-07-login.spec.ts
│   │       ├── API-08-get-users-without-token.spec.ts
│   │       └── API-09-get-users-invalid-token.spec.ts
│   │
│   ├── playwright.config.ts
│   ├── package.json
│   └── ...
│
└── registration-api/
    ├── src/
    ├── pom.xml
    └── ...





## Automated Test Coverage

### UI Testing

A total of **12 UI test cases** are automated.

| Test Case | Description |
|-----------|-------------|
| TC-01 | Successful registration and login |
| TC-02 | Wrong OTP validation |
| TC-03 | Duplicate email validation |
| TC-04 | Empty name validation |
| TC-05 | Empty email validation |
| TC-06 | Empty password validation |
| TC-07 | Existing user login |
| TC-08 | Dashboard displays logged-in user |
| TC-09 | Dashboard displays total user count |
| TC-10 | User search by email |
| TC-11 | User logout |
| TC-12 | Protected users page access |

### API Testing

A total of **9 API test cases** are automated.

| Test Case | Description |
|-----------|-------------|
| API-01 | Successful registration API |
| API-02 | Duplicate email validation |
| API-03 | Empty fields validation |
| API-04 | Correct OTP verification |
| API-05 | Wrong OTP validation |
| API-06 | Get users with JWT authentication |
| API-07 | Login and JWT token validation |
| API-08 | Get users without authentication token |
| API-09 | Get users with invalid JWT token |

## Authentication Testing

The test suite also covers authentication and authorization scenarios.

The following security-related behaviors are verified:

- Successful login
- JWT token generation
- JWT token usage for protected API requests
- Access to protected routes
- Request without authentication token
- Request with invalid JWT token
- Logout and token removal


# Test Execution

## Install Dependencies

## Navigate to the Angular/Playwright project:

```bash
cd registration-app
```

Install dependencies:

```bash
npm install
```

## Run All Tests

```bash
npx playwright test
```

## Run UI Tests

```bash
npx playwright test tests/UI
```

## Run API Tests

```bash
npx playwright test tests/API
```

## Run a Specific Test

```bash
npx playwright test tests/UI/TC-01-successful-registration.spec.ts
```

## Run Tests with Browser Visible

```bash
npx playwright test --headed
```

## HTML Test Report

After executing the tests, Playwright generates an HTML test report.
Open the report using:

```bash
npx playwright show-report
```

The report provides:

- Test execution status
- Test duration
- Test steps
- Screenshots for failed tests
- Trace information when available
- Detailed test results

## Test Result

Current automated test suite:

UI Tests : 12/12 Passed
API Tests : 9/9 Passed
Total : 21/21 Passed


## Application Flow

### Registration Flow
User Registration

↓

Registration API

↓

OTP Verification

↓

User Created

↓

Login

↓

JWT Token Generated

↓

Dashboard


### Protected API Flow

Login

↓

JWT Token

↓

Authorization Header

↓

Protected API

↓

Authenticated Response


## QA Focus

The automation suite was designed to validate:

- Functional requirements
- Positive test scenarios
- Negative test scenarios
- Form validation
- Authentication
- Authorization
- API response validation
- Protected route behavior
- User management functionality
- Regression testing

## Author

**Tinjilur Rahman Fahim**
QA / SQA Automation Project
